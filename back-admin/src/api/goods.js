import request from "@/utils/request"
export function getGoods(){
    // 获取商品列表
    return request({
            url:'/goods/list/search/1/10',
            method:'POST',
      
    })
//    删除
export function lssDelete(id){
    return Server({
        url:`supplier/${id}`,
        method:'DELETE',
        data:{
            id
        }
    })
}
}