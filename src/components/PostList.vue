<template lang="pug">
#post-list
    button(@click="onNew", v-if="$auth.state.logged") New
    post(v-for="post in posts", :post="post", :key="post._id")
</template>

<script>
import config from '@/config'
import axios from 'axios'
import Post from '@/components/Post'

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
    methods: {
        onNew: function () {
            this.$router.push('/posts/create');
        }
    },
    components: {
        'post': Post
    }
}
</script>

<style>
</style>