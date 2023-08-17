export default {
	onFilePickerChange: () => {		
		if (FilePicker.files.length > 0 && Validation.validateCSV()) {
			storeValue("isImportFailure", false, false);
			storeValue("tableChecked", FilePicker.files[0].data, false);
		} else {
			removeValue("tableChecked");
		}
		return [];
	},
}