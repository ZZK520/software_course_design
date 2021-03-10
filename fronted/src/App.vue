<template>
  <div id="app">

     <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">bezKoder</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
         <li class="nav-item">
          <router-link to="/addReward" class="nav-link">Add Reward</router-link>
        </li>
         <li class="nav-item">
          <router-link to="/findReward" class="nav-link">Find Reward</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addFine" class="nav-link">Add Fine</router-link>
        </li>
          <li class="nav-item">
          <router-link to="/addBasicSchedule" class="nav-link">Add BasicSchedule</router-link>
        </li>
         <li class="nav-item">
          <router-link to="/employeeList" class="nav-link">EmployeeList</router-link>
        </li>
      </div>
    </nav>

    <router-view />
<login></login>
  </div>
</template>

<script>
import Login from './components/Login.vue';
export default {
  name: "app",
  components:{
    Login
  }
};
</script>
