export default {
	confirmButtonClick:()=>{

		if(appsmith.store[PageConfigs.editCompanyFlag]===undefined){
			//add
			const insertCompany =()=>{
				SP_INSERT_COMPANY.run().then(() => {
					if(SP_INSERT_COMPANY.data != undefined && SP_INSERT_COMPANY.data.length === 1){
							if(SP_INSERT_COMPANY.data[0]["RESULT_CODE"] === "DONE"){
								showAlert( "Save succeeded","succeed");
								showModal(MODAL_ADD_NEXT.name);
							}else{
								showAlert( "Save failed."+SP_INSERT_COMPANY.data[0]["RESULT_MESSAGES"],"error");
							}
					}
				});
			}
			
			SP_SELECT_ALL_C_CONTACT_TEMP.run().then(()=>{
				if(SP_SELECT_ALL_C_CONTACT_TEMP.data != undefined && SP_SELECT_ALL_C_CONTACT_TEMP.data.length > 0){
					insertCompany();
				}else{
					showAlert("Please add at least one contact before adding this company to the system.")
				}
			});
			
		}else{
			//edit
			SP_UPDATE_COMPANY.run().then(() => {
					if(SP_UPDATE_COMPANY.data != undefined && SP_UPDATE_COMPANY.data.length === 1){
							if(SP_UPDATE_COMPANY.data[0]["RESULT_CODE"] === "DONE"){
								showAlert( "Save succeeded","succeed");
								showModal(MODAL_ADD_NEXT.name);
							}else{
								showAlert( "Save failed."+SP_UPDATE_COMPANY.data[0]["RESULT_MESSAGES"],"error");
							}
					}
			});
		}
		
	},
	deleteButtonClick:()=>{
		const finallyDone = ()=>{
			removeValue("EditInventory");
			navigateTo('Product Inventory Dashboard', {}, 'SAME_WINDOW');
		}
		/*SP_DELETE.run().then(()=>{
			if(SP_DELETE.data !== undefined && SP_DELETE.data.length === 1){
				if( SP_DELETE.data[0].RESULT_CODE === "ERROR"){
					showAlert( SP_DELETE.data[0].RESULT_MESSAGES,"error");
					Init.LoadDefaultProductCatalog();
					Init.LoadDefaultProductInventory();
				}else finallyDone();
				}
		})*/
	},
	set_POSTAL_CODE:()=>{
	SELECT_POSTAL_CODE.run().then(()=>{
			if(SELECT_POSTAL_CODE.data !== undefined && SELECT_POSTAL_CODE.data.length !== 0)
			COMPANY_POSTAL_CODE.setValue(SELECT_POSTAL_CODE.data[0].POSTAL_CODE);
	})

},isArrayUndefinedOrEmpty:(array)=>{
		if(array != undefined && array.length !== 0){
			return false;
		}else{
			return true;
		}
	},
	keepChange:()=>{
		let companyTemp = {COMPANY_TYPE : COMPANY_TYPE.selectedOptionValue,
											 COMPANY_NAME_TH : COMPANY_NAME_TH.text,
											 COMPANY_NAME_EN : COMPANY_NAME_EN.text,
											 SHOP_NAME : SHOP_NAME.text ,
											 TELEPHONE : TELEPHONE.text,
											 STATUS : STATUS.selectedOptionValue ,
											 CONTACT_EMAIL : CONTACT_EMAIL.text,
											 COMPANY_BUSINESS_TYPE : COMPANY_BUSINESS_TYPE.selectedOptionValue ,
											 FAX : FAX.text,
											 TAX_ID : TAX_ID.text ,
											 WEBSITE : WEBSITE.text,
											 COMPANY_BUILDING_NAME_TH : COMPANY_BUILDING_NAME_TH.text,
											 COMPANY_BUILDING_NAME_EN : COMPANY_BUILDING_NAME_EN.text,
											 COMPANY_FLOOR : COMPANY_FLOOR.text,
											 COMPANY_ADD_NO : COMPANY_ADD_NO.text,
											 COMPANY_MOO : COMPANY_MOO.text,
											 COMPANY_SOI_TH : COMPANY_SOI_TH.text,
											 COMPANY_SOI_EN : COMPANY_SOI_EN.text,
											 COMPANY_ROAD_TH : COMPANY_ROAD_TH.text,
											 COMPANY_ROAD_EN : COMPANY_ROAD_EN.text,
											 COMPANY_SUB_DISTRICT : COMPANY_SUB_DISTRICT.selectedOptionValue,
											 COMPANY_DISTRICT : COMPANY_DISTRICT.selectedOptionValue,
											 COMPANY_PROVINCE : COMPANY_PROVINCE.selectedOptionValue,
											 COMPANY_POSTAL_CODE : COMPANY_POSTAL_CODE.text 
											}
		storeValue(PageConfigs.newCompanyTempFlag,companyTemp,true);
	},
	onNewContactClick:()=>{
		if(Form.hasChanges) return showAlert("Please save the company changes before managing contacts.","warning");
		
		removeValue(PageConfigs.editCompanyContactFlag).then(() => {
			navigateTo('Manage Company Contact', {}, 'SAME_WINDOW');
			storeValue(PageConfigs.fromCompany, {"COMPANY_NAME":`${COMPANY_NAME_TH.text}/${COMPANY_NAME_EN.text}`,"COMPANY_ID":COMPANY_ID.text});
			JS.keepChange();
		});
	},
	onEditContactClick:()=>{
		if(Form.hasChanges) return showAlert("Please save the company changes before managing contacts.","warning");
		
		storeValue(PageConfigs.editCompanyContactFlag, TABLE_CONTACT.tableData[TABLE_CONTACT.selectedRowIndex]).then(() => {
			navigateTo('Manage Company Contact', {}, 'SAME_WINDOW');
			storeValue(PageConfigs.fromCompany, {"COMPANY_NAME":`${COMPANY_NAME_TH.text}/${COMPANY_NAME_EN.text}`,"COMPANY_ID":COMPANY_ID.text});
			JS.keepChange();
		});
	}
	,
	test:()=>{
		return null == undefined
	}
}