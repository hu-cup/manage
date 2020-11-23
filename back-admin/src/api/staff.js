import Server from "../utils/request"

export function getStaffList(pageNum, pageSize) {
    return Server({
        url: `/staff/list/search/${pageNum}/${pageSize}`,
        method: "POST",
        data: {

        }
    })
}
export function edit(id) {
    return Server({
        url: `/staff/${id}`,
        method: "GET"
    })
}

export function save(id, username, name, age, mobile, salary, entryDate) {
    return Server({
        url: `/staff/10`,
        method: "PUT",
        data: {
            id,
            username,
            name,
            age,
            mobile,
            salary,
            entryDate
        }
    })
}

export function del(id) {
    return Server({
        url: `/staff/${id}`,
        method: "DELETE"
    })
}

export function add(id, username, name, age, mobile, salary, entryDate) {
    return Server({
        url: `/staff`,
        method: "POST",
        data: {
            id,
            username,
            name,
            age,
            mobile,
            salary,
            entryDate
        }
    })
}

