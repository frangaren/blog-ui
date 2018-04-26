<template lang="pug">
form#post-editor(@submit="onSubmit")
    label Title:&nbsp;
    input(required, type="text", v-model="newPost.title")
    br 
    label Text:&nbsp;
    textarea(required, v-model="newPost.text")
    br
    button(type="submit") Save
</template>

<script>
import config from '@/config'
import axios from 'axios'

export default {
    data: function() {
        return {
            newPost: {
                title: "",
                text: ""
            },
            users: {}
        }
    },
    props: [
        'post'
    ],
    created: function () {
        this.newPost = this.post;
        axios.get(`${config.api}users`)
            .then(res => this.users = res.data)
            .catch(err => console.error(err));
    },
    watch: {
        post: function () {
            this.newPost = this.post;
        }
    },
    methods: {
        onSubmit: function () {
            this.$emit('submit', this.newPost);
        }
    }
}
</script>

<style>
#comment-editor {
    text-align: left;
}
</style>