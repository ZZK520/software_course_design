import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: () => import("./components/Login")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial")
    },
    {
      path: "/addReward",
      name: "addReward",
      component: () => import("./components/AddReward")
    },
    {
      path: "/findReward",
      name: "findReward",
      component: () => import("./components/FindReward")
    },
    {
      path: "/addFine",
      name: "addFine",
      component: () => import("./components/AddFine")
    },
    {
      path: "/employeeList",
      name: "employeeList",
      component: () => import("./components/EmployeeList")
    },
    {
      path: "/addBasicSchedule",
      name: "addBasicSchedule",
      component: () => import("./components/AddBasicSchedule")
    },
    {
      path: "/details",
      name: "my_details",
      component: () => import("./components/Details")
    },
    {
      path: "/editDetails",
      name: "editDetails",
      component: () => import("./components/EditDetails")
    },
    {
      path: "/editReward",
      name: "editReward",
      component: () => import("./components/EditReward")
    },
    {
      path: "/editFine",
      name: "editFine",
      component: () => import("./components/EditFine")
    },
    
  ]
});
