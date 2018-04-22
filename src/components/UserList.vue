<template lang="pug">
ul#user-list
    li(v-for="user in users")
        user(:user="user", :key="user._id")
</template>

<script>
import config from '@/config'
import axios from 'axios'
import User from '@/components/User'

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
    },
    components: {
        'user': User
    }
}
</script>

<style>
</style>