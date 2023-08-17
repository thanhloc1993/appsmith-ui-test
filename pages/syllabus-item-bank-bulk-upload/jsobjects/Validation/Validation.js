export default {
	validateCSVHeaders: () => {
		// https://docs.google.com/spreadsheets/d/1xaKVXSuGNf4syZ9d0T6xIW0yocMQMBANqo81y5Gw5i4/edit#gid=0
		const NUMBER_OF_CSV_HEADERS = 14;
		const csvHeaders = Object.keys(FilePicker.files[0].data[0]);
		const isNumberOfHeadersValid = csvHeaders.length === NUMBER_OF_CSV_HEADERS;

		if (!isNumberOfHeadersValid) {
			Snackbar.showSnackbar("contentBank.message.invalidNumberOfHeaders", "error");
		}

		return isNumberOfHeadersValid;
	},
	validateCSV: () => Validation.validateCSVHeaders(),
}