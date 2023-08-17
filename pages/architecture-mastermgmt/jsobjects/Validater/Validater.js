export default {
	checkBusiness: () => {
		// should return error object like {1: "error"}
		const defineFuncCheck = {
			academic_calendar: AcademicHelper.getClosedDayAndCheckDuration,
			working_hour: AcademicHelper.validateWorkingHour,
			time_slot: AcademicHelper.validateTimeSlot,
		}
		const funcCheck = defineFuncCheck[select_master.selectedOptionValue];
		if(!funcCheck) {
			return {};
		}
		return funcCheck();
	},
	checkColumn: (key, value, rule) => {
		if(key === 'ERROR DETAILS') return null;
		if(key != rule['name']) {
			return appsmith.URL.queryParams['lang'] == 'ja' ? `項目名は ${rule['name']}にしてください` : `The column name should be ${rule['name']}`;
		}
		if(rule['rules'] != '') {
			const rules = rule['rules'].split("|");

			for (let rule of rules) {
				// Extract the rule name and any parameters
				const [name, param] = rule.split(":");

				// Call the corresponding validation function
				switch (name) {
					case "required":
						if (!value.trim() || value == 'null') {
							return appsmith.URL.queryParams['lang'] == 'ja' ? "必須の項目です" : "Field is required";
						}
						break;

					case "max":
						const maxLength = parseInt(param);
						if (value && value.length > maxLength) {
							return appsmith.URL.queryParams['lang'] == 'ja' ? `${maxLength}文字以内で入力してください` : `Value must be no longer than ${maxLength} characters`;
						}
						break;
					case "includes":
						if(!param.split(',').includes(value)) {
							return appsmith.URL.queryParams['lang'] == 'ja' ? `入力値は${param}にしてください` : `Value must be ${param}`;
						}
						break;
					case "is_valid_date":
						if(!Utils.isBlankValue(value) && !Utils.isValidDate(value)) {
							// TODO: update translation later
							return appsmith.URL.queryParams['lang'] == 'ja' ? "日付の形式を正しく入力してください" : "Value must be a valid date";
						}
						break;
					case "is_valid_multiple_date":
						if(!Utils.isBlankValue(value) && !Utils.isMultipleValidDateStr(value)) {
							return appsmith.URL.queryParams['lang'] == 'ja' ? "複数の日付の入力は「;」で区切ってください" : "Value must be a valid multiple days string";
						}
						break;
					case "is_positive_number":
						if(!Utils.isBlankValue(value) && !Utils.isRealNumber(value)) {
							return appsmith.URL.queryParams['lang'] == 'ja' ? "実数を入力してください" : "Value must be a real number";
						}
						break;
					case "is_valid_time_of_date":
						if(!Utils.isBlankValue(value) && !Utils.isValidTime(value, "HH:mm")) {
							return appsmith.URL.queryParams['lang'] == 'ja' ? "時間の入力は規定の形式(hh:mm)に合わせてください" : "Value must follow time format hh:mm";
						}
						break;
					case "is_day_of_week":
						if(!Utils.isBlankValue(value) && !Utils.isDayOfWeek(value)) {
							return appsmith.URL.queryParams['lang'] == 'ja' ? "曜日を入力してください" : "Value must be day of the week";
						}
						break;
					default:
						return `Unknown validation rule: ${name}`;
				}
			}
		}
		return null;
	},
}