<template>
  <div class="__userList">
    <div class="formBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formInline.truename" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnBox">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onClickAdd">新增管理员</el-button>
    </div>
    <div class="tableList">
      <vtable :dataArray="dataArray" :columns="columns" :total="total" @getArticle="queryUserListPost"></vtable>
    </div>
  </div>
</template>

<script>
  import MyDropDown from 'src/components/common/MyDropDown';
  import table from 'src/components/common/table';
  import {userQueryAll} from "src/api/user/index";//分页查询
  export default {
    components: {
      vtable: table
    },
    data() {
      return {
        formInline: {
          truename: '',
        },
        pageSize: 10,
        pageNum: 1,
        total: 0,
        dataArray: [],
        columns: [
          {
            prop: "name",
            label: "姓名",
          },
          {
            prop: "sex",
            label: "性别",
            render: function(createElement) {
              if(this.row.sex==1){
                return createElement('span', {
                  domProps: {
                    innerHTML: '男',
                  }
                })
              }else if(this.row.sex==2){
                return createElement('span', {
                  domProps: {
                    innerHTML: '女',
                  }
                })
              }else{
                return createElement('span', {
                  domProps: {
                    innerHTML: '保密',
                  }
                })
              }
            },
          },
          {
            prop: "phone",
            label: "手机号码",
          },
          {
            prop: "email",
            label: "邮箱",
          },
          {
            prop: "roleName",
            label: "角色",
          },
          {
            prop: "createTime",
            label: "创建时间",
          },
          {
            prop: "",
            label: "操作",
            render: (h, param) => {
              var items = [
                {label: "修改", func: {func: "update", uuid: param.row.uuid}},
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
      //分页查询管理员列表
      queryUserListPost(pageNum, name) {
        var newVar = {
          pageSize: this.pageSize,
          pageNum: pageNum,
          name: name
        };
        let params = newVar
        userQueryAll(params).then(data => {
          if (data.data.code == 200) {
            this.dataArray = data.data.data.list
            this.total = data.data.data.total
          }
        })
      },
      //新增
      onClickAdd() {
        this.$router.push({path: "/home/userAdd?type=1"});
      },
      //修改
      update(uuid) {
        this.$router.push({path: "/home/userAdd?type=2&uuid="+uuid+""});
      },
    }
  }
</script>

<style lang="stylus">
  .__userList {
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
