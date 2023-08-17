export default {
	async loadSubmittedCountTimesheets() {
		if (appsmith.store.user_id && appsmith.store.user_id !== appsmith.URL.queryParams["userId"]) {
			await removeValue('token');
			if (appsmith.URL.queryParams["origin"]) {
				postWindowMessage(JSON.stringify({
					"type": "POST_TOKEN",
				}), "window", appsmith.URL.queryParams["origin"]);
			}
		}

		await storeValue('user_id', appsmith.URL.queryParams["userId"]);
		try {
			const submittedTimesheets = await GetSubmittedTimesheets.run({
				location_ids: appsmith.URL.queryParams["locations"] ? appsmith.URL.queryParams["locations"].split(",") : []
			});

			if (submittedTimesheets.count !== undefined) {
				await storeValue('submitted_count', submittedTimesheets.count, false);
				await storeValue('is_enabled_timesheet', submittedTimesheets.isEnabled, false);
			}
		} catch {
			await storeValue('submitted_count', 0, false);
			await storeValue('is_enabled_timesheet', false, false);
		}

		await storeValue('is_empty_widget', !appsmith.store.is_enabled_timesheet);
	}
}
