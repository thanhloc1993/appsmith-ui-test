export default {
	allowListError: ["resources.masters.message.mustImportAllExistData", "resources.masters.message.canNotUpdateLowestType"], //  define array
	performImport: () => {
		return this.importMasterData(select_master.selectedOptionValue, btoa(Papa.unparse(appsmith.store.tableChecked)));
	},
	middleware: async (selectType) => {
		const middlewareFunction = {
			academic_calendar: () => {
				if(!SelectYear.selectedOptionValue) {
					Snackbar.showSnackbar(appsmith.URL.queryParams['lang'] == 'ja' ? "学年度カレンダーをインポートする年度を選択してください" : "Please select year to import academic calendar", "error");
					return false
				}
				if(!SelectLocationForAcademic.selectedOptionValue) {
					Snackbar.showSnackbar(appsmith.URL.queryParams['lang'] == 'ja' ? "学年度カレンダーをインポートする拠点を選択してください" : "Please select location to import academic calendar", "error");
					return false
				}
				return true;
			},
			working_hour: () => {
				if(!SelectLocation.selectedOptionValue) {
					Snackbar.showSnackbar(appsmith.URL.queryParams['lang'] == 'ja' ? "Please select location to import working hour" : "Please select location to import working hour", "error");
					return false
				}
				return true;
			},
			time_slot: () => {
				if(!SelectLocation.selectedOptionValue) {
					Snackbar.showSnackbar(appsmith.URL.queryParams['lang'] == 'ja' ? "Please select location to import time slot" : "Please select location to import time slot", "error");
					return false
				}
				return true;
			}
		}
		if (!middlewareFunction[selectType]) {
			// don't need to check middleware
			return true;
		}

		return middlewareFunction[selectType]()
	},
	importMasterData: async (masterType, payload) => {
		const importFunctions = {
			grade: ArchImportGrade.run,
			location: ArchImportLocation.run,
			course: ArchImportCourse.run,
			location_type: ArchImportLocationType.run,
			class: ArchImportClass.run,
			course_type: ArchImportCourseType.run,
			subject: ArchImportSubject.run,
			academic_calendar: ArchImportAcademicCalendar.run,
			course_access_path: ArchImportCourseAccessPath.run,
			working_hour: ArchImportWorkingHour.run,
			time_slot: ArchImportTimeSlot.run,
		};

		const onImportSuccess = {
			academic_calendar: async () => {
				await resetWidget("SelectYear")
			},
			working_hour: async () => {
				await resetWidget("SelectLocation")
			},
			time_slot: async () => {
				await resetWidget("SelectLocation")
			}
		}

		if (!importFunctions[masterType]) {
			return false;
		}
		try {
			const res = await importFunctions[masterType]({ payload });
			if(res && res.errors) {
				this.convertServerErrorToTable(res.errors.reduce((acc, item) => {
						acc[item.rowNumber] = item.error;
						return acc;
				}, {}));
				Snackbar.showSnackbar("resources.masters.message.importedFailure", "error");
				return true;
			} 
			Snackbar.showSnackbar("resources.masters.message.importedSuccess", "success");
			if(onImportSuccess[masterType]) {
				await onImportSuccess[masterType]();
			}
			return true;
		} catch (err) {
			console.log(err);
			this.parseError(err);
			storeValue("importing", false, false);
			return false;
		}
	},
	parseError: async (err) => {
		const errors = JSON.parse(err.message);
		if(this.allowListError.includes(errors.message)) {
				Snackbar.showSnackbar(errors.message, "error");
		} else {
				Snackbar.showSnackbar("resources.masters.message.importedFailure", "error");
		}
		if (errors.code == 3) {
			if(!errors.details || errors.details.length === 0) return;
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