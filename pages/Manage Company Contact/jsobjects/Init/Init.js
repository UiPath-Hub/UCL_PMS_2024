export default {
	pageLoad:async ()=>{
		if(appsmith.store[ PageConfigs.editFlag] !== undefined && appsmith.store[ PageConfigs.editFlag].COMPANY_CONTACT_ID != undefined){
			//Edit
			//if(appsmith.store[ PageConfigs.fromCompany] == undefined || appsmith.store[ PageConfigs.fromCompany].COMPANY_ID == undefined || _.trim(appsmith.store[ PageConfigs.fromCompany].COMPANY_ID) === ""){
				//LM not exist then got Temp instead
				await SP_SELECT_FOR_CONTACT.run({COMPANY_CONTACT_ID:appsmith.store[ PageConfigs.editFlag].COMPANY_CONTACT_ID}).then(async ()=>{
					let data = SP_SELECT_FOR_CONTACT.data[0];

					if(data != undefined){
						Object.keys(DefaultContact).map((attribute)=>{
							if(data[attribute] != undefined){
								DefaultContact[attribute].data = data[attribute];

							}
						})
						await SELECT_DISTRICTs.run();
						await SELECT_SUBDISTRICTs.run();
						await SELECT_POSTAL_CODE.run();
					}
				})
			//}else{
				
			//}
		}
		await resetWidget("Form",true);
		CONTAINER_CONTACT_DETAIL.setVisibility(true);
	},
	test:()=>{return moment(DefaultContact.CREATE_DATE.data).format("DD/MM/YYYY")}
}