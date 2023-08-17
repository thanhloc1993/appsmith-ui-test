export default {
	exportFile: async () => {
		const masterType = select_master.selectedOptionValue;
		const exportFunctions = {
			class: ArchExportClass.run,
			location: ArchExportLocation.run,
			course: ArchExportCourse.run,
			location_type: ArchExportLocationType.run,
			grade: ArchExportGrade.run,
			course_type: ArchExportCourseType.run,
			subject: ArchExportSubject.run,
			course_access_path: ArchExportCourseAccessPath.run
		};

		if (!exportFunctions[masterType]) {
			return false;
		}
		try {
			let { data } = await exportFunctions[masterType]();
			if(masterType == 'course_type') {
				data = Papa.unparse(data.course_type);
				data = btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, (match, p1) => {
					return String.fromCharCode('0x' + p1);
				}));
			}
			const BOM = "\uFEFF"; 
			const csvContent = this.decodeBase64(data);
			const blob = new Blob([csvContent], {type: 'text/csv'});
			const url = URL.createObjectURL(blob);
			await download(url,  `${masterType}.csv`, `text/csv;charset=utf-8,${BOM}`)
			return true;
		} catch (err) {
			console.log(err);
			Snackbar.showSnackbar("resources.masters.message.exportedFailure", "error");
			storeValue("importing", false, false);
			return false;
		}
	},
	exportTemplateFile: async () => {
		const rules = await Configure.getConfig();
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
		const headers = ruleContent[select_master.selectedOptionValue].map((item) => item.name);
		const csvString = headers.join(',') + '\n';
		download(csvString, `csv_template_${select_master.selectedOptionValue}.csv`, 'text/csv');
		return true;
	},
	// prevent losing utf8 character
	decodeBase64: (base64) => {
		const text = atob(base64);
		const length = text.length;
		const bytes = new Uint8Array(length);
		for (let i = 0; i < length; i++) {
			bytes[i] = text.charCodeAt(i);
		}
		const decoder = new TextDecoder(); // default is utf-8
		return decoder.decode(bytes);
	}
}