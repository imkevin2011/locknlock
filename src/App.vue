<template>
    <div id="app">
        <transition  mode="out-in" :enter-active-class="enterActiveClass"
                    :leave-active-class="leaveActiveClass">
            <router-view class="animate__animated"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                enterActiveClass:'',
                leaveActiveClass:'animate__zoomOut'
            }
        },
        watch: {
            $route(to, from) {
                if (from.path == '/' && to.path == '/home') {
                    this.enterActiveClass = 'animate__slideInRight'
                    this.leaveActiveClass = 'animate__slideOutRight'
                } else if (from.path == '/' && to.path == '/backend') {
                    this.enterActiveClass = 'animate__slideInLeft'
                    this.leaveActiveClass = 'animate__slideOutLeft'
                } else if (from.path == '/' && to.path == '/projects') {
                    this.enterActiveClass = 'animate__zoomInDown'
                    this.leaveActiveClass = 'animate__zoomOutDown'
                }
            }
        },
        methods: {}
    }
</script>

<style>
    #app{
        /*background-color: #151515;*/
    }
    body{
        margin: 0;
    }
</style>
