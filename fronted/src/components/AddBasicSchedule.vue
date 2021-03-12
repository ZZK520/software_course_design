<template>
  <el-main>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="success">员工号</el-tag>

        <el-input v-model="load.EmployeeID" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="success">工资发放时间</el-tag>

        <el-date-picker v-model="load.Time" type="month" placeholder="选择月">
        </el-date-picker
      ></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center"></el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="success">工资发放金额</el-tag>

        <el-input
          v-model="load.Amount"
          placeholder="请输入内容"
          type="number"
        ></el-input
      ></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"
        ><el-button @click="add" type="primary">添加基本工资</el-button></el-col
      >
    </el-row>
  </el-main>
</template>

<script>
import BasicDataService from "../services/BasicDataService";
import { Message } from "element-ui";
import dayjs from 'dayjs';

export default {
  name: "add-basic",
  data() {
    return {
      load: {
        Amount: 8500,
        Time: null,
        EmployeeID: "1800303107",
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    // 验证输入是否合法
    checkValid() {
      for (const [key, value] of Object.entries(this.load)) {
        console.log(`${key}: ${value}`);
        if (!value) {
          return false;
        }
      }
      return true;
    },
    add() {
      let res = this.checkValid();
      if (res == false) {
        return;
      }
      let load = { Amount: 0, Time: null, EmployeeID: "" };
      load.Amount=this.load.Amount;
      load.EmployeeID=this.load.EmployeeID;
      load.Time=dayjs(this.load.Time).format("MM/YYYY");
      console.log(load);

      BasicDataService.create(load).then((res) => {
        if (res.data.status == 200) {
          Message.success({
            message: "成功录入！",
          });
        } else {
          Message.error({
            message: res.data.message,
          });
        }
        console.log(res);
      });
    },
  },
};
</script>