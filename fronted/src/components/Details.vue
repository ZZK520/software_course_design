<template>
  <el-main>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"
        ><el-tag type="success">时间(查询到选中时间以前所有)</el-tag></el-col
      >
      <el-col :span="6">
        <el-date-picker v-model="load.Time" type="month" placeholder="选择月">
        </el-date-picker>
      </el-col>
      <el-col :span="6"
        ><el-button @click="findTotal">点我查询最后工资</el-button></el-col
      >
    </el-row>
    <el-table :data="totalTableData" style="width: 100%">
      <el-table-column prop="fine" label="罚款" width="180"> </el-table-column>
      <el-table-column prop="reward" label="奖金" width="180">
      </el-table-column>
      <el-table-column prop="basic" label="基本工资"> </el-table-column>
      <el-table-column prop="final" label="最终工资"> </el-table-column>
    </el-table>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12"><el-tag type="danger">基本工资表</el-tag></el-col>
    </el-row>
    <el-table :data="basic_tableData" style="width: 100%">
      <el-table-column prop="Employee.ID" label="员工编号" width="180">
      </el-table-column>
      <el-table-column prop="Amount" label="金额" width="180">
      </el-table-column>
      <el-table-column prop="Time" label="时间"> </el-table-column>
      <el-table-column prop="Employee.Name" label="姓名"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleCheckDetail_fine(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12"><el-tag type="success">奖励表</el-tag></el-col>
    </el-row>
    <el-table :data="reward_tableData" style="width: 100%">
      <el-table-column prop="Employee.ID" label="员工编号" width="180">
      </el-table-column>
      <el-table-column prop="Amount" label="金额" width="180">
      </el-table-column>
      <el-table-column prop="Time" label="时间"> </el-table-column>
      <el-table-column prop="Employee.Name" label="姓名"> </el-table-column>
      <el-table-column prop="Description" label="原因"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleCheckDetail_reward(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12"><el-tag type="danger">惩罚表</el-tag></el-col>
    </el-row>
    <el-table :data="fine_tableData" style="width: 100%">
      <el-table-column prop="Employee.ID" label="员工编号" width="180">
      </el-table-column>
      <el-table-column prop="Amount" label="金额" width="180">
      </el-table-column>
      <el-table-column prop="Time" label="时间"> </el-table-column>
      <el-table-column prop="Employee.Name" label="姓名"> </el-table-column>
      <el-table-column prop="Description" label="原因"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleCheckDetail_fine(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import FineDataService from "../services/FineDataService";
import RewardDataService from "../services/RewardDataService";
import BasicDataService from "../services/BasicDataService";
import { Message } from "element-ui";
import dayjs from "dayjs";

export default {
  name: "my_details",
  data() {
    return {
      load: {
        EmployeeID: "",
        Time: null,
      },

      reward_load: {
        Amount: 0,
        Description: "",
        Time: null,
        EmployeeID: "",
      },
      fine_load: {
        Amount: 0,
        Description: "",
        Time: null,
        EmployeeID: "",
      },
      basic_load: {
        Amount: 0,
        Time: null,
        EmployeeID: "",
      },
      reward_tableData: [],
      fine_tableData: [],
      basic_tableData: [],
      totalTableData: [{ fine: 0, reward: 0, basic: 0, final: 0 }],
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    async findTotal() {
      let valid = this.checkValid();
      console.log("valid", valid);
      if (valid == false) {
        Message.warning({ message: "请选择时间" });
        return;
      }
      await this.findReward();
      await this.findFine();
      await this.findBasic();
      // this.calcFinal();
    },
    // calcFinal() {
    //   let data = this.totalTableData[0];
    //   console.log(data[0]);
    //   console.log(data[1]);
    //   console.log(data[2]);
    //   this.totalTableData[0].final = -1 * data[0] + data[1] + data[2];
    // },
    findBasic() {
      let load = {};
      let Time = dayjs(this.load.Time).format("MM/YYYY");
      let EmployeeID = this.load.EmployeeID;
      load.Time = Time;
      load.EmployeeID = EmployeeID;
      load.tag = "exact"; //设置精准匹配月份，而不是匹配范围
      console.log("load", load);

      BasicDataService.getAll(load)
        .then((response) => {
          console.log("response", response);
          // this.tableData=response.data.data;
          response.data.data.forEach((item) => {
            this.totalTableData[0].basic += item.Amount;
            this.totalTableData[0].final += item.Amount;

          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    findFine() {
      let load = {};
      let Time = dayjs(this.load.Time).format("MM/YYYY");
      let EmployeeID = this.load.EmployeeID;
      load.Time = Time;
      load.EmployeeID = EmployeeID;
      load.tag = "exact"; //设置精准匹配月份，而不是匹配范围
      console.log("load", load);

      FineDataService.getAll(load)
        .then((response) => {
          console.log("response", response);
          // this.tableData=response.data.data;
          response.data.data.forEach((item) => {
            this.totalTableData[0].fine += item.Amount;
            this.totalTableData[0].final -= item.Amount;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    findReward() {
      let load = {};
      let Time = dayjs(this.load.Time).format("MM/YYYY");
      let EmployeeID = this.load.EmployeeID;
      load.Time = Time;
      load.EmployeeID = EmployeeID;
      load.tag = "exact"; //设置精准匹配月份，而不是匹配范围
      console.log("load", load);

      RewardDataService.getAll(load)
        .then((response) => {
          console.log("response", response);
          // this.tableData=response.data.data;
          response.data.data.forEach((item) => {
            this.totalTableData[0].reward += item.Amount;
            this.totalTableData[0].final += item.Amount;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
    retrieveReward() {
      console.log(this.reward_load);
      RewardDataService.getAll(this.reward_load)
        .then((response) => {
          console.log("response", response);

          this.reward_tableData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveFine() {
      console.log(this.fine_load);
      FineDataService.getAll(this.fine_load)
        .then((response) => {
          console.log("response", response);
          this.fine_tableData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveBasic() {
      BasicDataService.getAll(this.basic_load)
        .then((response) => {
          console.log("basic response", response);
          this.basic_tableData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleCheckDetail_reward(index, row) {
      console.log(index, row);
      // console.log("row", row);
      this.$router.push({ path: "/editReward", query: row });
    },
    handleCheckDetail_fine(index, row) {
      console.log(index, row);
      // console.log("row", row);
      this.$router.push({ path: "/editFine", query: row });
    },
    handleCheckDetail_basic(index, row) {
      console.log(index, row);
      // console.log("row", row);
      this.$router.push({ path: "/editBasic", query: row });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
  },
  async mounted() {
    this.reward_load.EmployeeID = this.$route.query.userid;
    this.fine_load.EmployeeID = this.$route.query.userid;
    this.basic_load.EmployeeID = this.$route.query.userid;
    this.load.EmployeeID = this.$route.query.userid;
    this.retrieveReward();
    this.retrieveFine();
    this.retrieveBasic();
  },
};
</script>