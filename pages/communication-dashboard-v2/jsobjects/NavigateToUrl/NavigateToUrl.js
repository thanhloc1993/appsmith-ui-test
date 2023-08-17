export default {
	navigate: (url) => {
		if (appsmith.URL.queryParams["origin"]) {
			postWindowMessage(JSON.stringify({
				"type": "NAVIGATE",
				"url": url,
			}), "window", appsmith.URL.queryParams["origin"]);
		}
		return true;
	}
}