<template lang="pug">
form#user-login(@submit="onSubmit", v-if="!$auth.state.logged")
    label Username:&nbsp;
    input(required, type="text", v-model="payload.username")
    br
    label Password:&nbsp;
    input(required, type="password", v-model="payload.password")
    br
    .error {{error}}
    button(type="submit") Login
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
    data: function () {
        return {
            payload: {
                username: '',
                password: ''
            },
            error: '',
            userId: ''
        }
    },
    created: function () {
    },
    beforeRouteUpdate: function (to) {
    },
    methods: {
        onSubmit: function (comment) {
            this.$auth.login(this.payload.username, this.payload.password)
                .then(res => {
                    this.error = '';
                    this.$router.push('/');
                })
                .catch(err => this.error = err.response.data.error_description);
        }
    },
    components: {
    }
}
</script>

<style>
#user-login {
    text-align: left;
}

.error {
    color: red;
}
</style>