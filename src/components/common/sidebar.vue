<template>
  <div class="__sidebar">
    <el-row class="tac">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          :default-openeds="openeds"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="uniqueOpened"
          :router="openedRouter"
          :default-active="defaultActive"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#fff">
          <el-submenu v-for="(item,index) in sidebarMenu2" :key="index" :index="''+(index+1)">
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group v-if="item.childs">
              <el-menu-item v-for="(itemList,indexList) in item.childs" :key="indexList" :index="''+itemList.url">
                {{itemList.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {queryMenuAll} from "src/api/login/index";

  export default {
    data() {
      return {
        systemType: '',
        uniqueOpened: true,
        openedRouter: true,
        defaultActive: this.$route.path,
        openeds: ['1'],
        sidebarMenu: [],
        sidebarMenu2: [{
          "name": "权限管理",
          "powers": [{
            "meunName": "用户",
            "frontPath": "/home/user"
          },
            {
              "meunName": "权限",
              "frontPath": "/home/powerGroup"
            }]
        }],
      }
    },
    methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      },
      //根据用户查询菜单权限
      queryAllPost() {
        var userData = JSON.parse(sessionStorage.getItem("userData"));
        queryMenuAll({}).then(data => {
          if (data.data.code == 200) {
            this.sidebarMenu2 = data.data.data
          }
        })
      }
    },
    mounted() {
      this.queryAllPost();
    },
  }
</script>

<style lang="stylus">
  .sidebar {
    .el-menu-item-group__title {
      padding 0px;
    }
    .el-submenu .el-menu-item {
      background #16181d !important
    }
    .el-submenu .is-active {
      background #1E9FFF !important
    }

  }
</style>
