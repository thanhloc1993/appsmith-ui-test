export default {
	objectHasKeysEqual: (obj1, obj2) => {
		const keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);
		return keys1.length === keys2.length && keys1.every(key => keys2.includes(key))
	},
	isValidDate: (value) => {
		return moment(value, "YYYY-MM-DD", true).isValid();
	},
	isMultipleValidDateStr: (str) => {
		if(str == "") return true;
		const arrDates = str.split("_");
		const isInValid = arrDates.some((date) => !Utils.isValidDate(date));
		return !isInValid;
	}
}
