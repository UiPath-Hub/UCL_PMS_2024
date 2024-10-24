export default {
	editFlag:"editCompanyContact",
	fromCompany:"fromCompany",
	showFlag:()=>{
		return appsmith.store[this.fromCompany]
	}
}