<template lang="pug">
form#comment-editor(@submit="onSubmit")
    label Post:&nbsp;
    select(required, v-model="newComment.post")
        option(disabled, value="") Choose a post
        option(v-for="post in posts", :value="post._id") {{post.title}}
    br
    label Text:&nbsp;
    textarea(required, v-model="newComment.text")
    br
    button(type="submit") Save
</template>

<script>
import config from '@/config'
import axios from 'axios'
import User from '@/components/User'

export default {
    data: function() {
        return {
            newComment: {
                post: "",
                author: "",
                text: ""
            },
            users: {},
            posts: {}
        }
    },
    props: [
        'comment'
    ],
    created: function () {
        this.newComment = this.comment;
        axios.get(`${config.api}users`)
            .then(res => this.users = res.data)
            .catch(err => console.error(err));
        axios.get(`${config.api}posts`)
            .then(res => this.posts= res.data)
            .catch(err => console.error(err));
    },
    watch: {
        comment: function () {
            this.newComment = this.comment;
        }
    },
    methods: {
        onSubmit: function () {
            this.$emit('submit', this.newComment);
        }
    }
}
</script>

<style>
#comment-editor {
    text-align: left;
}
</style>