export default {
	clearView: () => {
		removeValue("viewTableName");
		removeValue("viewTableData");
		removeValue("validated")
	},
	setViewTable: (tableName) => {
		storeValue("viewTableName", tableName)

		switch (tableName) {
			case 'SAC': {
				storeValue('viewTableData', FilePickerSAC.files)
				break;
			}
			case 'COF': {
				storeValue('viewTableData', FilePickerCOF.files)
				break;
			}
			case 'SAF': {
				storeValue('viewTableData', FilePickerSAF.files)
				break;
			}
			case 'TAF': {
				storeValue('viewTableData', FilePickerTAF.files)
				break;
			}
			case 'TCF': {
				storeValue('viewTableData', FilePickerTCF.files)
				break;
			}
			case 'CMF': {
				storeValue('viewTableData', FilePickerCMF.files)
				break;
			}
			default: {
				break;
			}
		}
	},
	getFileByTableName: (tableName) => {
		switch (tableName) {
			case 'SAC': {
				return FilePickerSAC.files
			}
			case 'COF': {
				return FilePickerCOF.files
			}
			case 'SAF': {
				return FilePickerSAF.files
			}
			case 'TAF': {
				return FilePickerTAF.files
			}
			case 'TCF': {
				return FilePickerTCF.files
			}
			case 'CMF': {
				return FilePickerCMF.files
			}
			default: {
				break;
			}
		}
	},
	csvData: () => {
		const files = appsmith.store["viewTableData"];
		return Utils.getCSVDataFromFile(files);
	}
}