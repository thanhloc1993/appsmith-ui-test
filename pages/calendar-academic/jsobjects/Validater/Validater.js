export default {
	initSampleTable: () => {
		storeValue("tableChecked", [{
			"loading": "...."
		}], false);
		setTimeout(() => {
			removeValue("tableChecked");
		}, 100);
	},
	checkColumn: (key, value, rule) => {
		if(!rule) return "Fail to get rule config";
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
						if(!Utils.isValidDate(value)) {
							// TODO: update translation later
							return appsmith.URL.queryParams['lang'] == 'ja' ? "Value must be valid date" : "Value must be valid date";
						}
						break;
					case "is_valid_multiple_date":
						if(!Utils.isMultipleValidDateStr(value)) {
							return appsmith.URL.queryParams['lang'] == 'ja' ? "Value must be valid array date" : "Value must be valid array date";
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