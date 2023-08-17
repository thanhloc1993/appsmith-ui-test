export default {
	getTableData: () => {
		const TABLE_DATA_SAMPLE = {
			academic_calendar: {
				academic_week: " ",
				start_date: " ",
				end_date: " ",
				period: " ",
				academic_closed_day: " "
			}
		}
		const initData = TABLE_DATA_SAMPLE[SelectType.selectedOptionValue];

		if(FilePicker.files.length > 0) {
			if(appsmith.store.tableChecked) {
				// const cloneFirstItemTableChecked = {...appsmith.store.tableChecked[0]};
				// delete cloneFirstItemTableChecked["ERROR DETAILS"]
				// if(cloneFirstItemTableChecked && Utils.objectHasKeysEqual(cloneFirstItemTableChecked, initData)) {
					// return appsmith.store.tableChecked;
				// } 
				// return [initData]
				// just skip check this logic now
				return appsmith.store.tableChecked
			}
			const firstItemFiles = FilePicker.files[0].data[0];
			if(firstItemFiles && Utils.objectHasKeysEqual(firstItemFiles, initData)) {
				return FilePicker.files[0].data
			}
			return [initData]
		}
		removeValue("tableChecked");
		return [initData]
	}
}
