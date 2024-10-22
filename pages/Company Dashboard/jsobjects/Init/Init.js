export default {
	dataDisplayStartTime:moment("2021-01-01","YYYY-MM-DD"), //moment.tz("Asia/Bangkok").format("yyyy-mm-dd"),

	LoadingPage:()=>{
		storeValue(Pagination.SearchingResultsPageIndex,1);		
	}
}