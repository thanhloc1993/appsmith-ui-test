export default {
	
	getConfig: async () => {
		//use async-await or promises
		let config = await GetConfig.run(
			{
				keys: ["general.logo","general.app_theme","user.authentication.allowed_address_list","user.authentication.ip_address_restriction"]
			}
		)
		if (config.data) {
			const result = config.data.external_configuration_value.reduce(function(map, obj) {
				map[obj.config_key] = obj.config_value;
				return map;
			}, {});
			return result;
		}
		return [];
	},
	getIPFromConfig: async () => {
		let data = CONFIG_JS.getConfig.data["user.authentication.allowed_address_list"] ? JSON.parse(CONFIG_JS.getConfig.data["user.authentication.allowed_address_list"]).map((row, i) => {
			return {
				location: row.location,
				ip: row.ip
			}
		}) : [];
		storeValue("draft_allowed_address_list", data, false)
		return appsmith.store.allowed_address_list ?  appsmith.store.allowed_address_list : data;
	},
	deleteListIP: () => {
		  let ips = appsmith.store.draft_allowed_address_list;
			let removed = table_edit_ip.selectedRows;
			ips = ips.filter(x => {
				let check = removed ? removed.findIndex(a => {
					return a.location == x.location
				}) : -1;
				return check == -1;
			} );
			storeValue("draft_allowed_address_list", ips, false)
	},
	addIP: () => {
		if (!input_location.isValid || !input_ip.isValid) {
			showAlert("Not a valid value");
			return;
		}
		let addedIPs = appsmith.store.draft_allowed_address_list ? appsmith.store.draft_allowed_address_list : [];
		addedIPs.push({
			location: input_location.text,
			ip: input_ip.text
		})
		storeValue('draft_allowed_address_list', addedIPs, false);
		closeModal("Modal_add_ip");
		showModal("Modal_security");
	},
	saveIP: () => {
		const allowConnect = table_edit_ip.tableData.length == 0 ? 'N' : allow_connect.selectedOptionValue;
		UpdateConfig.run(
			{
				"configKey": "user.authentication.ip_address_restriction",
				"configValue": allowConnect == 'Y' ? 'on' : 'off'
			}
		);
		storeValue("ip_address_restriction", allowConnect == 'Y' ? 'Yes' : 'No', false);
		let ips = table_edit_ip.tableData.map(row => {
			return {
				location: row.location,
				ip: row.ip
			}
		});
		let data = JSON.stringify(ips);
		storeValue("allowed_address_list", data, false);
		console.log(data);
		UpdateConfig.run(
			{
				"configKey": "user.authentication.allowed_address_list",
				"configValue":  data 
			}
		);
		closeModal("Modal_security");
	},
	saveGeneral: () => {
		storeValue("logo", input_logo.text, false);
		storeValue("app_theme", input_theme.text, false);
		UpdateConfig.run(
			{
				"configKey": "general.logo",
				"configValue": input_logo.text
			}
		);
		UpdateConfig.run(
			{
				"configKey": "general.app_theme",
				"configValue": input_theme.text
			}
		);
		closeModal("Model_general");
	}
}