export default {
	reOrderColumns: async (index, kind = 'down') => {
		console.log(index);
		let reOrder = {"": true};
		let currentColumns = table_edit_order.tableData;
		if (kind == 'down') {
			[currentColumns[index],currentColumns[index +1]] = [currentColumns[index+1],currentColumns[index]];
		} else {
			[currentColumns[index],currentColumns[index -1]] = [currentColumns[index-1],currentColumns[index]];
		}

		for (let i=0; i < currentColumns.length; i++) {
			reOrder[currentColumns[i].Column] = currentColumns[i].Visible;
		}
		await storeValue("lessonColumns", reOrder);
		JS_Sort_Columns.convertLessonCols(reOrder);
		return true;
	},
	loadLessonCols: async () => {
		if (!appsmith.store.lessonColumns) {
			storeValue("lessonColumns", {
				"": true,
				"Lesson Date": true,
				"Lesson Status": true,
				"Lesson Time": true,
				"Day": true, 
				"Location": true,
				"Teacher": true,
				"Teaching Method": true,
				"Teaching Medium": true,
				"Course": true,
				"Class": true
			});
		};
		JS_Sort_Columns.convertLessonCols(appsmith.store.lessonColumns);
		return true;
	},
	convertLessonCols: (object) => {
		let results = [];
		let customColumns = [];
		Object.entries(object).forEach(([key, value], index) => {
			customColumns.push(key);
			if (key != "") {
				results.push({
					"Column": key,
					"Visible": value,
					"Down": index - 1,
					"Up": index - 1
				});
			}
		});
		storeValue("lessonColsTable", results);
		storeValue("table_future_lesson_customColumns", customColumns);
		storeValue("table_past_lesson_customColumns", customColumns);
		resetWidget("table_future_lesson");
		resetWidget("table_past_lesson");
	},
	saveVisibleColumn: async () => {
		let currentColumns = appsmith.store.lessonColsTable;
		for (let i=0; i < currentColumns.length; i++) {
				for (const value of table_edit_order.updatedRows) {
					if (value.updatedFields.Visible != undefined) {
						currentColumns[value.index].Visible = value.updatedFields.Visible;
					}
				}
		}
		currentColumns = _.sortBy(currentColumns, ['Order']);
		let results = {"": true};
		let customColumns = [""];
		for (const value of currentColumns) {
			customColumns.push(value.Column);
			results[value.Column] = value.Visible
		}
		storeValue("table_future_lesson_customColumns", customColumns);
		storeValue("table_past_lesson_customColumns", customColumns);
		await storeValue("lessonColumns", results);
		JS_Sort_Columns.convertLessonCols(results);
		resetWidget("table_future_lesson");
		resetWidget("table_past_lesson");
		return true;
  },
}