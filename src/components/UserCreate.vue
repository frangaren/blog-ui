<template lang="pug">
#user-create
    user-editor(:user="user", @submit="onSubmit") {{error}}
</template>

<script>
import axios from 'axios'
import config from '@/config'
import UserEditor from '@/components/UserEditor'

export default {
    data: function () {
        return {
            user: {
                username: '',
                name: '',
                email: '',
                password: ''
            },
            error: ''
        }
    },
    created: function () {
        this.user.username = this.$route.query.username;
        this.user.name = this.$route.query.post;
        this.user.email = this.$route.query.author;
    },
    beforeRouteUpdate: function (to) {
        this.user.username = this.$route.query.username;
        this.user.name = this.$route.query.post;
        this.user.email = this.$route.query.author;
    },
    methods: {
        onSubmit: function (comment) {
            axios.post(`${config.api}users`, this.user)
                .then(res => {
                    this.error = '';
                    this.$router.push(`/users/${res.data._id}`);
                })
                .catch(err => this.error = err.response.data.message);
        }
    },
    components: {
        'user-editor': UserEditor
    }
}
</script>

<style>
#user-create {
    text-align: left;
}
</style>