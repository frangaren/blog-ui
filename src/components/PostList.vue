<template lang="pug">
#post-list
    span(v-for="post in posts", :key="post._id") {{post.title}}
</template>

<script>
import config from '@/config'
import axios from 'axios'
//import Post from '@/components/Post'

export default {
    data: function () {
        return {
            posts: []
        }
    },
    created: function () {
        axios.get(config.api + 'posts/')
            .then(res => this.posts = res.data)
            .catch(err => console.error(err))
    },
    components: {
        //'post': User
    }
}
</script>

<style>
</style>