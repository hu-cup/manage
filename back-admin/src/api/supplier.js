import Server from "../utils/request"

export function getSupplierList(pagenum,pagesize){
    return Server({
         url:`/supplier/list/search/${pagenum}/${pagesize}`,
        method : "POST",
    })
}