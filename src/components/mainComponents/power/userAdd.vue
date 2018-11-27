<template>
  <div class="__goodsListAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增用户</span>
      </div>
      <div class="addFromListBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name" class="form-control">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone" class="form-control">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="form-control">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" class="form-control">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
              <el-option v-for="(item, index) in roleIdDataList" :key="index" :label="item.name" :value="item.uuid"></el-option>
            </el-select>
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
  import { userAdd } from "src/api/user/index";//新增
  import { userUpdate } from "src/api/user/index";//修改
  import { userQueryOne } from "src/api/user/index";//查询单个
  import { roleQueryAll } from "src/api/role/index";//查询所有角色
  export default {
    data() {
      return {
        roleIdDataList: {},
        ruleForm: {
          name: "",
          sex: '',
          phone: '',
          password: '',
          email: '',
          roleId: "",
          head_picture: ''
        },
        rules: {
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
          ],
          phone: [
            { required: true, message: "请输入手机号码", trigger: "blur" },
          ],
          roleId: [
            { required: true, message: "请选择角色", trigger: "change" }
          ],
        }
      };
    },
    mounted(){
      this.roleQueryAllPost();
      if(this.$route.query.type==2){
        this.taskQueryOnePost();
      }
    },
    methods: {
      //查询所有角色
      roleQueryAllPost(){
        let params = {
          pageSize: 1000,
          pageNum: 1,
        }
        roleQueryAll(params).then(data => {
          if(data.data.code==200){
            this.roleIdDataList = data.data.data.list
          }
        })
      },
      //查询单个
      taskQueryOnePost(){
        userQueryOne({uuid: this.$route.query.uuid}).then(data => {
          if(data.data.code==200){
            this.ruleForm.name = data.data.data.name;
            this.ruleForm.sex = data.data.data.sex;
            this.ruleForm.phone = data.data.data.phone;
            this.ruleForm.password = data.data.data.password;
            this.ruleForm.email = data.data.data.email;
            this.ruleForm.roleId = ''+data.data.data.roleId+''
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if(this.$route.query.type==1){
              let params = {
                name: this.ruleForm.name,
                sex: this.ruleForm.sex,
                phone: this.ruleForm.phone,
                password: this.ruleForm.password,
                email: this.ruleForm.email,
                roleId: this.ruleForm.roleId,
              };
              userAdd(params).then(data => {
                var _this = this;
                if(data.data.code==200){
                  this.$message({
                    message: '新增成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function(){
                      _this.$router.push({path: '/home/user'})
                    }
                  });
                }
              })
            }else if(this.$route.query.type==2){
              let params = {
                uuid: this.$route.query.uuid,
                name: this.ruleForm.name,
                sex: this.ruleForm.sex,
                phone: this.ruleForm.phone,
                password: this.ruleForm.password,
                email: this.ruleForm.email,
                roleId: this.ruleForm.roleId,
              };
              userUpdate(params).then(data => {
                var _this = this;
                if(data.data.code==200){
                  this.$message({
                    message: '修改成功！',
                    type: 'success',
                    duration: '500',
                    onClose: function(){
                      _this.$router.push({path: '/home/user'})
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
