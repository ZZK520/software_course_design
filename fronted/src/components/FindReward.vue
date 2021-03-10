<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-tag type="success">员工号</el-tag>

        <el-input v-model="load.EmployeeID" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"
        ><div class="block">
          <el-tag type="success">时间(查询到选中时间以前所有)</el-tag>
          <el-date-picker v-model="load.Time" type="month" placeholder="选择月">
          </el-date-picker></div
      ></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"
        ><el-button @click="retrieveTutorials">点我查询奖金</el-button></el-col
      >
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Employee.ID" label="员工编号" width="180">
      </el-table-column>
      <el-table-column prop="Amount" label="金额" width="180">
      </el-table-column>
      <el-table-column prop="Time" label="时间"> </el-table-column>
      <el-table-column prop="Employee.Name" label="姓名"> </el-table-column>
      <el-table-column prop="Description" label="原因"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import RewardDataService from "../services/RewardDataService";

export default {
  name: "find-reward",
  data() {
    return {
      load: {
        EmployeeID: "",
        Time: null,
      },
      tableData: [],
    };
  },
  methods: {
    retrieveTutorials() {
      console.log(this.load);
      RewardDataService.getAll(this.load)
        .then((response) => {
          console.log("response", response);

          this.tableData=response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>