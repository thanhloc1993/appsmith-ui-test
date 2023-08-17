export default {
	getCourse: async () => {
		let config = await CourseList.run();
		return config.data["courses"] || [];
	},
	getOffset: () => {
		return CourseTable.pageOffset;
	},
}