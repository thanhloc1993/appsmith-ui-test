export default {
	getProductSetting: async () => {
		const result = await S2_GetProductSetting.run();
		
		return result.data?.product_setting[0];
	},
}