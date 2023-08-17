export default {
	getConfig: async () => {
		let config = await ArchGetInternalConfig.run({
			keys: ["arch.master_management.import_rules", "arch.master_management.enable_export", "arch.master_management.enable_import"]
		}
																								)
		if (config.data && config.data.internal_configuration_value.length > 0) {
			const importRules = config.data.internal_configuration_value.find(x => x.config_key == 'arch.master_management.import_rules');
			const exportWhitelist = config.data.internal_configuration_value.find(x => x.config_key == 'arch.master_management.enable_export');
			const importWhitelist = config.data.internal_configuration_value.find(x => x.config_key == 'arch.master_management.enable_import');
			if(exportWhitelist) {
				try {
					storeValue("enableExportButton", JSON.parse(exportWhitelist.config_value));
				} catch (error) {
					console.error("error store enableExportButton ",error);
				}
			}
			if(importWhitelist) {
				try {
					storeValue("enableImportButton", JSON.parse(importWhitelist.config_value));
				} catch (error) {
					console.error("error store enableImportButton ",error);
				}
			}
			return importRules.config_value || '';
		}
		return '';
	},
	overrideCourseRule:[
		{
			"name": "course_id",
			"rules": ""
		},
		{
			"name": "course_name",
			"rules": "required|max:50"
		},
		{
			"name": "course_type_id",
			"rules": ""
		},
		{
			"name": "course_partner_id",
			"rules": ""
		},
		{
			"name": "teaching_method",
			"rules": "includes:Group,Individual,null"
		},
		{
			"name": "remarks",
			"rules": ""
		}
	]
}
