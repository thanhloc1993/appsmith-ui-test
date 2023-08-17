export default {
	handleCopyImageName: () => {	
		copyToClipboard(ImageBankHistoryTable.triggeredRow.name);
	},
}