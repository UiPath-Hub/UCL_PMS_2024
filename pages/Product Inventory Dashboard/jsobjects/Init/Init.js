export default {
	dataDisplayStartTime:moment("2021-01-01","YYYY-MM-DD"), //moment.tz("Asia/Bangkok").format("yyyy-mm-dd"),
	dum:()=>{
		return DATE_FROM.selectedDate   !== ""?moment(DATE_FROM.selectedDate).format():null
	}
}