export default {
	englishTranslations: {
		"ERR_CORRECT_OPTION_MISSING": "Missing correct_option value in one or more options. Specify correct_option in MCQ or MCA questions.",
		"ERR_ITEM_DESCRIPTION_INVALID": "Invalid item description. Only the first item_id should have item_name and item_description specified.",
		"ERR_QUESTION_LIMIT_EXCEEDED": "Exceeded maximum question limit. Max 50 questions.",
		"ERR_DATA_TYPE_INVALID": "Invalid data type in one or more fields.",
		"ERR_REQUIRED_VALUE_MISSING": "Missing required fields: item_id, question_type, and question_content_text.",
		"ERR_LO_ID_INVALID": "Invalid LO ID. Please ensure that all LO IDs are of type 'Learnosity'.",
		"ERR_QUESTION_TYPE_INVALID": "Invalid question type.",
		"ERR_OPTIONS_MISSING": "Insufficient options for a question type. Add the required number of options.",
		"ERR_NO_OPTION_SELECTED": "No correct option selected. At least one option should have correct_option set to TRUE.",
		"ERR_FIB_OPTIONS_INVALID": "FIB has an incorrect answer. Please ensure that the number of options in the answer array matches the number of responses in the question_content_text.",
		"ERR_VALUE_OUT_OF_RANGE": "Number of options is out of range. MIQ should not have options.",
		"ERR_MCQ_CORRECT_OPTIONS_INVALID": "Invalid number of correct options. MCQ must have only one correct option",
		"ERR_ITEM_ID_ALREADY_EXISTS": "Item id already existed. Please create another item id",
		"ERR_IMAGE_INVALID": "Invalid image name. The file name must have extension of image file type (.png, .jpeg, .jpg)",
		"ERR_MIQ_EXPLANATION_MISSING": "Missing explanation. Please input the explanation for the MIQ question.",
		"ERR_ITEM_ID_INVALID": "Invalid item_id: Max 150 characters, only Latin alphabet and integer numbers (no special symbols, quotes, or accents).",
		"ERR_UNKNOWN": "Unknown error occurred. Please check CSV file for compliance with format and specifications.",
	},
	japaneseTranslations: {
		"ERR_CORRECT_OPTION_MISSING": "correct_optionが不足してる項目があります。MCQ(選択問題)またはMAQ(複数解答)においてTRUE/FALSEを入力してください。",
		"ERR_ITEM_DESCRIPTION_INVALID": "アイテムの記述が無効です。最初のitem_idはitem_nameとitem_descriptionを定義されている必要があります。",
		"ERR_QUESTION_LIMIT_EXCEEDED": "問題数が超過しています。(最大50問)",
		"ERR_DATA_TYPE_INVALID": "１つ以上の項目でデータ形式が無効です",
		"ERR_REQUIRED_VALUE_MISSING": "いずれかの必須項目(item_id, question_type, question_content_text)が入力されていません",
		"ERR_LO_ID_INVALID": "LO IDが無効です。すべてのLO IDが'Learnosity'形式か確認してください。",
		"ERR_QUESTION_TYPE_INVALID": "無効な問題形式です。",
		"ERR_OPTIONS_MISSING": "問題の選択肢が不足しています。必要な選択肢を追加してください。",
		"ERR_NO_OPTION_SELECTED": "TRUE(正解)が選択されていない項目があります。correct_optionには少なくとも１つTRUEを入力してください。",
		"ERR_FIB_OPTIONS_INVALID": "FIB(空欄補充)で問題文の空欄数と設定した解答数が一致しない項目があります。両者が一致するよう、question_content_textをご確認ください。",
		"ERR_VALUE_OUT_OF_RANGE": "解説が不足しています。入力問題(MIQ)には解説を含めてください。",
		"ERR_MCQ_CORRECT_OPTIONS_INVALID": "正解の数が無効です。MCQ(選択問題)は１つの正解しか設定できません。",
		"ERR_ITEM_ID_ALREADY_EXISTS": "既存のItem IDです。別のItem IDを作成してください。",
		"ERR_IMAGE_INVALID": "画像ファイル名が無効です。有効な拡張子(.png, .jpeg, .jpg)であることをご確認ください。",
		"ERR_MIQ_EXPLANATION_MISSING": "解説が不足しています。入力問題(MIQ)には解説を含めてください。",
		"ERR_ITEM_ID_INVALID": "無効のitem_id: 最大150文字、英数字のみ（特別な記号、引用符、アクセントは使用しない",
		"ERR_UNKNOWN": "未知のエラーが発生しました。入力形式と仕様に沿っているかCSVファイルを確認してください。",
	},
	translateServerErrorMessages: (errorCode) => Utils.isJPTranslation() ? TranslateUtils.japaneseTranslations[errorCode] : TranslateUtils.englishTranslations[errorCode]
}