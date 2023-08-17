export default {
	getGradeAndLocation: async () => {
		const result = await S2_GetProductGradeAndLocation.run();
		
		return {
			grade: result.data?.product_grade,
			location: result.data?.product_location,
		}
	},
}