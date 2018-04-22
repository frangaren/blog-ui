<template lang="pug">
form#comment-editor(@submit="onSubmit")
    label Author:&nbsp;
    select(required, v-model="comment.author")
        option(disabled, value="") Choose an author
        option(v-for="user in users", :value="user._id") {{user.username}}
    br  
    label Post:&nbsp;
    select(required, v-model="comment.post")
        option(disabled, value="") Choose a post
        option(v-for="post in posts", :value="post._id") {{post.title}}
    br
    label Text:&nbsp;
    textarea(required, v-model="comment.text")
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
            users: {},
            posts: {}
        }
    },
    props: [
        'comment'
    ],
    created: function () {
        this.comment = this.value;
        axios.get(`${config.api}users`)
            .then(res => this.users = res.data)
            .catch(err => console.error(err));
        axios.get(`${config.api}posts`)
            .then(res => this.posts= res.data)
            .catch(err => console.error(err));
    },
    methods: {
        onSubmit: function () {
            this.$emit('submit', this.comment);
        }
    }
}
</script>

<style>
#comment-editor {
    text-align: left;
}
</style>