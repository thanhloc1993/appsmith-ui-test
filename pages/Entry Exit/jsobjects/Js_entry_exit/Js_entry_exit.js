export default {
	scanQrcode: async () => {
		console.log(qr_code.value);
		//use async-await or promises
		const student = await Verify_user.run(
			{
				"student_id": qr_code.value
			}
		);
		if (student.length == 0) {
			return false;
		}
		const lastCheckin = await Get_last_checkin.run(
			{
				"student_id": qr_code.value
			}
		);
		let type = "entry";
		if (lastCheckin.length > 0) {
			console.log(lastCheckin[0].exit_at);
			type = lastCheckin[0].exit_at ? "entry": "exit";
		}
		const data = await Add_entry_exit.run(
			{
				"entryexit_id": self.crypto.randomUUID(),
				"student_id": qr_code.value,
				"entry_at": type == "entry" ? moment().format("YYYY-MM-DD HH:mm:ss") : null,
				"exit_at": type == "exit" ? moment().format("YYYY-MM-DD HH:mm:ss") : null,
			}
		);
		console.log(data);
		
		return true;
	}
}