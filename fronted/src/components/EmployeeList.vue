<template>
  <div></div>
</template>
<script>
import EmployeeDataService from "../services/EmployeeDataService";

export default {
  name: "employee-list",
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
  },
};
</script>