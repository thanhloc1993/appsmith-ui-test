export default {
	validateColumn: (csvData, tableName) => {
		const keyErr = "err" + tableName
		removeValue(keyErr);

		if (csvData.length === 0) {
			storeValue(keyErr, "Empty csv");
			return;
		};

		const ALLOW_COLUMN_NAME = Const.columnsName(tableName);
		const csvColummns = Object.keys(csvData[0]);
		const missingColumn = _.difference(ALLOW_COLUMN_NAME, csvColummns);
		const redundantColumn = _.difference(csvColummns, ALLOW_COLUMN_NAME);
		const errMessage = (missingColumn.length > 0 ? `[missing columns: ${missingColumn.join(",")}]` : "") + (redundantColumn.length > 0 ? `[redundantColumn: ${redundantColumn.join(",")}]` : "");

		if (missingColumn.length > 0 || redundantColumn.length > 0) {
			storeValue(keyErr, errMessage);
		}
	},
	validateDataType: (csvData, tableName) => {
		const keyErr = "errRule" + tableName
		removeValue(keyErr);
		const dataRules = Const.dataRules(tableName)
		const errList = []

		for (let i = 0; i < csvData.length; i++) {
			const rowData = csvData[i];
			for (const columnName in dataRules) {
				const rules = dataRules[columnName];
				
				if (!Utils.isValidData(rowData[columnName], rules)) {
					errList.push(`${i}_${columnName}`)
				} else if (rowData[columnName] === null || rowData[columnName] === "NULL") {
					delete rowData[columnName]
				} else {
					const fromType = typeof rowData[columnName];
					const toType = rules.type
					rowData[columnName] = Utils.convertType(fromType, toType, rowData[columnName])
				}
			}
		}

		if (errList.length > 0) {
			storeValue(keyErr, `[invalid type: ${errList.join(", ")}]`);
		} 
	},
	validate: () => {
		["SAC", "COF","SAF",  "TAF", "TCF", "CMF"].forEach((fileName) => {
			const files = Import.getFileByTableName(fileName)
			const csvData = Utils.getCSVDataFromFile(files)

			this.validateColumn(csvData, fileName)
			this.validateDataType(csvData, fileName)
			storeValue("validated", true);
		})

		if (this.isAllowInsert()) {		
			Uploader.insertData()
		}
	},
	getErrorByTableName: (tableName) => {
		const keyError = "err" + tableName
		const keyErrType = "errRule" + tableName

		return appsmith.store[keyError] || appsmith.store[keyErrType]
	},
	isAllowInsert: () => {
		return ["SAC", "COF","SAF",  "TAF", "TCF", "CMF"].every((tableName)=> !this.getErrorByTableName(tableName))
	}
}