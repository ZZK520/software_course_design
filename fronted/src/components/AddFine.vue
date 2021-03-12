<template>
  <el-main>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="danger">员工号</el-tag>

        <el-input v-model="load.EmployeeID" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="danger">罚款时间</el-tag>

        <el-date-picker v-model="load.Time" type="month" placeholder="选择月">
        </el-date-picker
      ></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center"></el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="danger">罚款金额</el-tag>

        <el-input
          v-model="load.Amount"
          placeholder="请输入内容"
          type="number"
        ></el-input
      ></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="danger">罚款原因</el-tag>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-select v-model="load.Description" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"
        ><el-button @click="add" type="primary">点我添加罚款</el-button></el-col
      >
    </el-row>
  </el-main>
</template>

<script>
import dayjs from "dayjs";
import FineDataService from "../services/FineDataService";
import { Message } from "element-ui";

export default {
  name: "addReward",
  data() {
    return {
      load: {
        Amount: 10,
        Description: "",
        Time: null,
        EmployeeID: "1800303107",
      },
      options: [
        {
          value: "迟到",
          label: "迟到",
        },
        {
          value: "早退",
          label: "早退",
        },
        {
          value: "长时间做工作以外的事情",
          label: "长时间做工作以外的事情",
        },
      ],
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
      load.Amount = this.load.Amount;
      load.EmployeeID = this.load.EmployeeID;
      load.Time = dayjs(this.load.Time).format("MM/YYYY");
      load.Description = this.load.Description;
      console.log(load);

      FineDataService.create(load).then((res) => {
        if (res.data.status == 200) {
          Message.success({
            message: "成功录入！",
          });
        } else {
          Message.error({
            message: res.data.message,
          });
        }
      });
    },
  },
};
</script>