export default {
	isValidType: (data, type) => {
		switch (type) {
			case 'number': {
				return typeof data === type;
			}
			case 'string': {
				return typeof data === type || typeof data === "number";
			}
			case 'date': {
				try {
					const date = new Date(data)
					return Boolean(date.getDate());
				} catch (e) {
					return false;
				}
				return false;
			}
			case 'boolean': {
				return typeof data === type || typeof data === 'number' && [0,1].includes(data);
			}
			case 'time': {
				if (typeof data !== "string") return false;
				
				const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;
				return timeRegex.test(data);
			}
			default: {
				return typeof data === type;
			}
		}
		
		return false;

	}, 
	isValidData: (data, rules) => {
		const {type, require} = rules;
		return (data === null || data === undefined || data === "NULL") ? !require : this.isValidType(data, type);
	},
	getCSVDataFromFile: (files) => {
		if (!files || files.length === 0) return [];
		const csvData = files[0].data;
		
		if (csvData.length > 0) {
			const lastRow = csvData[csvData.length - 1]
			const lastRowVal = Object.values(lastRow);
			if (lastRowVal.every(value => !value)) {
				csvData.splice(-1)
			}
		}

		return csvData;
	},
	convertType: (from, to, value) => {
		if (from === "number" && to === "string") return value.toString()
		if (from === "number" && to === "boolean") return Boolean(value)
		return value;
	}
}