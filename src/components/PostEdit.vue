<template lang="pug">
#post-edit
    post-editor(:post="post", @submit="onSubmit")
</template>

<script>
import axios from 'axios'
import config from '@/config'
import PostEditor from '@/components/PostEditor'

export default {
    data: function () {
        return {
            post: {}
        }
    },
    created: function () {
        axios.get(`${config.api}posts/${this.$route.params.id}`)
            .then(res => this.post = res.data)
            .catch(err => console.error(err))
    },
    beforeRouteUpdate: function (to) {
        axios.get(`${config.api}posts/${to.params.id}`)
            .then(res => this.post = res.data)
            .catch(err => console.error(err))
    },
    methods: {
        onSubmit: function (comment) {
            axios.patch(`${config.api}posts/${this.post._id}`, this.post)
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
#post-details {
    text-align: left;
}
</style>