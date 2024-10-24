export default {
	onBUTTON_NEWClick:async()=>{
		await removeValue(PageConfigs.editFlag);
		await removeValue(PageConfigs.newCompanyTempFlag);
		navigateTo('Manage Company', {}, 'SAME_WINDOW');
	},
	onBUTTON_EDITClick:async()=>{
		await storeValue(PageConfigs.editFlag, PMS_COMPANY_LM.selectedRow)
  	await removeValue(PageConfigs.newCompanyTempFlag);
		navigateTo('Manage Company', {}, 'SAME_WINDOW');
	}
}