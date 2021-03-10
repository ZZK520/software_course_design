<template>
  
  <div>
      <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="6"
      ><div class="block">
        <span class="demonstration">月</span>
        <el-date-picker v-model="load.Time" type="month" placeholder="选择月">
        </el-date-picker></div
    ></el-col>
  </el-row>
      <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"
        ><el-button @click="retrieveTutorials">点我查询奖金</el-button></el-col
      >
    </el-row>
      </div>
</template>
<script>
import RewardDataService from "../../services/RewardDataService";

export default {
  name: "find-reward",
    data() {
    return {
      load: {
        Time: null,
      },
    };
  },
  methods: {
    retrieveTutorials() {
      console.log(this.load);
       RewardDataService.getAll(this.load)
        .then(response => {
          console.log('response',response);
        })
        .catch(e => {
          console.log(e);
        });
    
    },
  },
};
</script>