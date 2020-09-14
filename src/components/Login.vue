<template>
    <el-container class="login-container">
        <el-form :label-position="labelPosition" status-icon
                 label-width="80px"
                 :rules="rules"
                 :model="loginForm"
                 ref="loginForm"
                 size="medium">
            <el-form-item label="用户名" prop="user_name">
                 <el-input v-model="loginForm.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item v-if="responseStatus == -2"
                    label="验证码"
                    prop="captcha"
                    :rules="{required:true,message:'请填写验证码',trigger:'blur'}">
                <el-input v-model="loginForm.captcha"></el-input>
                <img class="captcha-image" :src="captchaSrc" alt="" @click="getCaptcha"/>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="validateLoginForm('loginForm')">登录</el-button>
                <el-button @click="swapCard(0)">取消</el-button>
            </el-form-item>
            <el-form-item>
                <el-link type="info" @click.prevent="swapCard(2)" :underline="false" icon="el-icon-question">还没有账号?</el-link>
            </el-form-item>
        </el-form>

    </el-container>
</template>

<script>
    import {requestForLogin,requestForCaptcha} from "../network/passport";

    export default {
        name: "Login",
        data(){
            let checkLoginInput = (rule, value, callback) => {
                let errMsg = '用户名'
                if (rule.field == 'password'){
                    errMsg = '密码'
                }
                if (!value) {
                    return callback(new Error(errMsg + '不能为空'))
                } else {
                    callback()
                }
            }
            return {
                captchaSrc:'',
                labelPosition: 'right',
                loginForm: {
                    user_name: '',
                    password: '',
                    captcha:''
                },
                responseStatus:0,
                rules:{
                    user_name: [
                        {validator: checkLoginInput, trigger: 'blur'},
                    ],
                    password: [
                        {validator: checkLoginInput, trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            swapCard(type){
                this.$emit('login2register',type)
                this.$refs['loginForm'].resetFields();
            },
            validateLoginForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.doLogin();
                    } else {
                        return false;
                    }
                });
            },
            doLogin(){
                let loginParams = {
                    user_name: this.loginForm.user_name,
                    password: this.loginForm.password,
                    captcha: this.loginForm.captcha
                }
                requestForLogin(loginParams).then(resp => {
                    if (resp.status != 0) {
                        this.loginAlert(data.msg)
                        if (resp.status == -2) {
                            this.addCaptcha()
                        }
                    } else {
                        let user_data = resp.data
                        this.$store.commit('changeLoginState',{
                            user_id: user_data.user_id,
                            login_state: 1
                        })
                        this.$store.commit('setUserData',user_data)
                        this.successNotify((user_data.nick_name == null
                                || user_data.nick_name == undefined
                                || user_data.nick_name == '') ?
                                user_data.user_name : user_data.nick_name)
                        this.swapCard(0)
                        this.$refs['loginForm'].resetFields();
                        this.responseStatus = 0
                    }
                })
            },
            loginAlert(msg) {
                this.$message.error(msg);
            },
            successNotify(user_name){
                this.$notify({
                    title: '亲爱的' + user_name,
                    message: '欢迎回来~!',
                    offset: 61
                })
            },
            addCaptcha() {
                this.responseStatus = -2
                this.getCaptcha()
            },
            getCaptcha(){
                requestForCaptcha(this.loginForm.user_name)
                    .then(data => {
                        return 'data:image/png;base64,' + btoa(
                            new Uint8Array(data)
                                .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        )
                    })
                    .then(data => {
                        this.captchaSrc = data
                    })
            }
        }
    }
</script>

<style scoped>
    .login-container {
        position: absolute;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #e2e2e2;
        box-shadow: 0px 2px 13px #98b4c4;
        left: 0;
        top: 0;
        right: 0;
        margin: 10px auto auto auto;
        width: 330px;
        padding: 20px 20px 0 20px;
        box-sizing: border-box;
    }
    .captcha-image{
        margin-top: 3px;
    }
</style>
