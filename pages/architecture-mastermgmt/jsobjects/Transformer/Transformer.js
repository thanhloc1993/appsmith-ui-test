export default {
	getAcademicYearOptions: () => {
		const result = ArchGetAcademicYears.data;
		if (result && result.data && result.data.academic_year && result.data.academic_year.length > 0) {
			return result.data.academic_year.map((item) => {
				return {
					label: item.name,
					value: item.academic_year_id,
				};
			});
		}
		return [];
	},
	getLocationForAcademicOptions: () => {
		if(!SelectYear.selectedOptionValue || !AcademicHelper.isFecthLocation) return [];
		const result = ArchGetLocationsForAcademic.data;
		const importedTranslate = appsmith.URL.queryParams['lang'] == 'ja' ? "インポート済" : "Imported";
		if (result && result.locations && result.locations.length > 0) {
			return result.locations.map((item) => {
				return {
					label: item.name + (item.isImported ? ` (${importedTranslate})` : ""),
					value: item.locationId,
					isImported: item.isImported,
				};
			});
		}
		return [];
	},
	getLocationByLevelConfigOptions: () => {
		const result = ArchGetLocationsByLevelConfig.data || [];
		if (result && result.locations && result.locations.length > 0) {
			return result.locations.map((item) => {
				return {
					label: item.name,
					value: item.locationId,
				};
			});
		}
		return [];
	}
};
