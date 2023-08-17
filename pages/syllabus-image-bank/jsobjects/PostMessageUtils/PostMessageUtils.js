export default {
	openBOUploadPopup: () => {
		if (appsmith.URL.queryParams["origin"]) {
			postWindowMessage(JSON.stringify({
				"type": "OPEN_UPLOAD_IMAGE_DIALOG",
			}), "window", appsmith.URL.queryParams["origin"]);
		}
	}
}