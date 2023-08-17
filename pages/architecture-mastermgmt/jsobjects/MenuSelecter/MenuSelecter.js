export default {
	getOptions () {
		return appsmith.URL.queryParams['lang'] == 'ja' ? [
			{
				"label": "コース",
				"value": "course"
			},
			{
				"label": "コースタイプ",
				"value": "course_type"
			},
			{
				"label": "コース - 拠点",
				"value": "course_access_path"
			},
			{
				"label": "クラス",
				"value": "class"
			},
			{
				"label": "拠点",
				"value": "location"
			},{
				"label": "拠点カテゴリ",
				"value": "location_type"
			},
			{
				"label": "学年",
				"value": "grade"
			},
			{
				"label": "科目",
				"value": "subject"
			},
			{
				"label": "学年度カレンダー",
				"value": "academic_calendar"
			},
			{
				"label": "営業時間",
				"value": "working_hour"
			},
			{
				"label": "授業コマ",
				"value": "time_slot"
			}
		] : [
			{
				"label": "Course",
				"value": "course"
			},
			{
				"label": "Course Type",
				"value": "course_type"
			},
			{
				"label": "Course - Location",
				"value": "course_access_path"
			},
			{
				"label": "Class",
				"value": "class"
			},
			{
				"label": "Location",
				"value": "location"
			},
			{
				"label": "Location Type",
				"value": "location_type"
			},
			{
				"label": "Grade",
				"value": "grade"
			},
			{
				"label": "Subject",
				"value": "subject"
			},
			{
				"label": "Academic Calendar",
				"value": "academic_calendar"
			},
			{
				"label": "Working Hours",
				"value": "working_hour"
			},
			{
				"label": "Time Slot",
				"value": "time_slot"
			}
		];
	}
}