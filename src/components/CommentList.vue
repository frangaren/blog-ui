<template lang="pug">
#comment-list
    comment(v-for="comment in comments", :comment="comment", 
        :key="comment._id", showAuthor, showPost)
</template>

<script>
import config from '@/config'
import axios from 'axios'
import Comment from '@/components/Comment'

export default {
    data: function () {
        return {
            comments: []
        }
    },
    created: function () {
        axios.get(config.api + 'comments/')
            .then(res => this.comments = res.data)
            .catch(err => console.error(err))
    },
    components: {
        'comment': Comment
    }
}
</script>

<style>
#comment-list {
    text-align: left;
}
</style>