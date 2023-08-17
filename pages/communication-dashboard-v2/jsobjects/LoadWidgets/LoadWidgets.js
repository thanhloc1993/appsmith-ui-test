export default {
	async loadStoreValueWidgets() {
		if (appsmith.store.user_id && appsmith.store.user_id !== appsmith.URL.queryParams["userId"]) {
			await removeValue('token');
			if (appsmith.URL.queryParams["origin"]) {
				postWindowMessage(JSON.stringify({
					"type": "POST_TOKEN",
				}), "window", appsmith.URL.queryParams["origin"]);
			}
		}
		await storeValue('user_id', appsmith.URL.queryParams["userId"]);

		await WidgetDataLoader.getSubmittedTimesheets();

		await WidgetDataLoader.getEnrolledStudents();

		await storeValue('is_empty_widget', !appsmith.store.is_enabled_timesheet && !appsmith.store.is_enabled_enrolled_students_widget);
	}
}
