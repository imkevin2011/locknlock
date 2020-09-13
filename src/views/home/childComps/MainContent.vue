<template>
    <div id="main-content">
        <ul class="infinite-list-wrapper"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled" style="overflow: auto">
            <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
            <p v-if="loading" v-loading="loading"></p>
            <p v-if="noMore">没有更多了</p>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MainContent",
        data(){
            return {
                count: 0,
                loading: false
            }
        },
        computed:{
            noMore () {
                return this.count >= 50
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        methods:{
            load () {
                this.loading = true
                setTimeout(() => {
                    this.count += 20
                    this.loading = false
                }, 2000)
            }
        }

    }
</script>

<style scoped>
    ul {
        margin: 0;
        padding: 0;
    }
    li{
        margin-bottom: 200px;
    }
    .infinite-list-wrapper{
        height: calc(100vh - 135px);
        /*background-color: lightblue;*/
    }
    .infinite-list-wrapper::-webkit-scrollbar {
        /*display: none;*/
    }
    #main-content {
    }
</style>
