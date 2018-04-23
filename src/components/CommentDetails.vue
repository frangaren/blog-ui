<template lang="pug">
comment(:comment="comment", showAuthor, showPost, 
    deleteRedirect="/")#comment-details
</template>

<script>
import axios from 'axios'
import config from '@/config'
import Comment from '@/components/Comment'

export default {
    data: function () {
        return {
            comment: {}
        }
    },
    created: function () {
        axios.get(`${config.api}comments/${this.$route.params.id}`)
            .then(res => this.comment = res.data)
            .catch(err => console.error(err))
    },
    beforeRouteUpdate: function (to) {
        axios.get(`${config.api}comments/${to.params.id}`)
            .then(res => this.comment = res.data)
            .catch(err => console.error(err))
    },
    components: {
        comment: Comment
    }
}
</script>

<style>
#comment-details {
    text-align: left;
}
</style>


