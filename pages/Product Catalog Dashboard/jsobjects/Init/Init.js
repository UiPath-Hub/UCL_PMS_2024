export default {
	dataDisplayStartTime:moment("2021-01-01","YYYY-MM-DD"), //moment.tz("Asia/Bangkok").format("yyyy-mm-dd"),
	dum:()=>{
		return this.dataDisplayStartTime.format("YYYY-MM-DD").toString()
	}
}