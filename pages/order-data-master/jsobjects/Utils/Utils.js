export default {
	convertObjectToTable: (object = {}, tableName = "Table") => {
		return Object.keys(object).map((key) => {
			return {
				[`${tableName}`]: key,
				[`values`]: object[key]
			}
		});
	},
}