export default {
	onFilePickerChange: async () => {
		if(FilePicker.files.length > 0) {
			const firstItemFiles = FilePicker.files[0].data[0];
			const cloneObj = {};
			Object.keys(firstItemFiles).forEach((key) => {
				cloneObj[key] = "loading..."
			})
			storeValue("tableChecked", [cloneObj], false);
			await Utils.delay(500);
			storeValue("tableChecked", FilePicker.files[0].data, false);
		} else {
			removeValue("tableChecked");
		}
		
		return [];
	},
}
