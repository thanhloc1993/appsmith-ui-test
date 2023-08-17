export default {
	queryImageHistory: async () => {
		const imageHistoryResponse = await SyllabusImageHistoryQuery.run();
		const imageHistoryData = imageHistoryResponse.data.content_bank_medias;

		const imageHistoryTableData = imageHistoryData.map(({name, resource, file_size_bytes}) => ({
			name,
			image: resource,
			fileSize: `${Math.round(file_size_bytes/10000) / 100} MB`,
			action: name
		}))

		storeValue("imageHistoryData", imageHistoryTableData);
	}
}