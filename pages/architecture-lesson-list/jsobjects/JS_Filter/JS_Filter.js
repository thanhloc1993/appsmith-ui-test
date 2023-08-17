export default {
	storeObjValue: async (path, field, value) => {
		if(!path) return;
		//use async-await or promises
		const storage = appsmith.store[path] || {};

		storage[field] = value;
		storeValue(path, storage, false);
	},
	getStorageFilter: async (path, field) => {
		//use async-await or promises
		const storage = appsmith.store[path] || {};
		return storage[field];
	}
}