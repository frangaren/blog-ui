<template lang="pug">
section.post-comments
    header
        h2 Comments:
        button(@click="onClick") New
    comment(v-for="comment in comments", :comment="comment", 
        :key="comment._id", showAuthor)
</template>

<script>
import axios from 'axios'
import config from '@/config'
import Comment from '@/components/Comment'

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
    },
    methods: {
        onClick: function () {
            this.$router.push(`/comments/create?post=${this.post._id}`);            
        }
    },
    components: {
        comment: Comment
    }
}
</script>

<style>
.post-comments {
    text-align: left;
}

.post-comments > header > h3 {
    margin-bottom: 0;
}

.post-comments > header > button {
    margin-bottom: 2em;
}
</style>
