<template>
  <el-main>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="12">
        <el-tag type="danger">罚款表</el-tag>
      </el-col>
      <!-- <el-col :span="6" :offset="6">
        <el-tag type="success">奖励表</el-tag>
      </el-col> -->
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="danger">员工号</el-tag>

        <el-input
          v-model="load.Employee.ID"
          placeholder="请输入内容"
          :disabled="true"
        ></el-input>
      </el-col>
      <!-- <el-col :span="6" :offset="6">
        <el-tag type="success">员工号</el-tag>

        <el-input
          v-model="load.Employee.ID"
          placeholder="请输入内容"
          :disabled="true"
        ></el-input>
      </el-col> -->
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="danger">罚款时间</el-tag>

        <el-input
          v-model="load.Time"
          placeholder="请输入内容"
          :disabled="true"
        ></el-input>
      </el-col>
      <!-- <el-col :span="6" :offset="6">
        <el-tag type="success">奖励时间</el-tag>
        <el-input
          v-model="load.Time"
          placeholder="请输入内容"
          :disabled="true"
        ></el-input
      ></el-col> -->
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
      <!-- <el-col :span="6" :offset="6">
        <el-tag type="success">奖励金额</el-tag>

        <el-input
          v-model="load.Amount"
          placeholder="请输入内容"
          type="number"
        ></el-input
      ></el-col> -->
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="danger">罚款原因</el-tag>
      </el-col>
      <!-- <el-col :span="6" :offset="6">
        <el-tag type="success">奖励原因</el-tag>
      </el-col> -->
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-select v-model="load.Description" placeholder="请选择">
          <el-option
            v-for="item in fine_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="6" :offset="6">
        <el-select v-model="reward_load.Description" placeholder="请选择">
          <el-option
            v-for="item in reward_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col> -->
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"
        ><el-button @click="editFine" type="danger"
          >点我修改罚款</el-button
        ></el-col
      >
      <!-- <el-col :span="6" :offset="6"
        ><el-button @click="addReward" type="success"
          >点我修改奖励</el-button
        ></el-col
      > -->
    </el-row>
  </el-main>
</template>

<script>
import FineDataService from "../services/FineDataService";
import {Message} from 'element-ui'

export default {
  name: "edit_details",
  data() {
    return {
      load: {},
      fine_options: [
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
      for (const [key,value] of Object.entries(this.load)) {
        console.log(`${key}: ${value}`);
        if (!value) {
          return false;
        }
      }
      return true;
    },
    editFine() {
      let res = this.checkValid();
      if (res == false) {
        return;
      }
      console.log("editFine", this.load);
      let id = this.load.id;
      const my_package = {};
      my_package.Amount = this.load.Amount;
      my_package.Description = this.load.Description;
      FineDataService.update(id, my_package).then((res) => {
          console.log(res);
          if(res.data.status==200){
              Message.success({
                  message:"成功修改！"
              })
          }
        console.log(res);
      });
    },
  },
  created() {
    this.load = this.$route.query;
    console.log("fine", this.load);
  },
};
</script>