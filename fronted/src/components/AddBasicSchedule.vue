<template>
   <el-main>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-date-picker v-model="load.Time" type="month" placeholder="选择月">
        </el-date-picker
      ></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center"></el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-input
          v-model="load.Amount"
          placeholder="请输入内容"
          type="number"
        ></el-input
      ></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"
        ><el-button @click="test">点我添加基本工资</el-button></el-col
      >
    </el-row>
  </el-main>
</template>

<script>
import http from "../http-common";
export default {
  name: "add-basic-salary",
  data() {
    return {
      load: {
        Amount: 3500,
        Time: null,
      },
    };
  },
  methods: {
    test() {
      console.log(this.load);
      http.post(`/basicSchedule`, this.load).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>