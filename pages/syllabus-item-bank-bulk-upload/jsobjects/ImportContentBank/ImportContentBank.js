export default {
	importContentBank: async (payload) => {
		try {
			const response = await HermesImportContentBank.run({ payload });
			
			if (!response.errors.length) {
				Snackbar.showSnackbar("contentBank.message.importedSuccess", "success");
				return true;
			} else {
				storeValue("isImportFailure", true, false);
				ImportHelper.showErrorTable(response.errors);
				Snackbar.showSnackbar("contentBank.message.importedFailure", "error");
				return false;
			}
		} catch (err) {
			Snackbar.showSnackbar("contentBank.message.importedFailure", "error");
			storeValue("importing", false, false);
			return false;
		}
	},
}