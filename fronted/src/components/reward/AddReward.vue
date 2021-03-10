<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center"></el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-input
          v-model="load.Amount"
          placeholder="请输入内容"
          type="number"
        ></el-input
      ></el-col>
      <el-col :span="6"
        ><div class="block">
          <span class="demonstration">月</span>
          <el-date-picker v-model="load.Time" type="month" placeholder="选择月">
          </el-date-picker></div
      ></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="load.Description"
        >
        </el-input
      ></el-col>

      <el-col :span="6"
        ><el-button @click="test">点我添加奖金</el-button></el-col
      >
    </el-row>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "addReward",
  data() {
    return {
      load: {
        Amount: 50,
        Description: "拾金不昧",
        Time: null,
      },
    };
  },
  methods: {
    test() {
      console.log(this.load);
      http.post(`/rewardSchedule`, this.load).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>