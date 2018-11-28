<template>
  <div class="__goodsListAdd">
    <div class="modelFromListBox">
      <el-tree
        :data="roleDataList"
        show-checkbox
        ref="tree"
        node-key="uuid"
        default-expand-all
        :props="defaultProps">
      </el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitRole()">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import { menuQueryList } from "src/api/role/index";//新增
  import { roleMenuAdd } from "src/api/role/index";//新增
  export default {
    data() {
      return {
        checkedCities: ["a6199021d699434badfaf6eb1336c615", "ffc30ed2912548148c968eacabc97639"],
        roleDataList: {},//查询所有的菜单集合
        defaultProps: {
          children: 'childs',
          label: 'name'
        },
      };
    },
    mounted(){
      this.queryAllPost();
      this.addQueryList();
    },
    methods: {
      //查询所有的菜单
      queryAllPost(){
        menuQueryList({}).then(data => {
          if(data.data.code==200){
            this.roleDataList = data.data.data
          }
        })
      },
      //确认
      submitRole(){
        console.log(this.$refs.tree.getCheckedNodes());
        let menuList = this.$refs.tree.getCheckedKeys();
        let arr = [];
        for(let i=0;i<menuList.length;i++){
          arr.push({ rId: this.$route.query.uuid, mId: menuList[i] })
        }
        let params = {
          menuList: arr
        };
        roleMenuAdd(params).then(data => {
          debugger
          let _this = this;
          if(data.data.code==200){
            this.$message({
              message: '新增成功！',
              type: 'success',
              duration: '500',
              onClose: function(){
                //_this.$router.push({path: '/home/powerGroup'})
              }
            });
          }
        })

      },
      //赋值
      addQueryList(){
        this.$refs.tree.setCheckedKeys(this.checkedCities)
      }
    }
  };
</script>

<style lang="stylus">
  .__goodsListAdd {
    .addFromListBox {
      width 960px;
      .form-control {
        width 60%;
      }
      .el-textarea {
        textarea {
          height 90px;
        }
      }
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
