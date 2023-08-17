export default {
	getBillingSchedulePeriod: async (billingScheduleId) => {
		const result = await S4_GetManyBillingSchedulePerio.run({
			billingScheduleId
		});
		
		return result.data?.billing_schedule_period;
	},
	getBillingRatiosHaha: async (billingScheduleIds) => {
		const result = [];
		for await (const billingScheduleId of billingScheduleIds) {
			const resultBillingRatio = await S4_GetManyBillingRatios.run({
				billingScheduleId
			});
			result.push(resultBillingRatio.data?.billing_ratio)
		}
		
		return result;
	}
}