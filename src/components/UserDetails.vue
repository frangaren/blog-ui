<template lang="pug">
ul#user-details
    li
        b Nombre de usuario:&nbsp;
        span {{user.username}}
    li
        b Name:&nbsp;
        span {{user.name}}
    li
        b Email:&nbsp;
        span {{user.email}}
</template>

<script>
import axios from 'axios'
import config from '@/config'

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
    }
}
</script>

<style>
</style>
