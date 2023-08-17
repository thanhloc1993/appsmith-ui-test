export default {
	prepareUpload: async () => {
		const results = [];
		const tableData = FilePicker.files[0].data;

		tableData.forEach((row) => {
			if(Object.keys(row).length > 1) {
				const rowObj = Object.assign({}, row);
				results.push(rowObj);
			}
		});

		storeValue("tableChecked", results, false);
		storeValue("importing", true, false);

		// Temporary parsing for VN/JP, will be refined later
		await ImportContentBank.importContentBank(btoa(encodeURIComponent(Papa.unparse(results)).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(_, p1) {
				return String.fromCharCode('0x' + p1);
			})
    ));

		return true;
	},
	showErrorTable: (errorList) => {				
		const errorResults = [];
		const rowNumberHeaderText = Utils.isJPTranslation() ? "行 #" : "Row #"; // Update JP 
		const errorMessageHeaderText = Utils.isJPTranslation() ? "エラーメッセージ" : "Error Message"; // Update JP

		errorList.sort((firstError, secondError) => firstError.rowNumber - secondError.rowNumber);

		errorList.forEach(error => {			
			const errorRow = {};
			errorRow[rowNumberHeaderText] = error.rowNumber;
			errorRow[errorMessageHeaderText] = TranslateUtils.translateServerErrorMessages(error.errorCode);

			errorResults.push(errorRow);
		});

		storeValue("tableChecked", errorResults, false);
	}
}