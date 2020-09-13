<template>
    <el-container>
        <el-header class="no-padding no-margin">
            <navigator @showLoR="swapCard"></navigator>
        </el-header>
        <el-main class="no-padding no-margin">
            <transition-group :enter-active-class="'animate__fadeInDown'"
                              :leave-active-class="'animate__fadeOutDownBig'">
                <login
                        class="login-comp animate__animated"
                        @login2register="swapCard"
                        v-show="lorType == 1"
                        :key="'login'"></login>
                <register
                        class="register-comp animate__animated"
                        @register2login="swapCard"
                        v-show="lorType==2"
                        :key="'register'"></register>
            </transition-group>
            <main-content></main-content>
        </el-main>
        <el-aside>
        </el-aside>
        <el-footer class="no-padding no-margin">
            this is footer
        </el-footer>
    </el-container>

</template>

<script>
    import Login from 'components/Login'
    import Register from 'components/Register'
    import Navigator from 'components/Navigator'
    import TabBar from 'components/TabBar'
    import MainContent from "./childComps/MainContent";

    export default {
        name: 'Home',
        components: {
            MainContent,
            Login,
            Register,
            Navigator,
            TabBar
        },
        data(){
            return {
                lorType: 0
            }
        },
        methods:{
            swapCard(type){
                this.lorType = type
            }
        }
    }
</script>

<style scoped>
</style>
