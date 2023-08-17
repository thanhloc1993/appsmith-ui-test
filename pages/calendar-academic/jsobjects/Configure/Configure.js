export default {
	getConfig: async () => {
		let config = await ArchGetInternalConfig.run({
				keys: ["arch.master_management.import_rules"]
			}
		)
		if (config.data && config.data.internal_configuration_value.length > 0) {
			return config.data.internal_configuration_value[0].config_value;
		}
		return '';
	},
}