<template lang="pug">
#comment-edit
    comment-editor(:comment="comment", @submit="onSubmit")
</template>

<script>
import axios from 'axios'
import config from '@/config'
import CommentEditor from '@/components/CommentEditor'

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
    methods: {
        onSubmit: function (comment) {
            axios.patch(`${config.api}comments/${this.comment._id}`, this.comment)
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
#comment-details {
    text-align: left;
}
</style>