import request from "@/utils/request"
export function getGoods(){
    // 获取商品列表
    return request({
            url:'/goods/list/search/1/10',
            method:'POST',
      
    })
}
//    删除
export function lssDelete(id){
    return request({
        url:`goods/${id}`,
        method:'DELETE',
        data:{
            id
        }
    })
}
// 新增
export function lssAddShop(){
   return request({
       url:"/goods",
       method:'POST',
       data:{
        code: "",
        id: "",
        name: "",
        purchasePrice: "",
        retailPrice: "",
        spec: "",
        storageNum: "",
        supplierId: "",
        supplierName: "",
       }
   })
}
