export default {
	submitData:async ()=>{
		if(appsmith.store["EditCatalog"]=== undefined)return await SP_INSERT_PMS_PRODUCT_CATALOG.run();
		else return await SP_UPDATE_PMS_PRODUCT_CATALOG.run();
	}
}