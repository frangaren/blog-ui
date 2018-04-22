<template lang="pug">
#comment-create
    comment-editor(:comment="comment", @submit="onSubmit")
</template>

<script>
import axios from 'axios'
import config from '@/config'
import CommentEditor from '@/components/CommentEditor'

export default {
    data: function () {
        return {
            comment: {
                author: "",
                post: "",
                text: ""
            }
        }
    },
    created: function () {
        this.comment.post = this.$route.query.post;
        this.comment.author = this.$route.query.author;
        this.comment.text = this.$route.query.text;
    },
    beforeRouteUpdate: function (to) {
        this.comment.post = to.query.post;
        this.comment.author = to.query.author;
        this.comment.text = to.query.text;
    },
    methods: {
        onSubmit: function (comment) {
            axios.post(`${config.api}comments`, this.comment)
                .then(res => this.$router.push(`/comments/${res.data._id}`))
                .catch(err => console.error(err));
        }
    },
    components: {
        'comment-editor': CommentEditor
    }
}
</script>

<style>
#comment-create {
    text-align: left;
}
</style>