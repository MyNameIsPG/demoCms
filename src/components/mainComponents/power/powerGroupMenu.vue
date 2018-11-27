<template>
  <div class="__goodsListAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增用户</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name" class="form-control">
            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="描述" class="form-control">
            <el-input type="textarea" v-model="ruleForm.description" placeholder="写点什么吧！"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { roleAdd } from "src/api/role/index";//新增
  import { roleUpdate } from "src/api/role/index";//修改
  import { roleQueryOne } from "src/api/role/index";//查询单个
  export default {
    data() {
      return {
        roleIdDataList: {},
        ruleForm: {
          name: "",
          description: '',
        },
        rules: {
          name: [
            { required: true, message: "请输入名称", trigger: "blur" },
          ],
        }
      };
    },
    mounted(){
      if(this.$route.query.type==2){
        this.taskQueryOnePost();
      }
    },
    methods: {
      //查询单个
      taskQueryOnePost(){
        roleQueryOne({uuid: this.$route.query.uuid}).then(data => {
          if(data.data.code==200){
            this.ruleForm.name = data.data.data.name;
            this.ruleForm.description = data.data.data.description;
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if(this.$route.query.type==1){
              let params = {
                name: this.ruleForm.name,
                description: this.ruleForm.description,
              };
              roleAdd(params).then(data => {
                let _this = this;
                if(data.data.code==200){
                  this.$message({
                    message: '新增成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function(){
                      _this.$router.push({path: '/home/powerGroup'})
                    }
                  });
                }
              })
            }else if(this.$route.query.type==2){
              let params = {
                uuid: this.$route.query.uuid,
                description: this.ruleForm.description,
                name: this.ruleForm.name,
              };
              roleUpdate(params).then(data => {
                let _this = this;
                if(data.data.code==200){
                  this.$message({
                    message: '修改成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function(){
                      _this.$router.push({path: '/home/powerGroup'})
                    }
                  });
                }
              })
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
      },
      getUEContentTxt() {
        let content = this.$refs.ue.getUEContentTxt(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
      },
      //封面
      handleAvatarSuccess(res, file) {
        this.ruleForm.coverPic = res.data
      },
      // 上传图片前
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isLt2M;
      },
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
