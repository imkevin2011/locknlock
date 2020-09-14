<template>
    <el-container class="register-container">
        <el-form :label-position="labelPosition" status-icon
                 label-width="80px"
                 :rules="rules"
                 :model="registerForm"
                 ref="registerForm"
                 size="medium">
            <el-tooltip class="item" effect="dark" content="用户名要在 8 位以内~" placement="top-end">
                <el-form-item label="用户名">
                    <el-input v-model="registerForm.name"></el-input>
                </el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="请输入至少 6 位密码~" placement="top-end">
                <el-form-item label="密码">
                    <el-input v-model="registerForm.password"></el-input>
                </el-form-item>
            </el-tooltip>
            <el-form-item label="验证码">
                <el-input v-model="registerForm.captcha"></el-input>
                <img class="captcha-image" :src="captchaSrc" alt="" @click="getCaptcha"/>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="validateRegisterForm('registerForm')">注册</el-button>
                <el-button @click="swapCard(0)">取消</el-button>
            </el-form-item>
            <el-form-item>
                <el-link type="info" @click.prevent="swapCard(1)" :underline="false" icon="el-icon-question">已经有账号?</el-link>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    import {requestForRegister, requestForCaptcha} from "../network/passport";

    export default {
        name: "Register",
        data(){
            let checkUserNameInput = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'))
                } else if (value.length > 12){
                    return callback(new Error('用户名最长12位'))
                } else {
                    callback()
                }
            }
            let checkPasswordInput = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'))
                } else if (value.length < 6){
                    return callback(new Error('密码最少设置6位'))
                } else {
                    callback()
                }
            }
            let checkCaptchaInput = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入验证码~'))
                }else {
                    callback()
                }
            }
            return {
                labelPosition: 'right',
                registerForm: {
                    name: '',
                    password: '',
                    captcha:''
                },
                captchaSrc:'',
                rules:{
                    user_name: [
                        {validator: checkUserNameInput, trigger: 'blur'},
                    ],
                    password: [
                        {validator: checkPasswordInput, trigger: 'blur'}
                    ],
                    captcha: [
                        {validator: checkCaptchaInput, trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            swapCard(type){
                this.$emit('register2login',type)
            },
            validateRegisterForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.doRegister();
                    } else {
                        return false;
                    }
                })
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
            },
            doRegister(){
                let registerParams = {
                    user_name: this.loginForm.user_name,
                    password: this.loginForm.password,
                    captcha: this.loginForm.captcha
                }
                requestForRegister(registerParams).then(resp => {
                    if (resp.status != 0) {
                        this.registerAlert(resp.msg)
                    }
                })
            },
            registerAlert(msg) {
                this.$message.error(msg);
            },
        }
    }
</script>

<style scoped>
    .register-container {
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
        padding: 20px 20px 0px 20px;
        box-sizing: border-box;
    }
</style>
