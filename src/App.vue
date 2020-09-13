<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
            }
        },

        methods: {}
    }
</script>

<style>
    @import '~element-ui/lib/theme-chalk/display.css';
    body {
        padding: 0 !important;
        margin: 0 !important;
    }
    .no-padding{
        padding: 0 !important;
    }
    .no-margin{
        margin: 0 !important;
    }
    body::-webkit-scrollbar {
        display: none;
    }
</style>
