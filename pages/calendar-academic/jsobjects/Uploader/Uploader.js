export default {
	validateFile: async () => {
		if(!TableData.tableData.length || TableData.tableData.length == 1) {
			Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
		}
		// nothing
		const errors = [];
		const results = [];
		try {
			const rules = await Configure.getConfig();
			if(rules == '') {
				Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
				return false;
			}
			const ruleContent = JSON.parse(rules);
			if(!ruleContent[SelectType.selectedOptionValue]) {
				Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
				return false;
			}
			removeValue("tableChecked");
			TableData.tableData.forEach((row, rowIndex) => {
				if(Object.keys(row).length > 1) {
					const rowObj = Object.assign({}, row);
					let errArr = [];
					// if(Object.keys(row).length != ruleContent[select_master.selectedOptionValue].length) {
					// errArr.push(`wrong number of columns, expected ${ruleContent[select_master.selectedOptionValue].length}, got ${Object.keys(row).length}`);
					// }
					Object.entries(row).forEach(([key, value], colIndex) => {
						if(ruleContent[SelectType.selectedOptionValue][colIndex]) {
							const err = Validater.checkColumn(key, `${value}`, ruleContent[SelectType.selectedOptionValue][colIndex]);
							if(err) { 
								errArr.push(`[${key}] ${err} ${key}`);
								errors.push(`row ${rowIndex}: col ${colIndex} - ${err}`);
							}
						} else {
							errArr.push(`[${key}] Invalid column`);
							errors.push(`row ${rowIndex}: col ${colIndex} - Invalid column`);
						}
					});
					if(errArr.length > 0) {
						rowObj['ERROR DETAILS'] = `error: ${errArr.join(", ")}`;
					}
					results.push(rowObj);
				}
			});
			storeValue("tableChecked", results, false);
		} catch (error) {
			Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
		}
		if(errors.length > 0 ){
			Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
			return false;
		} 
		storeValue("importing", true, false);
		const passMiddleware = await Import.middleware(SelectType.selectedOptionValue);
		if(!passMiddleware) {
			return false;
		}
		await Import.importData(SelectType.selectedOptionValue, btoa(Papa.unparse(results)));
		return true;
	}
}