export default {
	editCompanyFlag:"editCompany",
	editCompanyContactFlag:"editCompanyContact",
	fromCompany:"fromCompany",
	newCompanyTempFlag:"newCompanyTempFlag",
	showCompanyContact:[],
	showStore:()=>{
		return {editCompanyFlag:appsmith.store[this.editCompanyFlag],
						editCompanyContactFlag:appsmith.store[this.editCompanyContactFlag],
						fromCompany:appsmith.store[this.fromCompany],
						newCompanyTempFlag:appsmith.store[this.newCompanyTempFlag]
					 }
	}
}