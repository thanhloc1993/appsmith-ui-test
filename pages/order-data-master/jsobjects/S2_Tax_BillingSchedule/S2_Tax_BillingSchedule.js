export default {
	getTax: async (tax_id) => {
		const result = await S2_GetTaxByTaxIdV2.run({
			tax_id,
		});
		
		return result.data?.tax[0];
	},
	getBillingScheduleById: async (billingScheduleId) => {
		const result = await S2_GetBillingScheduleById.run({
			billingScheduleId,
		});
		
		return result.data?.billing_schedule[0];
	}
}