import Server from "../utils/request"

export function getStaffList(pageNum, pageSize) {
    return Server({
        url: `/staff/list/search/${pageNum}/${pageSize}`,
        method: "POST",
        data: {

        }
    })
}
