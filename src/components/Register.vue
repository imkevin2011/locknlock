<template>
    <el-container class="register-container">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" size="medium">
            <el-tooltip class="item" effect="dark" content="用户名要在 8 位以内~" placement="top-end">
                <el-form-item label="用户名">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="请输入至少 6 位密码~" placement="top-end">
                <el-form-item label="密码">
                    <el-input v-model="formLabelAlign.password"></el-input>
                </el-form-item>
            </el-tooltip>
            <el-form-item>
                <el-button type="success" @click="">注册</el-button>
                <el-button @click="swapCard(0)">取消</el-button>
            </el-form-item>
            <el-form-item>
                <el-link type="info" @click.prevent="swapCard(1)" :underline="false" icon="el-icon-question">已经有账号?</el-link>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    password: ''
                }
            }
        },
        methods:{
            swapCard(type){
                this.$emit('register2login',type)
            }
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
