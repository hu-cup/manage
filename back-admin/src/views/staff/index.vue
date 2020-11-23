<template>
  <div>
    <!-- 表单部分 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="addShow = true">新增</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格部分  -->
    <el-table :data="list" border height="390" style="width: 100%">
      <el-table-column prop="id" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.row.id - 9 }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="190"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="190">
      </el-table-column>
      <el-table-column prop="salary" label="薪酬" width="190">
      </el-table-column>
      <el-table-column prop="entryDate" label="入职时间" width="190">
        <template slot-scope="scope">
          {{ scope.row.entryDate | filterTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-button size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器  -->
    <div style="margin: 16px">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 编辑弹框 -->
    <el-dialog title="员工编辑" :visible.sync="editShow" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input v-model="ruleForm.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-form-item prop="entryDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.entryDate"
              style="width: 60%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit(ruleForm.id)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 新增弹框 -->
    <el-dialog title="添加员工" :visible.sync="addShow" width="30%">
      <el-form
        :model="addItems"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="addItems.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addItems.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addItems.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addItems.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input v-model="addItems.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-form-item prop="entryDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="addItems.entryDate"
              style="width: 60%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStaffList } from "../../api/staff";
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
      formInline: {
        user: "",
        name: "",
      },
      pageNum: 1,
      pageSize: 10,
      list: [],
      allList: [],
      total: 0,
      editShow: false,
      addShow: false,
      //修改的数据
      ruleForm: {
        id: "",
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      //新增数据
      addItems: {
        id: "",
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      //表单校验
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //请求方法
    getList() {
      getStaffList(this.pageNum, this.pageSize)
        .then((res) => {
          console.log(res.data);
          this.total = res.data.total;
          this.list = res.data.rows;
          this.allList = Object.assign([], res.data.rows);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //条数切换
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    //页码切换
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    //编辑回填数据
    edit(val) {
      this.editShow = true;
      this.ruleForm = val;
    },
    //保存编辑
    saveEdit(val) {
      this.editShow = false;
      this.list.forEach((item) => {
        if (item.id == val.id) {
          item = val;
        }
      });
    },
    //删除
    remove(index) {
      this.$confirm("确认删除这条记录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //重置
    reset() {
      this.list = Object.assign([], this.allList);
      this.formInline.user = "";
      this.formInline.name = "";
    },
    //搜索
    search() {
      this.list = this.list.filter((item) => {
        return (
          item.username.includes(this.formInline.user) &&
          item.name.includes(this.formInline.name)
        );
      });
      console.log(this.list);
    },
    //新增
    saveAdd() {
      this.addItems.id = this.list[this.list.length - 1].id + 1;

      this.list.unshift(this.addItems);
      this.addShow = false;
      this.addItems = [];
    },
  },

  mounted() {
    //挂载完成，请求数据
    this.getList();
  },
  filters: {
    //时间过滤器
    filterTime(value) {
      var time = new Date(value);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      return `${year}-${month
        .toString()
        .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
    },
  },
};
</script> 
<style scoped>
</style>
