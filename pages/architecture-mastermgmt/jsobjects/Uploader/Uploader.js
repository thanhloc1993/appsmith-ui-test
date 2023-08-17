export default {
	validateFile: async () => {
		if(!MasterData.tableData.length || MasterData.tableData.length == 1) {
			Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
		}
		const errors = [];
		const results = [];
		try {
			const rules = Configure.getConfig.data;
			if(rules == '') {
				Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
				return false;
			}
			const ruleContent = JSON.parse(rules);
			if(!ruleContent[select_master.selectedOptionValue]) {
				Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
				return false;
			}
			if (select_master.selectedOptionValue == 'course' && Unleash.isEnabledbyUnleash("Architecture_BACKEND_MasterData_Course_TeachingMethod")) {
				ruleContent.course = Configure.overrideCourseRule;
			}
			const tableData = FilePicker.files[0].data;
			tableData.forEach((row, rowIndex) => {
				if(Object.keys(row).length > 1) {
					const rowObj = Object.assign({}, row);
					let errArr = [];
					Object.entries(row).forEach(([key, value], colIndex) => {
						if(ruleContent[select_master.selectedOptionValue][colIndex]) {
							const err = Validater.checkColumn(key, `${value}`, ruleContent[select_master.selectedOptionValue][colIndex]);
							if(err) { 
								errArr.push(`[${key}] ${err}`);
								errors.push(`row ${rowIndex}: col ${colIndex} - ${err}`);
							}
						} else {
							errArr.push(`[${key}] Invalid column`);
							errors.push(`row ${rowIndex}: col ${colIndex} - Invalid column ${value} and ${key}`);
						}
					});
					if(errArr.length > 0) {
						rowObj['ERROR DETAILS'] = `error: ${errArr.join(", ")}`;
					}
					results.push(rowObj);
				}
			});
			if(errors.length == 0) {
				const errorsOb = Validater.checkBusiness();
				if(Object.keys(errorsOb).length > 0) {
					Object.keys(errorsOb).forEach((errKey) => {
						if(results[errKey]) {
							results[errKey]['ERROR DETAILS'] = errorsOb[errKey]
						}
					})
					storeValue("tableChecked", results, false);
					Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
					return false;
				}
			}
			storeValue("tableChecked", results, false);
		} catch (error) {
			Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
			return false;
		}
		if(errors.length > 0 ){
			Snackbar.showSnackbar("ra.manabie-error.invalid_params", "error");
			return false;
		} 
		storeValue("importing", true, false);
		const checkMiddleware = await Import.middleware(select_master.selectedOptionValue);
		if(!checkMiddleware) {
			return false;
		}
		const data = btoa(encodeURIComponent(Papa.unparse(results)).replace(/%([0-9A-F]{2})/g, (match, p1) => {
					return String.fromCharCode('0x' + p1);
				}));
		await Import.importMasterData(select_master.selectedOptionValue, data);
		return true;
	}
}