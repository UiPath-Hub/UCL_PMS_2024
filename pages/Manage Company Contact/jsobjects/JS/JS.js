export default {
	set_POSTAL_CODE:()=>{
	SELECT_POSTAL_CODE.run().then(()=>{
			if(SELECT_POSTAL_CODE.data !== undefined && SELECT_POSTAL_CODE.data.length !== 0)
			COMPANY_CONTACT_POSTAL_CODE.setValue(SELECT_POSTAL_CODE.data[0].POSTAL_CODE);
	})
	},
	saveBttn_click:()=>{

		if(appsmith.store[PageConfigs.editFlag] === undefined)		{
			if(appsmith.store[PageConfigs.fromCompany].COMPANY_ID == undefined || _.trim( appsmith.store[PageConfigs.fromCompany].COMPANY_ID) === ""){
				//insert temp
				SP_INSERT_PMS_CC_TEMP.run().then(()=>{
				if( SP_INSERT_PMS_CC_TEMP.data !== undefined && SP_INSERT_PMS_CC_TEMP.data.length > 0){
					if(SP_INSERT_PMS_CC_TEMP.data[0]["RESULT_CODE"] === 'DONE'){
						showAlert("Save succeeded.","success");
						showModal(MODAL_ADD_NEXT.name);
					}
					else{
						showAlert("Save failed."+SP_INSERT_PMS_CC_TEMP.data[0]["RESULT_MESSAGES"],"error");
					}
				}
			})
			}else{
				//insert LM
				SP_INSERT_PMS_CC_LM.run().then(()=>{
				if( SP_INSERT_PMS_CC_LM.data !== undefined && SP_INSERT_PMS_CC_LM.data.length > 0){
					if(SP_INSERT_PMS_CC_LM.data[0]["RESULT_CODE"] === 'DONE'){
						showAlert("Save succeeded.","success");
						showModal(MODAL_ADD_NEXT.name);
					}
					else{
						showAlert("Save failed."+SP_INSERT_PMS_CC_LM.data[0]["RESULT_MESSAGES"],"error");
					}
				}
			})
			}
			
		}else{
			if(appsmith.store[PageConfigs.fromCompany].COMPANY_ID == undefined || _.trim( appsmith.store[PageConfigs.fromCompany].COMPANY_ID) === ""){
				//edit temp
			SP_UPDATE_PMS_CC_TEMP.run().then(()=>{
				if( SP_UPDATE_PMS_CC_TEMP.data !== undefined && SP_UPDATE_PMS_CC_TEMP.data.length > 0){
					if(SP_UPDATE_PMS_CC_TEMP.data[0]["RESULT_CODE"] === 'DONE'){
						showAlert("Save succeeded.","success");
						showModal(MODAL_ADD_NEXT.name);
					}
					else{
						showAlert("Save failed."+SP_UPDATE_PMS_CC_TEMP.data[0]["RESULT_MESSAGES"],"error");
					}
				}
			})
			}else{
				//edit LM
				SP_UPDATE_PMS_CC_LM
				SP_UPDATE_PMS_CC_LM.run().then(()=>{
				if( SP_UPDATE_PMS_CC_LM.data !== undefined && SP_UPDATE_PMS_CC_LM.data.length > 0){
					if(SP_UPDATE_PMS_CC_LM.data[0]["RESULT_CODE"] === 'DONE'){
						showAlert("Save succeeded.","success");
						showModal(MODAL_ADD_NEXT.name);
					}
					else{
						showAlert("Save failed."+SP_UPDATE_PMS_CC_LM.data[0]["RESULT_MESSAGES"],"error");
					}
				}
				})
			}
			
		}
	},
	onDeleteCompanyContact:()=>{
		if(SP_SELECT_FOR_CONTACT.data.length == undefined || SP_SELECT_FOR_CONTACT.data[0].COMPANY_ID == undefined){
		//temp
			SP_DELETE_CONTACT_TEMP.run({COMPANY_CONTACT_ID:appsmith.store[ PageConfigs.editFlag].COMPANY_CONTACT_ID}).then(async()=>{
				if( SP_DELETE_CONTACT_TEMP.data !== undefined && SP_DELETE_CONTACT_TEMP.data.length > 0){
						if(SP_DELETE_CONTACT_TEMP.data[0]["RESULT_CODE"] === 'DONE'){
							await showAlert("Delete succeeded.","success");
							await closeModal(MODAL_DELETE.name);
							navigateTo('Manage Company', {}, 'SAME_WINDOW');
						}
						else{
							showAlert("Delete failed."+SP_DELETE_CONTACT_TEMP.data[0]["RESULT_MESSAGES"],"error");
						}
					}
			})
		}else{
			//LM
			SP_DELETE_CONTACT_LM.run().then(async ()=>{
				if( SP_DELETE_CONTACT_LM.data !== undefined && SP_DELETE_CONTACT_LM.data.length > 0){
						if(SP_DELETE_CONTACT_LM.data[0]["RESULT_CODE"] === 'DONE'){
							await showAlert("Delete succeeded.","success");
							await closeModal(MODAL_DELETE.name);
							navigateTo('Manage Company', {}, 'SAME_WINDOW');
						}
						else{
							showAlert("Delete failed."+SP_DELETE_CONTACT_LM.data[0]["RESULT_MESSAGES"],"error");
						}
					}
			})
		}
	},
	onDeleteButtonClick:()=>{
		let comID =  SP_SELECT_FOR_CONTACT.data[0]==undefined?undefined: SP_SELECT_FOR_CONTACT.data[0].COMPANY_ID;
		if(comID != undefined && appsmith.store[PageConfigs.editFlag]["TOTAL_RECORDS"]=== 1){
			showAlert("A company must have at least one contact.","warning");
		}else{
			showModal(MODAL_DELETE.name);
		}
	}
	,
	onButtonAddNoClick:()=>{
		closeModal(MODAL_ADD_NEXT.name).then( async() => {
			await removeValue(PageConfigs.editFlag);
			await removeValue(PageConfigs.fromCompany);
			navigateTo('Manage Company', {}, 'SAME_WINDOW');
  	});
	},
	isArrayUndefinedOrEmpty:(array)=>{
		if(array != undefined && array.length !== 0){
			return false;
		}else{
			return true;
		}
	}
}