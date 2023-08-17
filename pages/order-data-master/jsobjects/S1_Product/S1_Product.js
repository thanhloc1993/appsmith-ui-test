export default {
	getProduct: async () => {
		const resultProduct = await S1_GetManyProductsByProductIds.run();
		
		if(!resultProduct) return {};
		const product = resultProduct.data?.product[0];
		
		S2_ProductExtension.getProductExtension(product.product_type).then(res => {
			storeValue(`${Constants.OrderManagementProductPrefix}_ProductExtension`, res, false);
		});
		
		S2_Tax_BillingSchedule.getTax(product.tax_id).then(res => { 
			storeValue(`${Constants.OrderManagementProductPrefix}_ProductTax`, res, false);
		});
		
		S2_Tax_BillingSchedule.getBillingScheduleById(product.billing_schedule_id).then(res => { 
			storeValue(`${Constants.OrderManagementProductPrefix}_BillingSchedule`, res, false);
		});
		
		S4_BillingSchedulePeriod.getBillingSchedulePeriod(product.billing_schedule_id).then(resultBillingSchedulePeriod => {
			storeValue(`${Constants.OrderManagementProductPrefix}_BillingSchedulePeriods`, resultBillingSchedulePeriod, false);
			
			const billingSchedulePeriodIds = resultBillingSchedulePeriod.map(billingSchedulePeriod => {
				return billingSchedulePeriod.billing_schedule_period_id;
			});
			S4_BillingSchedulePeriod.getBillingRatiosHaha(billingSchedulePeriodIds).then(res => {
				storeValue(`${Constants.OrderManagementProductPrefix}_BillingRatios`, res.flat(), false);
			});
		});
		
		return {
			product,
		};
	},
}