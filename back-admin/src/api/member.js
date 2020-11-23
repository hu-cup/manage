//引入Server.is
import Server from '../utils/request'
export default {
    //查询会员数据接口
    clq_getMember(page, pageSize, form) {
        return Server({
            url: `/member/list/search/${page}/${pageSize}`,
            method: "POST",
            data: form
        })
    },
    //删除会员数据接口
    clq_removeMember(id) {
        return Server({
            url: `/member/${id}`,
            method: 'DELETE'
        })
    },

    //增加会员数据接口
    clq_addMember(form) {
        return Server({
            url: "/member",
            method: 'POST',
            data: form
        })
    },

    //修改会员数据接口
    clq_updateMember(id, form) {
        return Server({
            url: `/member/${id}`,
            method: "PUT",
            data: form
        })
    },

    //查询单条数据接口
    clq_findMember(id) {
        return Server({
            url: `/member/${id}`,
            method: 'GET'
        })
    },
}