<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/addReward" class="nav-link" v-if="isAdmin"
            >Add Reward</router-link
          >
        </li>

        <li class="nav-item">
          <router-link to="/addFine" class="nav-link" v-if="isAdmin"
            >Add Fine</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/addBasicSchedule" class="nav-link" v-if="isAdmin"
            >Add BasicSchedule</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/employeeList" class="nav-link" v-if="isAdmin"
            >EmployeeList</router-link
          >
        </li>
      </div>
      <el-button @click="logout">登出</el-button>
    </nav>

    <router-view v-if="user" />
    <login v-if="!user"></login>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
export default {
  name: "app",
  components: {
    Login,
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
    logout() {
      this.$store.dispatch("auth/logout");
      //  this.$router.push('/login');
    },
  },
};
</script>
