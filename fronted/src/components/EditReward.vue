<template>
  <el-main>
    <el-row type="flex" class="row-bg" justify="end">
      <!-- <el-col :span="6">
        <el-tag type="danger">罚款表</el-tag>
      </el-col> -->
      <el-col :span="12">
        <el-tag type="success">奖励表</el-tag>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <!-- <el-col :span="6">
        <el-tag type="danger">员工号</el-tag>

        <el-input
          v-model="load.Employee.ID"
          placeholder="请输入内容"
          :disabled="true"
        ></el-input>
      </el-col> -->
      <el-col :span="6">
        <el-tag type="success">员工号</el-tag>

        <el-input
          v-model="load.Employee.ID"
          placeholder="请输入内容"
          :disabled="true"
        ></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <!-- <el-col :span="6">
        <el-tag type="danger">罚款时间</el-tag>

        <el-input
          v-model="load.Time"
          placeholder="请输入内容"
          :disabled="true"
        ></el-input>
      </el-col> -->
      <el-col :span="6">
        <el-tag type="success">奖励时间</el-tag>
        <el-input
          v-model="load.Time"
          placeholder="请输入内容"
          :disabled="true"
        ></el-input
      ></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <!-- <el-col :span="6">
        <el-tag type="danger">罚款金额</el-tag>

        <el-input
          v-model="load.Amount"
          placeholder="请输入内容"
          type="number"
        ></el-input
      ></el-col> -->
      <el-col :span="6">
        <el-tag type="success" >奖励金额</el-tag>

        <el-input :disabled="!isAdmin"
          v-model="load.Amount"
          placeholder="请输入内容"
          type="number"
        ></el-input
      ></el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <!-- <el-col :span="6">
        <el-tag type="danger">罚款原因</el-tag>
      </el-col> -->
      <el-col :span="6">
        <el-tag type="success">奖励原因</el-tag>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <!-- <el-col :span="6">
        <el-select v-model="fine_load.Description" placeholder="请选择">
          <el-option
            v-for="item in fine_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col> -->
      <el-col :span="6">
        <el-select v-model="load.Description" placeholder="请选择" :disabled="!isAdmin">
          <el-option
            v-for="item in reward_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center" v-if="isAdmin">
      <!-- <el-col :span="6"
        ><el-button @click="editFine" type="danger"
          >点我修改罚款</el-button
        ></el-col
      > -->
      <el-col :span="6"
        ><el-button @click="editReward" type="success"
          >点我修改奖励</el-button
        ></el-col
      >
      <el-col :span="6"
        ><el-button @click="deleteReward" type="warning"
          >点我删除奖励</el-button
        ></el-col
      >
    </el-row>
  </el-main>
</template>

<script>
import RewardDataService from "../services/RewardDataService";
import { Message } from "element-ui";

export default {
  name: "edit-reward",
  data() {
    return {
      load: {},
      reward_options: [
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
    isAdmin() {
      if (!this.$store.state.auth.user) {
        return false;
      }
      return (
        this.$store.state.auth.user.ID == "1800303107" ||
        this.$store.state.auth.user.IsAccountant == true
      );
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
    editReward() {
      let res = this.checkValid();
      if (res == false) {
        return;
      }
      console.log(this.load);
      let id = this.load.id;

      const my_package = {};
      my_package.Amount = this.load.Amount;
      my_package.Description = this.load.Description;
      RewardDataService.update(id, my_package).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          Message.success({
            message: "成功修改！",
          });
        }
        console.log(res);
      });
    },
    deleteReward() {
      let res = this.checkValid();
      if (res == false) {
        return;
      }
      console.log(this.load);
      let id = this.load.id;

      const my_package = {};
      my_package.Amount = this.load.Amount;
      my_package.Description = this.load.Description;
      RewardDataService.delete(id).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          Message.success({
            message: "成功修改！",
          });
          this.$router.go(-1);
        }
        console.log(res);
      });
    },
  },
  created() {
    this.load = this.$route.query;
    console.log(this.load);
  },
};
</script>