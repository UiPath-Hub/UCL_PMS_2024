export default {
	pageLoad:async ()=>{
		const setAttribute =async (data)=>{
			if(data != undefined){
				await SELECT_PROVINCEs.run();
				Object.keys(DefaultCompany).map((attribute)=>{
					if(data[attribute] != undefined){
						DefaultCompany[attribute].data = data[attribute];
							
					}
				});
				await resetWidget("Form",true);
				
				await SELECT_DISTRICTs.run();
				await SELECT_SUBDISTRICTs.run();
				await SELECT_POSTAL_CODE.run();
			}
		}
		if(appsmith.store[PageConfigs.newCompanyTempFlag] != undefined && appsmith.store[ PageConfigs.editCompanyFlag]==undefined){
			//temp and load editing before manage contacts
			await setAttribute(appsmith.store[PageConfigs.newCompanyTempFlag]);
			await SP_SELECT_ALL_C_CONTACT_TEMP.run();
			PageConfigs.showCompanyContact = [];
			//load contact temp
			SP_SELECT_ALL_C_CONTACT_TEMP.data.map((ele)=>{
				PageConfigs.showCompanyContact.push(ele);
			})
			console.log("init temp")
		}else if(appsmith.store[ PageConfigs.editCompanyFlag] !== undefined && appsmith.store[ PageConfigs.editCompanyFlag].COMPANY_ID != undefined){
			//LM
			SP_SELECT_FOR_COMPANY_BY_ID.run().then(async ()=>{
				let data = SP_SELECT_FOR_COMPANY_BY_ID.data[0];
				await setAttribute(data);
				await DELETE_CONTACT_TEMP.run();
				await SP_SELECT_FOR_CONTACT_BY_COMID.run();
				//load contact LM
				if(SP_SELECT_FOR_CONTACT_BY_COMID.data != undefined)
				{
					PageConfigs.showCompanyContact = [];
					await Promise.all( SP_SELECT_FOR_CONTACT_BY_COMID.data.map((ele)=>{
						PageConfigs.showCompanyContact.push(ele);
					}));
				}
				//SP_SELECT_ALL_C_CONTACT_TEMP.run();
			})
			console.log("init LM")
		}else{
			//New
			await DELETE_CONTACT_TEMP.run();
			await SELECT_PROVINCEs.run();
		}
		
		
		await CONTAINER_COMPANY_INFORMATION.setVisibility(true);
		await CONTAINER_DETAIL.setVisibility(true);
		
	},
	test:()=>{return DefaultCompany}
}