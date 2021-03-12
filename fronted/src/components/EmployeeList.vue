<template>
  <el-table :data="filterTable" style="width: 100%">
    <el-table-column label="员工号" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ID }}</span>
      </template>
    </el-table-column>

    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.Name }}</p>
          <p>学历: {{ scope.row.Degree }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="职位" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.PositionTitle }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleCheckDetail(scope.$index, scope.row)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import EmployeeDataService from "../services/EmployeeDataService";
import RewardDataService from "../services/RewardDataService";

import dayjs from "dayjs";
export default {
  data() {
    return {
      load: {
        EmployeeID: "",
        Time: null,
      },

      tableData: [
        {
          // BasicSchedule: 3500,
          // Reward: 100,
          // Fine: 50,

          // ExpectedSalary: 0,

          Degree: "学士",
          ID: "1800303101",
          Time: dayjs("2019-01-25").format("MM/YYYY"),
          // can_show: false,
          Man: true,
          Name: "张三",
          PositionTitle: "后勤部长",
        },
      ],
    };
  },
  computed: {
    filterTable() {
      if (this.user.ID == "1800303107" ||this.user.IsAccountant==true) {
        return this.tableData;
      } else {
        return this.tableData.filter((item) => item.ID == this.user.ID);
      }
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    retrieveReward() {
      console.log(this.load);
      RewardDataService.getAll(this.load)
        .then((response) => {
          console.log("response", response);

          this.tableData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveEmployees() {
      EmployeeDataService.getAll()
        .then((response) => {
          console.log("response", response);
          const data = response.data.data;
          this.tableData = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleCheckDetail(index, row) {
      console.log(index, row);
      let id = row.ID;
      console.log("id", id);
      this.$router.push({ path: "/details", query: { userid: id } });
    },
  },
  async mounted() {
    await this.retrieveEmployees();
  },
};
</script>

