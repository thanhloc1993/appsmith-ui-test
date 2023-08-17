export default {
	showSnackbar: (key, type) => {
		if (appsmith.URL.queryParams["origin"]) {
			postWindowMessage(JSON.stringify({
				"type": "SNACKBAR",
				"message": key,
				"severity": type
			}), "window", appsmith.URL.queryParams["origin"]);
		}
		return true;
	}
}