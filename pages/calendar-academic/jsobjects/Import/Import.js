export default {
	performImport: () => {
		return this.importData(SelectType.selectedOptionValue, btoa(Papa.unparse(appsmith.store.tableChecked)));
	},
	middleware: async (selectType) => {
		const middlewareFunction = {
			academic_calendar: () => {
				if(!SelectYear.selectedOptionValue) {
					Snackbar.showSnackbar("Please choose year", "error");
					return false
				}
				if(!SelectLocation.selectedOptionValue) {
					Snackbar.showSnackbar("Please choose location", "error");
					return false
				}
				return true;
			}
		}
		if (!middlewareFunction[selectType]) {
			return false;
		}

		return middlewareFunction[selectType]()
	},
	importData: async (selectType, payload) => {
		const importFunctions = {
			academic_calendar: ImportAcademicCalendar.run
		};

		if (!importFunctions[selectType]) {
			return false;
		}

		try {
			await importFunctions[selectType]({ payload });
			Snackbar.showSnackbar("resources.masters.message.importedSuccess", "success");
			return true;
		} catch (err) {
			this.parseError(err);
			Snackbar.showSnackbar("resources.masters.message.importedFailure", "error");
			storeValue("importing", false, false);
			return false;
		}
	},
	parseError: async (err) => {
		const errors = JSON.parse(err.message);
		if (errors.code == 3) {
			const errorDetails = errors.details[0];
			const fieldViolations = errorDetails.fieldViolations;
			const listErr = {};
			for (let i = 0; i < fieldViolations.length; i++) {
				const fieldViolation = fieldViolations[i];
				const rowNumber = fieldViolation.field.split(': ')[1];
				const errorDescription = fieldViolation.description;
				listErr[rowNumber] = errorDescription;
			}
			this.convertServerErrorToTable(listErr)
		}
	},
	convertServerErrorToTable: async (listErr) => {
		const currentTable = appsmith.store.tableChecked; 
		for (let i = 0; i < currentTable.length; i++) {
			if(listErr[i+2]) {
				currentTable[i]['ERROR DETAILS'] = `error: ${listErr[i+2]}`;
			}
		}
		storeValue("tableChecked", currentTable, false);
	}
}