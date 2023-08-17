export default {
	enableUploadButton: () => {
		return [FilePickerSAC.files, FilePickerCOF.files, FilePickerSAF.files, FilePickerTAF.files, FilePickerTCF.files, FilePickerCMF.files].some((files) => { 
			return files.length === 0
		});
	},
	insertData: async () => {
		const run_time_id = self.crypto.randomUUID();
		storeValue("run_time_id", run_time_id);
		
		const response =await Promise.all(["SAC", "COF","SAF",  "TAF", "TCF", "CMF"].map((fileName) => {
			const files = Import.getFileByTableName(fileName)
			const csvData = Utils.getCSVDataFromFile(files)
			const data = csvData.map((item) => ({...item, run_time_id}))

			if (fileName === "SAC") {
				 return InsertAppliedSlot.run({
					"data": data
				})
			}
			if (fileName === "COF") {
				return InsertCenterOpening.run({
					"data": data
				})
			}
			if (fileName === "SAF") {
				return InsertStudentAvailabelSlot.run({
					"data": data
				})
			}
			if (fileName === "TAF") {
				return InsertTeacherAvailabelSlot.run({
					"data": data
				})
			}
			if (fileName === "TCF") {
				return InsertTeacherSubject.run({
					"data": data
				})
			}
			if (fileName === "CMF") {
				return InsertTimeSlot.run({
					"data": data
				})
			}
		}));
		console.log("response", response)
	}
}