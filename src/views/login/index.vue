<template>
  <div class="login">
    <ul class="menu-tab">
      <li
        v-for="v in MenuData"
        :key="v.type"
        @click="clickMenu(v)"
        :class="{ current: v.current }"
      >
        {{ v.txt }}
      </li>
    </ul>
    <!-- 表单部分 -->
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <label>邮箱</label>
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="password">
        <label>密码</label>
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          minlength="6"
          maxlength="15"/>
      </el-form-item>
      <el-form-item prop="checkPass" v-show="model==='register'">
        <label>确认密码</label>
        <el-input v-model="ruleForm.checkPass" type="password" minlength="6" maxlength="15"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="btnbool" type="primary" class="login-btn block" @click="submitForm(ruleFormRef)"
          >{{model==='login'?'登录':'注册'}}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref ,onMounted, watch} from "vue";
import type { FormInstance } from "element-plus";
import * as CK from "util/verification";
import link from "api/Link";
import apiUrl from "api/url";
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/index.css';

import useMd5 from "../../hook/index.js";
import { useRouter } from "vue-router";

let router = useRouter();

const MenuData = reactive([
  { txt: "登录", current: true, type: "login" },
  { txt: "注册", current: false, type: "register" },
]);

let model = ref('login')

let btnbool = ref(true)

let clickMenu = (item: any) => {
  MenuData.forEach((elemt) => {
    elemt.current = false;
  });
  item.current = true;
  model.value = item.type;
};

onMounted(()=>{
    console.log(process.env.VUE_APP_API);
    
})


// 表单部分

const ruleFormRef = ref<FormInstance>();

const checkUsername = (rule: any, value: any, callback: any) => {
  let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

  if (!value) {
    return callback(new Error("邮箱不能为空"));
  }else if(CK.CKEmail(value)){
    return callback(new Error("邮箱格式错误"));
  }else{
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
    let reg=/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else if(CK.CKPass(value)) {
    callback(new Error("密码格式有误必须是6至15位字母+数字"));
  }else{
    callback()
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
    if(model.value === 'login'){
        callback();
    }
  if (value === "") {
    callback(new Error("确认密码不能为空"));
  } else if (value !== ruleForm.password) {
    callback(new Error("二次确认密码错误"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  password: "",
  checkPass: ""
});

const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  username: [{ validator: checkUsername, trigger: "blur" }],
});

watch(ruleForm, (newval, oldval)=>{
  if(model.value=="login"){

    if(newval.username!=""&&newval.password!=""){
      btnbool.value = false;
    }else{
      btnbool.value = true;
    }
  }else{
    if(newval.username!=""&&newval.password!=""&&newval.checkPass!=""){
      btnbool.value = false;
    }else{
      btnbool.value = true;
    }
  }
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if(model.value==="login"){
        console.log("登录");
        link(apiUrl.register,"GET",{},{name:ruleForm.username,pwd:useMd5(ruleForm.password).value}).then((ok:any)=>{
          console.log(ok);
          if(ok.data.length>0){
            ElMessage.success('登录成功');
            router.push('/home')
          }else{
            ElMessage.error('登录失败');
          }
        })
      }else{
        let data={
            name: ruleForm.username,
            pwd: useMd5(ruleForm.password).value
        }
        link(apiUrl.register,"POST",data).then((ok:any)=>{
            console.log(ok);
            if(Object.keys(ok.data).length !=0){
              ElMessage.success('注册成功');
              MenuData.forEach((elemt) => {
                elemt.current = false;
              });
              MenuData[0].current = true;
              model.value = "login";
            }else{
              ElMessage.error('注册失败')
            }
        })
      }
        
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 表单部分
</script>

<style lang="scss">
.login {
  background-color: #000066;
  height: 100%;
}
html,
body,
#app {
  height: 100%;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgb(255, 255, 255, 0.5);
  }
}
.demo-ruleForm{
    width: 30%;
    margin: 50px auto;
    label{
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
    }
    .block{
        display: block;
        width: 100%;
    }
    .login-btn{
        margin-top: 20px;
    }
}
</style>