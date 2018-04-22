<template lang="pug">
section.post-comments
    div(v-for="comment in comments") {{comment.text}}
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
    data: function () {
        return {
            postId: '',
            comments: []
        };
    },
    props: [
        'post'
    ],
    created: function () {
        this.postId = '';
        if ('_id' in this.post) {
            axios.get(`${config.api}posts/${this.post._id}/comments`)
                .then(res => this.comments = res.data)
                .catch(err => console.error(err));
        }
    },
    watch: {
        post: function () {
            if (this.post._id != this.postId) {
                this.postId = this.post._id;
                axios.get(`${config.api}posts/${this.post._id}/comments`)
                    .then(res => this.comments = res.data)
                    .catch(err => console.error(err));
            }
        }
    }
}
</script>

<style>

</style>
