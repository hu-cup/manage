import Server from "../utils/request"

export function getSupplierList(pagenum, pagesize) {
    return Server({
        url: `/supplier/list/search/${pagenum}/${pagesize}`,
        method: "POST",
    })
}
export function edit(id) {
    return Server({
        url: `supplier/${id}`,
        method: 'GET',
    })
}
export function update(id,from) {
    return Server({
        url: `supplier/${id}`,
        method: 'PUT',
        data:{
            from
        }
    })
}