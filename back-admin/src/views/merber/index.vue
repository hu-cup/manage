<template>
  <div class="clq-search-box">
    <!-- 顶部搜索按钮 -->
    <header class="">
      <el-form>
        <el-form-item>
          <el-input v-model="membernum" placeholder="会员卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="membername" placeholder="会员名称"></el-input>
        </el-form-item>
        <el-form-item style="width: 110px">
          <el-select v-model="fenl" placeholder="支付类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            style="width: 200px"
            v-model="times"
            type="date"
            placeholder="出生日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form>
    </header>
    <!-- 表格 -->
    <div class="clq-cent-box">
      <el-table :data="tableData" border style="width: 100%;height:500px;overflow:auto;">
        <el-table-column prop="date" label="序号" type="index" width="80">
        </el-table-column>
        <el-table-column prop="cardNum" label="会员卡号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="会员姓名" width="100">
        </el-table-column>
        <el-table-column prop="birthday" label="会员生日" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" width="120">
        </el-table-column>
        <el-table-column prop="integral" label="可用积分" width="120">
        </el-table-column>
        <el-table-column prop="money" label="开卡金额" width="120">
        </el-table-column>
        <el-table-column prop="payType" label="支付类型" width="120">
            <template slot-scope="scope">
              {{ scope.row.payType | payTypeFilter }}
            </template>
        </el-table-column>
        <el-table-column prop="address" label="会员地址" width="120">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <el-button size="small"> 编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 底部分页 -->
    <footer class="clq-footer-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </footer>
    <!-- 新增对话框 -->
  </div>
</template>
<script>
import {getMemberList} from "../../api/member"
  const payType = [
  {
    id: 1,
    type: "现金",
  },
  {
    id: 2,
    type: "微信",
  },
  {
    id: 3,
    type: "支付宝",
  },
  {
    id: 4,
    type: "银行卡",
  },
]
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
        pagesize:10,
        pagenum: 1,
      tableData: [
    
      ],
      membername: "",
      membernum: "",
      fenl: "",
      times: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
   filters: {
      payTypeFilter(num) {
        return payType.find((item) => item.id == num).type;
      },
    },
  // 组件方法
  methods: {
     getMemberData(){
        getMemberList(this.pagenum,this.pagesize).then(res=>{
        this.tableData = res.data.rows
        })
     },
    handleSizeChange(val) {
        this.pagesize=val
      this.getMemberData()

    },
    handleCurrentChange(val) {
        this.pagenum=val
      this.getMemberData()

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
      this.getMemberData()
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
<style scoped lang="scss">
header {
  .el-form {
    .el-form-item {
      width: 200px;
      float: left;
      margin-right: 10px;
    }
  }
}
</style>
