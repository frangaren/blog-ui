<template lang="pug">
#user-list
    span(v-for="user in users", :key="user.id") {{user}}
</template>

<script>
import config from '@/config'
import axios from 'axios'

export default {
    data: function () {
        return {
            users: []
        }
    },
    created: function () {
        axios.get(config.api + 'users/')
            .then(res => this.users = res.data)
            .catch(err => console.error(err))
    }
}
</script>

<style>
</style>