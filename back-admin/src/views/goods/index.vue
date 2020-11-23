<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
    <el-input placeholder="商品名称"></el-input>
    <el-input placeholder="商品编号"></el-input>
    <el-input placeholder="选择供应商"></el-input>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button type="primary" @click="newShop = true">新增</el-button>
     <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="id" label="商品编码"></el-table-column>
      <el-table-column prop="spec" label="商品规格"></el-table-column>
      <el-table-column prop="purchasePrice" label="零售价"></el-table-column>
      <el-table-column prop="retailPrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column label="操作">
            <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
  <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="编辑名称" prop="name">
    <el-input v-model="user.name"></el-input>
  </el-form-item>
    <el-form-item label="商品编码" prop="id">
    <el-input v-model="user.id"></el-input>
  </el-form-item>
   <el-form-item label="商品规格" prop="spec">
    <el-input v-model="user.spec"></el-input>
  </el-form-item>
   <el-form-item label="零售价" prop="purchasePrice">
    <el-input v-model="user.purchasePrice"></el-input>
  </el-form-item>
    <el-form-item label="进货价" prop="retailPrice">
    <el-input v-model="user.retailPrice"></el-input>
  </el-form-item>
    <el-form-item label="库存数量" prop="storageNum">
    <el-input v-model="user.storageNum"></el-input>
  </el-form-item>
    <el-form-item label="供应商" prop="supplierName">
    <el-input v-model="user.supplierName"></el-input>
  </el-form-item>
  
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="queding">确 定</el-button>
  </div>
</el-dialog>
<!-- 新增 -->
    <el-dialog title="新增商品" :visible.sync="newShop">
  <el-form :model="xz" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="编辑名称" prop="name">
    <el-input v-model="xz.name"></el-input>
  </el-form-item>
    <el-form-item label="商品编码" prop="id">
    <el-input v-model="xz.id"></el-input>
  </el-form-item>
   <el-form-item label="商品规格" prop="spec">
    <el-input v-model="xz.spec"></el-input>
  </el-form-item>
   <el-form-item label="零售价" prop="purchasePrice">
    <el-input v-model="xz.purchasePrice"></el-input>
  </el-form-item>
    <el-form-item label="进货价" prop="retailPrice">
    <el-input v-model="xz.retailPrice"></el-input>
  </el-form-item>
    <el-form-item label="库存数量" prop="storageNum">
    <el-input v-model="xz.storageNum"></el-input>
  </el-form-item>
    <el-form-item label="供应商" prop="supplierName">
    <el-input v-model="xz.supplierName"></el-input>
  </el-form-item>
  
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="newShop = false">取 消</el-button>
    <el-button type="primary" @click="addShoplis">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getGoods,lssDelete,lssAddShop } from "@/api/goods";
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
       tableData:[],
    //    编辑
       dialogFormVisible:false,
    //    新增
       xz:{},
       newShop:false,
       user:{

       },

    //    编辑
     rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
         purchasePrice: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],

        }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
      onSubmit(){},
    //   重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //  获取数据
    async getdata(){
       let datas = await getGoods();
      this.tableData = datas.data.rows;
      },
     
       // 删除
     async handleDelete(id){
         let res = await lssDelete(id);
         console.log(res);
         if(res.code == 2000){
             this.tableData.filter(item=>{
                 if(item.id===id){
                     this.tableData.splice(item,1)
                 }
             })
             this.$message.success("删除成功");
            //  this.tableData();
         }else{
             this.$message.error("删除失败");
         }
     },
    //  编辑
    handleEdit(row){
        this.dialogFormVisible=true;
        this.user = row
    },
    queding(){
         this.dialogFormVisible=false;
           this.tableData.filter(item=>{
        if (item===this.user){
          this.user=item
        }
      })
    },
    // 新增
    async addShoplis(){
        let response = await lssAddShop()
        console.log(response);
        
        if(response.flag){
            this.newShop = false;
            this.$message.success(response.message)
            this.getdata();
        }
        

    }
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
  this.getdata()
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
  destroyed() {}
};
</script> 
<style scoped>

.el-input{
    width: 200px;
    margin-left: 10px;
}

</style>
