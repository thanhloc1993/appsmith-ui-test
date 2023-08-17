export default {
	loadLessonDetail: async () => {
		//use async-await or promises
		const lessons = await Arch_Lesson_Detail.run(
			{
				lesson_id: appsmith.URL.queryParams["lessonId"]
			}
		) 
		if (lessons && lessons.data && lessons.data.lessons.length > 0) {
			return lessons.data.lessons[0];
		}
		return true;
	}
}