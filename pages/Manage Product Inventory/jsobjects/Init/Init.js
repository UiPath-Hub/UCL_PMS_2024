export default {
	LoadDefaultProductCatalog:()=>{
		//removeValue("defaultProductCatalog");
		if(appsmith.store.EditInventory!==undefined){
			SP_SELECTPRODUCTCATALOG.run(appsmith.store.EditInventory).then(()=>{
				if( SP_SELECTPRODUCTCATALOG.data.length>0){
					Object.keys(SelectedProduct).forEach((key)=>{
						if(SP_SELECTPRODUCTCATALOG.data[0][key] !== null)
						SelectedProduct[key.toString()].data = SP_SELECTPRODUCTCATALOG.data[0][key];
						console.log(SelectedProduct[key.toString()].data)
					});
					//storeValue("defaultProductCatalog",SP_SELECTPRODUCTCATALOG.data[0]);
					JS.setPageType(SP_SELECTPRODUCTCATALOG.data[0].PRODUCT_TYPE_TH+SP_SELECTPRODUCTCATALOG.data[0].PRODUCT_TYPE_EN);
				}
			});	
		}
		
	},
	LoadDefaultProductInventory: () => {
		Object.keys(DefaultInventory).forEach((key) => {
			if (DefaultInventory[key] !== undefined) {
				if (SP_SELECTPRODUCTINVENTORY.data.length > 0 && SP_SELECTPRODUCTINVENTORY.data[0][key] !== null) {
					DefaultInventory[key].data = SP_SELECTPRODUCTINVENTORY.data[0][key];
				}
			}
		});
	},
	test:()=>{return moment("").format()}
}