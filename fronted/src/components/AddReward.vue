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
        <el-tag type="success">奖励时间</el-tag>

        <el-date-picker v-model="load.Time" type="month" placeholder="选择月">
        </el-date-picker
      ></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center"></el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="success">奖励金额</el-tag>

        <el-input
          v-model="load.Amount"
          placeholder="请输入内容"
          type="number"
        ></el-input
      ></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="success">奖励原因</el-tag>
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
        ><el-button @click="add" type="primary">点我添加奖励</el-button></el-col
      >
    </el-row>
  </el-main>
</template>

<script>
import dayjs from "dayjs";
import RewardDataService from "../services/RewardDataService";
import { Message } from "element-ui";

export default {
  name: "add-reward",
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
          value: "工作积极",
          label: "工作积极",
        },
        {
          value: "全勤",
          label: "全勤",
        },
        {
          value: "见义勇为",
          label: "见义勇为",
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

      RewardDataService.create(load).then((res) => {
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