export default {
	getProductDiscount: async () => {
		const result = await S3_GetManyAssociatedDiscounts.run();
		
		return result;
	},
	getProductPrices: async () => {
		const result = await S3_GetProductPriceByProductId.run();
		
		return result;
	},
	
}