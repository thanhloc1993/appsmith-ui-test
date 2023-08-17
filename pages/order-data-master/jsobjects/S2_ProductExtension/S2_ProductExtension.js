export default {
	getProductExtension: async (product_type) => {
		if(!product_type) return;
		
		switch(product_type){
     	case "PRODUCT_TYPE_MATERIAL":
				const resultMaterial = await S2_GetManyMaterialsByProductId.run();

				return resultMaterial.data.material[0];
			case "PRODUCT_TYPE_FEE":
				const resultFee = await S2_GetManyFeesByProductIds.run();
				return resultFee.data.fee[0];
			case "PRODUCT_TYPE_PACKAGE":
				const resultPackage = await S2_GetPackageByProductId.run();
				return resultPackage.data.package[0];
     	default:
     		break;
     }	
	},
}