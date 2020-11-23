import Server from "../utils/request"

export function checkPassword(id,oldPass){
    return Server({
         url : "/user/pwd",
        method : "POST",
        data : {
            userId : id,
            password : oldPass
        }
    })
}
export function updatePassword(id,newPass){
    return Server({
        url : "/user/pwd",
        method : "PUT",
        data : {
            userId : id,
            password : newPass
        }
    })
}