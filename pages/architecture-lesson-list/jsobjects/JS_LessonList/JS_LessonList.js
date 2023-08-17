export default {
	getVisibleColumn: () => {
		let results = [];
		for (const key in appsmith.store.lessonColumns) {
			if(appsmith.store.lessonColumns[key]) {
				results.push(key);
			}
		}
		return results;
	},
	formatTeacherOptions: () => {
		const teacherList = Get_Teacher.data.data.staff;
		return teacherList.map((item) => ({
			label: item.user.name,
			value: item.staff_id
		}))
	},
	formatLocationOptions: () => {
		const locationList = Get_Location.data.data.get_locations_lowest_level;
		return locationList.map((item) => ({
			label: item.name,
			value: item.location_id
		}))
	},
	formatStudentOptions: () => {
		const studentList = Get_Student.data.data.users;
		return studentList.map((item) => ({
			label: item.name,
			value: item.user_id
		}))
	},
	formatGradeOptions: () => {
		const gradeList = Get_Grade.data.data.grade;
		return gradeList.map((item) => ({
			label: item.name,
			value: item.grade_id
		}))
	},
	formatCourseOptions: () => {
		const courseList = Get_Course.data.data.courses;
		return courseList.map((item) => ({
			label: item.name,
			value: item.course_id
		}))
	},
	formatClassOptions: () => {
		const classList = Get_Class.data.data.class;
		return classList.map((item) => ({
			label: item.name,
			value: item.class_id
		}))
	},
	formatCourseTypeOptions: () => {
		const courseTypeList = Get_Course_Type.data.data.course_type;
		return courseTypeList.map((item) => ({
			label: item.name,
			value: item.course_type_id
		}));
	},
	loadLesson: async () => {
		storeValue("isLoading", true);
		const lessons = tab_lesson.selectedTab === 'Future Lesson' ? await Architecture_Future_Lessons.run(
			{
				limit: 10,
				offset: table_future_lesson.pageOffset,
				time: moment().startOf('day').format('YYYY-MM-DD')
			}
		) : await Architecture_Past_Lessons.run(
			{
				limit: 10,
				offset: table_past_lesson.pageOffset,
				time: moment().startOf('day').format('YYYY-MM-DD')
			}
		)
		if (tab_lesson.selectedTab === 'Future Lesson') {
			storeValue("futureLessons", lessons.items, false);
			storeValue("futureTotalLesson", lessons.totalLesson, false);
		}else{
			storeValue("pastLessons", lessons.data.lessons, false);
			storeValue("pastTotalLesson", lessons.data.lessons_aggregate.aggregate.count, false);
		}

		storeValue("isLoading", false);
		return true;
	},
	async submitFilter() {
		this.loadLesson();
		closeModal("Modal2");
	},
	getTableFutureOffset: () => {
		return table_future_lesson.pageOffset;
	},
	getTablePastOffset: () => {
		return table_past_lesson.pageOffset;
	},
	convertLessonStatus: (status) => {
		if(status == 'LESSON_SCHEDULING_STATUS_PUBLISHED') {
			return {
				"text": "Published",
				"color": "rgb(156, 39, 176)"
			};
		} else if(status == 'LESSON_SCHEDULING_STATUS_DRAFT') {
			return {
				"text": "Draft",
				"color": "rgb(117, 117, 117)"
			};
		} else if(status == 'LESSON_SCHEDULING_STATUS_COMPLETED') {
			return {
				"text": "Completed",
				"color": "rgb(59, 135, 62)"
			};
		} else {
			return {
				"text": "Cancelled",
				"color": "rgb(244, 67, 54)"
			};
		}
	}
}