import Server from "../utils/request"

export function getMemberList(pagenum,pagesize){
    return Server({
         url : `/member/list/search/${pagenum}/${pagesize}`,
        method : "POST",
    })
}