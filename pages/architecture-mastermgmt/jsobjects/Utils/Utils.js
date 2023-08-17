export default {
	objectHasKeysEqual: (obj1, obj2) => {
		const keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);
		return keys1.length === keys2.length && keys1.every(key => keys2.includes(key))
	},
	isValidDate: (value) => {
		return moment(value, "YYYY-MM-DD", true).isValid();
	},
	convertStrToCamelCase: (str) => {
			return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
	},
	isMultipleValidDateStr: (str) => {
		const arrDates = str.split(";");
		const isValid = !arrDates.some((date) => !Utils.isValidDate(date));
		return isValid;
	},
	enumerateDaysBetweenDates: (startDate, endDate) => {
		// startDate and endDate must be moment date object
		const now = startDate.clone().add(1, "days");

		const  dates = [];

		while (now.isBefore(endDate)) {
			dates.push(now.format("YYYY-MM-DD"));
			now.add(1, "days");
		}

		return dates;
	},
	clearPicker: async () => {
    await resetWidget("FilePicker")
  },
	isRealNumber: (value) => {
		return Boolean(Number(value) && Number(value) > 0);
	},
	isBlankValue: (value) => {
		return !value.trim() || value == 'null';
	},
	delay: (ms) => new Promise((res) => setTimeout(res, ms)),
	isValidTime: (value, format) => {
		return moment(value, format, true).isValid();
	},
	isDayOfWeek: (value) => {
		return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].includes(value)
	}
}
