export default {
	getSubmittedTimesheets: async () => {
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
	},

	getEnrolledStudents: async () => {
		const countOfEnrolledStudents = 1322;
		try {
			await storeValue('enrolled_students_count', countOfEnrolledStudents, false);
		} catch {
			await storeValue('enrolled_students_count', 0, false);
		}

		const unleashEnrolledStudents = appsmith.URL.queryParams["unleash"]?.includes("User_Appsmith_Dashboard_Enrolled_Students_Widget");
		const featureSettingEnrolledStudents = appsmith.URL.queryParams["feature_setting"] && JSON.parse(appsmith.URL.queryParams["feature_setting"])["user.dashboard.enrolled_students_widget"] === "on";

		const is_enabled_enrolled_students_widget = unleashEnrolledStudents && featureSettingEnrolledStudents;

		await storeValue('is_enabled_enrolled_students_widget', is_enabled_enrolled_students_widget, false);
	}
}