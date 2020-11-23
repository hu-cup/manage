<template>
  <div>
    <!-- 头部 -->
    <div class="zl_top">
      <div class="zl_left">
        <div>
          <el-input v-model="name1" placeholder="供应商名称"></el-input>
        </div>
        <div><el-input v-model="name2" placeholder="联系人"></el-input></div>
        <div><el-input v-model="name3" placeholder="联系电话"></el-input></div>
        <div><el-button type="primary" @click="search">查询</el-button></div>
        <div><el-button type="primary" @click="onJoin">新增</el-button></div>
        <div><el-button @click="onClikvalue">重置</el-button></div>
      </div>
      <div class="zl_right"></div>
    </div>

    <!-- 内容 -->
    <div class="zl_table">
      <el-table border style="width: 100%" :data="list">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="供应商名称" width="250">
        </el-table-column>
        <el-table-column prop="linkman" label="联系人" width="150">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话" width="200">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="250">
        </el-table-column>
        <el-table-column prop="date" label="操作" width="140">
          <!-- 插槽 -->
          <template slot-scope="scope">
             <!-- 编辑 -->
    <el-dialog title="供应商编辑" :visible.sync="dialogEditVisible">
      <div class="box">
        <div>
          供应商名称:<el-input
            v-model="ruleForm.name"
            placeholder="供应商名称"
          ></el-input>
        </div>
        <div>
          联系人:<el-input
            v-model="ruleForm.linkman"
            placeholder="联系人"
          ></el-input>
        </div>
        <div>
          联系电话:<el-input
            v-model="ruleForm.mobile"
            placeholder="联系电话"
          ></el-input>
        </div>
        <div>
          备注:<el-input
            v-model="ruleForm.remark"
            placeholder="备注"
          ></el-input>
        </div>
        <div class="button">
          <el-button size="small" @click="dialogEditVisible = false"
            >取消</el-button
          >
          <el-button type="primary" size="small" @click="save(scope.row.id)">确认</el-button>
        </div>
      </div>
    </el-dialog>
            <div class="input">
              <el-button
                type="primary"
                @click="onClickDeit(scope.row.id)"
                size="small"
                >编辑</el-button
              >


              <el-button
                type="danger"
                @click="remove(scope.$index)"
                size="small"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
   
    <!-- 新增 -->
    <el-dialog title="供应商新增" :visible.sync="dialogEditVisible2">
      <div class="box">
        <div>供应商名称:<el-input placeholder="供应商名称"></el-input></div>
        <div>联系人:<el-input placeholder="联系人"></el-input></div>
        <div>联系电话:<el-input placeholder="联系电话"></el-input></div>
        <div>备注:<el-input placeholder="备注"></el-input></div>
        <div class="button">
          <el-button size="small">取消</el-button>
          <el-button type="primary" size="small">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="changesize"
      @current-change="changenum"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { createLogger } from "vuex";
import { getSupplierList, edit ,update} from "../../api/supplier";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      pagesize: 10,
      pagenum: 1,
      totle: 0,
      list: [],
      name1: "",
      name2: "",
      name3: "",
      dialogEditVisible: false,
      dialogEditVisible2: false,
      ruleForm: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async gitMemberData() {
      let res = await getSupplierList(this.pagenum, this.pagesize);
      console.log(res);
      this.list = res.data.rows;
      this.totle = res.data.total;
      // console.log(this.list);
    },
    // 清空
    onClikvalue() {
      this.name1 = "";
      this.name2 = "";
      this.name3 = "";
    },
    // 删除
    remove(index) {
      this.list.splice(index, 1);
    },

    // 搜索
    search() {
      this.list = this.list.filter((item) => {
        return (
          item.name.includes(this.name1) &&
          item.linkman.includes(this.name2) &&
          item.mobile.includes(this.name3)
        );
      });
      console.log(this.list);
    },
    //分页

    //条数
    changesize(val) {
      this.changesize = val;
      this.gitMemberData();
    },
    //页数
    changenum(val) {
      this.pagenum = val;
      this.gitMemberData();
    },
    // 编辑
    onClickDeit(val) {
      this.dialogEditVisible = true;
        edit(val).then(res=>{
          this.ruleForm = res.data
        })
    },
    save(id) {
         update(id,this.ruleForm).then(res=>{
           console.log(res)
           if(res.code ===  2000){
             this.$message.success('修改完成')
             this.dialogEditVisible = false
           }else{
             this.$message.error('修改失败')
           }
         })
    },
    // 新增
    onJoin() {
      this.dialogEditVisible2 = true;
    },
  },
  // 以下是生命周期钩子 注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {
    this.gitMemberData();
  },
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {},
};
</script> 
<style lang="scss" scoped>
.zl_top {
  width: 100%;
  height: 10vh;
  //   border: 1px solid rgb(156, 154, 154);
  display: flex;
  align-items: center;
  justify-content: space-around;
  .zl_left {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .zl_right {
    width: 20%;
  }
}
.zl_table {
  width: 100%;
  height: 65vh;
  overflow: scroll;
  // background: chartreuse;
  //   border: 1px solid #cccccc;
}
.box {
  height: 400px;

  display: flex;
  justify-items: center;
  align-items: center;
  flex-wrap: wrap;
  div {
    width: 100%;
  }
}
.input {
  display: flex;
}
.button {
  display: flex;
  justify-content: flex-end;
}
</style>
