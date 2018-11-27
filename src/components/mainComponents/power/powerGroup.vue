<template>
  <div class="__powerGroup">
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增权限组</el-button>
    </div>
    <div class="tableList">
      <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
    </div>
  </div>
</template>

<script>
  import MyDropDown from 'src/components/common/MyDropDown';
  import table from 'src/components/common/table';
  import {roleQueryAll} from "api/role/index";//新增权限组
  export default {
    components: {
      vtable: table
    },
    data() {
      return {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        dataArray: [],
        columns: [
          {
            prop: "name",
            label: "名称",
          },
          {
            prop: "description",
            label: "描述",
          },
          {
            prop: "createTime",
            label: "创建时间",
          },
          {
            prop: "updateTime",
            label: "更新时间",
          },
          {
            prop: "",
            label: "操作",
            render: (h, param) => {
              var items = [
                {label: "修改", func: {func: "update", uuid: param.row.uuid}},
                {label: "权限", func: {func: "role", uuid: param.row.uuid}},
              ]
              const dropDownData = {
                label: "操作",
                items: items
              };
              return h(MyDropDown, {
                props: {
                  dropDownData: dropDownData
                },
                on: {
                  update: this.update,
                  role: this.role
                }
              });
            }
          }
        ],
      }
    },
    mounted() {
      this.queryUserListPost(this.pageNum);
    },
    methods: {
      //分页查询权限组
      queryUserListPost(pageNum) {
        let newVar = {
          pageSize: this.pageSize,
          pageNum: pageNum,
        };
        let params = newVar
        roleQueryAll(params).then(data => {
          if (data.data.code == 200) {
            this.dataArray = data.data.data.list
            this.total = data.data.data.total
          }
        })
      },
      //新增
      onClickAdd() {
        this.$router.push({path: "/home/powerGroupAdd?type=1"});
      },
      //修改
      update(uuid) {
        this.$router.push({path: "/home/powerGroupAdd?type=2&uuid="+uuid+""});
      },
      role(uuid){
        this.$router.push({path: "/home/powerGroupMenu?uuid="+uuid+""});
      }
    }
  }
</script>

<style lang="stylus">
  .__powerGroup {
    background #ffffff;
    padding 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    .formBox {
      border-bottom 1px solid #eee
    }
    .btnBox {
      margin 10px 0;
    }
  }
</style>
