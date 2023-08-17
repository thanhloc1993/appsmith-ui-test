export default {
	isEnabledbyUnleash: (key) => {
		const unleashParam = appsmith.URL.queryParams["unleash"];
		if(!unleashParam || !key) return false;
		const unleashKeys = unleashParam.split(",");
		return unleashKeys.includes(key);
	}
}