export default {
	setPageType:(PRODUCT_TYPE)=>{
		PRODUCT_TYPE = PRODUCT_TYPE!==undefined?PRODUCT_TYPE:Table_Catalog_Results2.selectedRow.PRODUCT_TYPE;
		let identifyText = PRODUCT_TYPE;
		if(identifyText !== undefined && identifyText !== ""){
			if( identifyText.includes("Space")) storeValue("PageType", PageTypes.Space);
			if( identifyText.includes("Meter")) storeValue("PageType", PageTypes.Meter);
			
		}
	},
	setProductCatalog:()=>{
		PRODUCT_NAME.setValue(Table_Catalog_Results2.selectedRow.PRODUCT_NAME);
		PRODUCT_TYPE.setValue(Table_Catalog_Results2.selectedRow.PRODUCT_TYPE)
	},
	isROFRRequired:()=>{
		if(appsmith.store["PageType"]=== PageTypes.Space){
			if(ROFR_STATUS.isChecked){
				if(ROFR_FRONT.text.toString()+ ROFR_BACK.text.toString()+ ROFR_RIGHT.text.toString()+ ROFR_LEFT.text.toString() === "") return true;
			}
		}
		return false;
	},
	selectedProductButtonClick:()=>{
		SP_SELECTPRODUCTCATALOG.run().then(() => {
			Object.keys(SelectedProduct).forEach((key)=>{
				if(SP_SELECTPRODUCTCATALOG.data[0][key] !== null)
						SelectedProduct[key].data = SP_SELECTPRODUCTCATALOG.data[0][key];
			});
  		closeModal(Modal_SelectProduct.name);
  		this.setPageType();
		});
	},
	confirmButtonClick:()=>{
		const finallyDone = ()=>{
			removeValue("EditInventory");
			navigateTo('Product Inventory Dashboard', {}, 'SAME_WINDOW');
		}
		if(appsmith.store.EditInventory===undefined){
			//add
			SP_HANDLE_INSERT_INVENTORY.run().then(() => {
  			if(SP_HANDLE_INSERT_INVENTORY.data !== undefined && SP_HANDLE_INSERT_INVENTORY.data.length === 1){
				if( SP_HANDLE_INSERT_INVENTORY.data[0].RESULT_CODE === "ERROR"){
					showAlert( SP_HANDLE_INSERT_INVENTORY.data[0].RESULT_MESSAGES,"error");
					SP_SELECTPRODUCTCATALOG.run();
				}
				}else finallyDone();
			});
		}else{
			//edit
			SP_UPDATE_PRODUCT_INVENTORY.run().then(()=>{
				if(SP_UPDATE_PRODUCT_INVENTORY.data !== undefined && SP_UPDATE_PRODUCT_INVENTORY.data.length === 1){
				if( SP_UPDATE_PRODUCT_INVENTORY.data[0].RESULT_CODE === "ERROR"){
					showAlert( SP_UPDATE_PRODUCT_INVENTORY.data[0].RESULT_MESSAGES,"error");
					SP_SELECTPRODUCTCATALOG.run();
				}
				}else finallyDone();
			});
		}
		
	},
	test:()=>{
		console.log(DefaultInventory.INVENTORY_ID.data)
	}
}