<template lang="pug">
post(:post="post")
    hr
    section.post-body {{post.text}}
    hr
    comments(:post="post")
</template>

<script>
import axios from 'axios'
import config from '@/config'
import Post from '@/components/Post.vue'
import PostComments from '@/components/PostComments.vue'

export default {
    data: function () {
        return {
            post: {},
        }
    },
    created: function () {
        axios.get(`${config.api}posts/${this.$route.params.id}`)
            .then(res => this.post = res.data)
            .catch(err => console.error(err));
    },
    beforeRouteUpdate: function (to) {
        axios.get(`${config.api}posts/${to.params.id}`)
            .then(res => this.post = res.data)
            .catch(err => console.error(err));
    },
    components: {
        post: Post,
        comments: PostComments
    }
}
</script>

<style>

</style>