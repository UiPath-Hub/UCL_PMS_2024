export default {
	submitData:async ()=>{
		if(appsmith.store["EditCatalog"]=== undefined)return await SP_INSERT_PMS_PRODUCT_CATALOG.run().then(()=>{ 
			if(SP_INSERT_PMS_PRODUCT_CATALOG.data !== undefined && SP_INSERT_PMS_PRODUCT_CATALOG.data.length !== 0){
				if(SP_INSERT_PMS_PRODUCT_CATALOG.data[0].RESULT_CODE === "DONE") navigateTo('Product Catalog Dashboard', {}, 'SAME_WINDOW');
				else showAlert(SP_INSERT_PMS_PRODUCT_CATALOG.data[0].RESULT_MESSAGES ,"error")
			}
			
		});
		else return await SP_UPDATE_PMS_PRODUCT_CATALOG.run().then(()=>{
			if(SP_UPDATE_PMS_PRODUCT_CATALOG.data !== undefined && SP_INSERT_PMS_PRODUCT_CATALOG.data.length !== 0){
				if(SP_UPDATE_PMS_PRODUCT_CATALOG.data[0].RESULT_CODE === "DONE") navigateTo('Product Catalog Dashboard', {}, 'SAME_WINDOW');
				else showAlert(SP_UPDATE_PMS_PRODUCT_CATALOG.data[0].RESULT_MESSAGES ,"error")
			}
		});
	},
	deleteData:()=>{
		SP_DELETE.run().then(()=>{
			if(SP_DELETE.data !== undefined && SP_DELETE.data.length !== 0){
				if(SP_DELETE.data[0].RESULT_CODE === "DONE") navigateTo('Product Catalog Dashboard', {}, 'SAME_WINDOW');
				else showAlert(SP_DELETE.data[0].RESULT_MESSAGES ,"error")
			}
		})
	}
}