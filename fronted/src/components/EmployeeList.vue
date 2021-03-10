<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="员工号" width="180">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.ID }}</span>
      </template>
    </el-table-column>
      <el-table-column label="月份" width="180">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.Time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="基本工资" width="180">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.BasicSchedule }}</span>
      </template>
    </el-table-column>
    <el-table-column label="奖金" width="180">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.Reward }}</span>
      </template>
    </el-table-column>
    <el-table-column label="罚金" width="180">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.Fine }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.Name }}</p>
          <p>职位: {{ scope.row.PositionTitle }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="预计工资" width="180">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.ExpectedSalary }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import EmployeeDataService from "../services/EmployeeDataService";
import dayjs from "dayjs"
export default {
  data() {
    return {
      tableData: [
        {
          BasicSchedule: 3500,
          Reward: 100,
          Fine: 50,
          ExpectedSalary: 0,
          Degree: "学士",
          ID: "1800303101",
          Time:dayjs('2019-01-25').format('MM/YYYY') ,
          // IsAccountant: false,
          Man: true,
          Name: "张三",
          PositionTitle: "后勤部长",
        },
      ],
    };
  },
  methods: {
    retrieveEmployees() {
      EmployeeDataService.getAll()
        .then((response) => {
          console.log("response", response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  mounted() {
    this.retrieveEmployees();
  },
};
</script>

