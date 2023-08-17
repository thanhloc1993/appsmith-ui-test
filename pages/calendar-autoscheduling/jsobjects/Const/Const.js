export default {
	columnsName: (tableName) => {
		if (tableName === "SAC")
			return ["year", "period", "center_num", "student_id", "enrollment_status", "grade", "student_name", "applied_slot", "literature_slot", "math_slot", "en_slot", "science_slot", "social_science_slot", "other_slot_1", "other_slot_2", "other_slot_3", "other_slot_4", "other_slot_5", "other_slot_6", "other_slot_7", "other_slot_8", "other_slot_9", "other_slot_10", "sd_literature_slot", "sd_math_slot", "sd_en_slot", "sd_science_slot", "sd_social_slot", "sd_other_slot_1", "sd_other_slot_2", "sd_other_slot_3", "sd_other_slot_4", "sd_other_slot_5", "sd_other_slot_6", "sd_other_slot_7", "sd_other_slot_8", "sd_other_slot_9", "sd_other_slot_10", "preferred_gender", "sibling_should_be_same_time"];

		if (tableName === "COF") return ["year", "period", "center_num", "date", "time_period", "open_or_not"];

		if (tableName === "SAF") return ["year",	"period"	,"center_num",	"student_id",	"date"	,"time_period",	"open_or_not"];

		if (tableName === "TAF") return ["year"	,"period"	,"teacher_id",	"date",	"time_period",	"open_or_not",	"center_num"];

		if (tableName === "TCF") return ["teacher_id",	"grade_div",	"subject_id"	,"available_or_not"];

		if (tableName === "CMF") return ["year",	"period",	"center_num",	"time_period",	"start_time",	"end_time"];

		return [];
	},
	dataRules: (tableName) => {
		if (tableName === "SAC")
			return  {
				year: {
					type: "number",
					require: true
				},
				period: {
					type: "number",
					require: true
				},
				center_num: {
					type: "number",
					require: true
				},
				student_id: {
					type: "string",
					require: true
				},
				enrollment_status: {
					type: "number",
					require: true
				},
				grade: {
					type: "number",
					require: true
				},
				student_name: {
					type: "string",
					require: true
				},
				applied_slot: {
					type: "number",
					require: false
				},
				literature_slot: {
					type: "number",
					require: false
				},
				math_slot: {
					type: "number",
					require: false
				},
				en_slot: {
					type: "number",
					require: false
				},
				science_slot: {
					type: "number",
					require: false
				},
				social_science_slot: {
					type: "number",
					require: false
				},
				other_slot_1: {
					type: "number",
					require: false
				},
				other_slot_2: {
					type: "number",
					require: false
				},
				other_slot_3: {
					type: "number",
					require: false
				},
				other_slot_4: {
					type: "number",
					require: false
				},
				other_slot_5: {
					type: "number",
					require: false
				},
				other_slot_6: {
					type: "number",
					require: false
				},
				other_slot_7: {
					type: "number",
					require: false
				},
				other_slot_8: {
					type: "number",
					require: false
				},
				other_slot_9: {
					type: "number",
					require: false
				},
				other_slot_10: {
					type: "number",
					require: false
				},
				sd_literature_slot: {
					type: "number",
					require: false
				},
				sd_math_slot: {
					type: "number",
					require: false
				},
				sd_en_slot: {
					type: "number",
					require: false
				},
				sd_science_slot: {
					type: "number",
					require: false
				},
				sd_social_slot: {
					type: "number",
					require: false
				},
				sd_other_slot_1: {
					type: "number",
					require: false
				},
				sd_other_slot_2: {
					type: "number",
					require: false
				},
				sd_other_slot_3: {
					type: "number",
					require: false
				},
				sd_other_slot_4: {
					type: "number",
					require: false
				},
				sd_other_slot_5: {
					type: "number",
					require: false
				},
				sd_other_slot_6: {
					type: "number",
					require: false
				},
				sd_other_slot_7: {
					type: "number",
					require: false
				},
				sd_other_slot_8: {
					type: "number",
					require: false
				},
				sd_other_slot_9: {
					type: "number",
					require: false
				},
				sd_other_slot_10: {
					type: "number",
					require: false
				},
				preferred_gender: {
					type: "number",
					require: false
				},
				sibling_should_be_same_time: {
					type: "number",
					require: false
				}
			}
		
		if (tableName === "COF") return {
				year: {
					type: "number",
					require: true
				},
				period: {
					type: "number",
					require: false
				},
				center_num: {
					type: "number",
					require: false
				},
				date: {
					type: "date",
					require: false
				},
				time_period: {
					type: "number",
					require: false
				},
				open_or_not: {
					type: "boolean",
					require: false
				},
		};
		
		if (tableName === "SAF") return {
				year: {
					type: "number",
					require: false
				},
				period: {
					type: "number",
					require: false
				},
				center_num: {
					type: "number",
					require: false
				},
				student_id: {
					type: "string",
					require: true
				},
				date: {
					type: "date",
					require: false
				},
				time_period: {
					type: "number",
					require: false
				},
				open_or_not: {
					type: "boolean",
					require: false
				},
		}
		
		if (tableName === "TAF") return {
				year: {
					type: "number",
					require: false
				},
				period: {
					type: "number",
					require: false
				},
				center_num: {
					type: "number",
					require: false
				},
				teacher_id: {
					type: "string",
					require: true
				},
				date: {
					type: "date",
					require: false
				},
				time_period: {
					type: "number",
					require: false
				},
				open_or_not: {
					type: "boolean",
					require: false
				},
		}
		
		if (tableName === "TCF") {
			return {
				teacher_id: {
					type: "string",
					require: true
				},
				grade_div: {
					type: "number",
					require: false
				},
				subject_id: {
					type: "number",
					require: true
				},
				available_or_not: {
					type: "boolean",
					require: false
				},
			}
		}
		
		if (tableName === "CMF") {
			return {
				year: {
					type: "number",
					require: false
				},
				period: {
					type: "number",
					require: false
				},
				center_num: {
					type: "number",
					require: false
				},
				time_period: {
					type: "number",
					require: false
				},
				start_time: {
					type: "time",
					require: false
				},
				end_time: {
					type: "time",
					require: false
				},
				
			}
		}

		return {}
	}
}