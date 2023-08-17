export default {
	submitSchedulingJob: async () => {
		try {
			const response = await createSchedulingJob.run();
			if (!response.errors.length) {
				Snackbar.showSnackbar("scheduling.message.createdSuccess", "success");
				return true;
			} else {
				// Handle error in LT-39713
				Snackbar.showSnackbar("scheduling.message.createdFail", "error");
				return false;
			}
		} catch (err) {
			// Handle error in LT-39713
			Snackbar.showSnackbar("scheduling.message.createdFail", "error");
			return false;
		}
	}
}