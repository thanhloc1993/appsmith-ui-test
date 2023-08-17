export default {
	academicClosedDay: [],
	isFecthLocation: false,
	getClosedDayAndCheckDuration: () => {
		AcademicHelper.academicClosedDay = [];
		// reset academic closed days
		const errorsObj = {};
		const academicData = MasterData.tableData.filter((row) => Utils.isRealNumber(row.order)).map((row, index) => {
			return {
				...row, csvIndex: index
			}
		}).sort((a, b) => a.order - b.order);
		let prevEndDate = moment(academicData[0]?.start_date, "YYYY-MM-DD", true).subtract(1, "days");
		let prevOrder = 0;

		academicData.forEach((item) => {
			const errArr = [];
			const startDate = moment(item.start_date, "YYYY-MM-DD", true);
			const endDate = moment(item.end_date, "YYYY-MM-DD", true);

			if(item.order !== prevOrder + 1) {
				errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "行番号は連番である必要があります" : "Order should be sequential");
			};

			if(startDate.isSameOrAfter(endDate)) {
				errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "開始日は終了日より前の日付を入力してください" : "Start date must be earlier than End date");
			};

			if(startDate.isSameOrBefore(prevEndDate)) {
				errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "開始日は前の週の終了日より後の日付を入力してください" : "Start date must be greater than End Date of previous week");
			};

			if(errArr.length == 0) {
				const arrClosedDates = item.academic_closed_day?.split(";") || [];
				const isValid = arrClosedDates.every((dateStr) => {
					const closedDate = moment(dateStr, "YYYY-MM-DD", true);
					if (closedDate.isSameOrAfter(startDate) && closedDate.isSameOrBefore(endDate)) {
						return true;
					}
				});
				if(!isValid) {
					errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "閉校日は該当の週に含まれる日付を設定してください" : "Closed days must be within week duration time");
				}
			};
			if(errArr.length == 0) {
				AcademicHelper.academicClosedDay.push(...Utils.enumerateDaysBetweenDates(prevEndDate, startDate));
			} else {
				errorsObj[item.csvIndex] = `error: ${errArr.join(", ")}`;
			}

			prevEndDate = endDate;
			prevOrder = item.order;
		})
		if(Object.keys(errorsObj).length > 0) {
			AcademicHelper.academicClosedDay = [];
		}
		return errorsObj;
	},
	onSelectYearChange: async () => {
		if(!SelectYear.selectedOptionValue) return;
		AcademicHelper.isFecthLocation = false
		await ArchGetLocationsForAcademic.run();
		AcademicHelper.isFecthLocation = true
	},
	validateWorkingHour: () => {
		const errorsObj = {};
		const dayOfWeeks = [];
		MasterData.tableData.forEach((item, index) => {
			const errArr = [];
			const openingTime = moment(item.opening_time, "HH:mm", true);
			const closingTime = moment(item.closing_time, "HH:mm", true);
			if(openingTime.isSameOrAfter(closingTime)) {
				errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "opening_time(開館時刻)はclosing_time(閉館時刻)より前に設定してください" : "Opening time must be earlier than Closing time");
			};
			if(dayOfWeeks.includes(item.day)) {
				errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "曜日が被らないように入力してください" : "Day of the week must be unique");
			} else {
				dayOfWeeks.push(item.day);
			}
			if(errArr.length > 0) {
				errorsObj[index] = `error: ${errArr.join(", ")}`;
			}
		})
		return errorsObj;
	},
	validateTimeSlot: () => {
		const errorsObj = {};
		const internalIds = [];
		const durations = [];
		MasterData.tableData.forEach((item, index) => {
			const errArr = [];
			const startTime = moment(item.start_time, "HH:mm", true);
			const endTime = moment(item.end_time, "HH:mm", true);
			if(startTime.isSameOrAfter(endTime)) {
				errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "開始時刻は終了時刻より前に設定してください" : "Start time must come before End time");
			};
			if(internalIds.includes(item.time_slot_internal_id)) {
				errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "time_slot_internal_id(内部授業コマID)は重複しないように入力してください" : "Time Slot Internal Id must not be duplicated");
			} else {
				internalIds.push(item.time_slot_internal_id);
			}
			const durationStr = `${item.start_time}_${item.end_time}`
			
			if(durations.includes(durationStr)) {
				errArr.push(appsmith.URL.queryParams['lang'] == 'ja' ? "授業時間が重複しないように入力してください" : "The time slot must not be duplicated");
			} else {
				durations.push(durationStr);
			}
			
			if(errArr.length > 0) {
				errorsObj[index] = `error: ${errArr.join(", ")}`;
			}
		})
		return errorsObj;
	},
}
