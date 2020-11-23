import Server from "../utils/request"

export function getStaffList() {
    return Server({
        url: "/staff/list/search/1/10",
        method: "POST",
        data: {
            
        }
    })
}
