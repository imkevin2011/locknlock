<template>
    <div id="navigator">
        <el-row class="nav-row">
            <el-col :span="4" class="hidden-sm-and-down">
                <div class="grid-content">
                    <img class="nav-logo" src="~assets/logo.png">
                </div>
            </el-col>
            <el-col :xs="21" :sm="21" :md="18" :lg="18" :xl="18">
                <div >
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-submenu index="2" v-show="showMineTab">
                            <template slot="title">我的</template>
                            <el-menu-item index="2-1">文章</el-menu-item>
                            <el-menu-item index="2-2">相册</el-menu-item>
                            <el-menu-item index="2-3">评论</el-menu-item>
                            <el-menu-item index="2-4">面板</el-menu-item>
                            <el-submenu index="2-5">
                                <template slot="title">管理</template>
                                <el-menu-item index="2-5-1">Sql</el-menu-item>
                                <el-menu-item index="2-5-2" disabled>...</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3">逛逛</el-menu-item>
                        <el-menu-item index="4" disabled>消息</el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <el-col :span="2" class="hidden-sm-and-down">
                    <div class="grid-content">
                        <transition :enter-active-class="'animate__flipInX'"
                                          :leave-active-class="'animate__flipOutX'"
                                    :appear="true"
                                    :appear-class="'animate__bounceIn'"
                                            mode="out-in">
                            <el-dropdown v-if="!showMineTab" :key="'unlog'" class="animate__animated"

                                         size="small" :split-button="true" type="success" @click="click2Login">
                                登录
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="click2Register">注册</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-dropdown v-else :key="'loged'" class="animate__animated right-content">
                                <img :src="getUserAvatar" class="user_avatar">
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </transition>
                    </div>
                    <!--<div class="grid-content right-content animate__animated" v-show="showMineTab" :key="'loged'">

                    </div>-->
            </el-col>
            <el-col :span="3" class="hidden-md-and-up">
                <div class="grid-content" >
                    <el-button type="success" icon="el-icon-s-custom" size="small" circle></el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Navigator",
        props:{
          userId:""
        },
        computed:{
            showMineTab(){
              return this.$store.getters.getLoginState == 1
            },
            getUserName(){
                return this.$store.getters.getUserName
            },
            getUserAvatar(){
                return this.$store.getters.getAvatar
            }
        },
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',

            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            click2Login(){
                this.$emit('showLoR',1)
            },
            click2Register(){
                this.$emit('showLoR',2)
            },
            logout(){
                this.$store.commit('logout')
            }
        }
    }
</script>

<style scoped>
    .grid-content{
        /*align-content: center;*/
        text-align: center;
        height: 61px;
        line-height: 61px;
        border-bottom: #e2e2e2 solid 1px;
        box-sizing: border-box;
    }
    .nav-logo {
        padding-top: 7px;
    }
    .user_avatar{
        /*line-height: 61px;*/
        border-radius: 50%;
        height: 50px;
        width: 50px;
        overflow: hidden;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin-left: 0;
    }
    /*.user_avatar img{
        height: 50px;
    }*/
    .right-content {
        padding-top: 5px;
    }
</style>
