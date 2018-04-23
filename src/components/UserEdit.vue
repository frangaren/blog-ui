<template lang="pug">
#user-edit
    user-editor(:user="user", @submit="onSubmit")
</template>

<script>
import axios from 'axios'
import config from '@/config'
import UserEditor from '@/components/UserEditor'

export default {
    data: function () {
        return {
            user: {}
        }
    },
    created: function () {
        axios.get(`${config.api}users/${this.$route.params.id}`)
            .then(res => this.user = res.data)
            .catch(err => console.error(err))
    },
    beforeRouteUpdate: function (to) {
        axios.get(`${config.api}users/${to.params.id}`)
            .then(res => this.user = res.data)
            .catch(err => console.error(err))
    },
    methods: {
        onSubmit: function (user) {
            axios.patch(`${config.api}users/${this.user._id}`, this.user)
                .then(res => this.$router.push(`/users/${res.data._id}`))
                .catch(err => console.error(err));
        }
    },
    components: {
        'user-editor': UserEditor
    }
}
</script>

<style>
#user-details {
    text-align: left;
}
</style>