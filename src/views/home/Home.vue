<template>
    <div id="home">
        <navigator></navigator>
        <login class="login-comp"></login>
        <register class="register-comp"></register>
        <tab-bar class="visible-xs-block visible-sm-block"></tab-bar>
    </div>

</template>

<script>
    import Login from 'components/Login'
    import Register from 'components/Register'
    import Navigator from 'components/Navigator'
    import TabBar from 'components/TabBar'

    export default {
        name: 'Home',
        components: {
            Login,
            Register,
            Navigator,
            TabBar
        },
        methods:{
        }
    }
</script>

<style scoped>
    #home{
        height: 100vh;
        /*width: 100vh;*/
    }
    .test{
        height: 500px;
        width: 500px;
        background-color: lightblue;
        margin: 0 auto;
    }
</style>
