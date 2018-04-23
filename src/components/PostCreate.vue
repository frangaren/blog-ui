<template lang="pug">
#post-create
    post-editor(:post="post", @submit="onSubmit")
</template>

<script>
import axios from 'axios'
import config from '@/config'
import PostEditor from '@/components/PostEditor'

export default {
    data: function () {
        return {
            post: {
                author: "",
                title: "",
                text: ""
            }
        }
    },
    created: function () {
        this.post.title = this.$route.query.title;
        this.post.author = this.$route.query.author;
        this.post.text = this.$route.query.text;
    },
    beforeRouteUpdate: function (to) {
        this.post.title = to.query.title;
        this.post.author = to.query.author;
        this.post.text = to.query.text;
    },
    methods: {
        onSubmit: function (comment) {
            axios.post(`${config.api}posts`, this.post)
                .then(res => this.$router.push(`/posts/${res.data._id}`))
                .catch(err => console.error(err));
        }
    },
    components: {
        'post-editor': PostEditor
    }
}
</script>

<style>
#comment-create {
    text-align: left;
}
</style>