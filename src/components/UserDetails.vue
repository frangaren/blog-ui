<template lang="pug">
#user-details
    b Nombre de usuario:&nbsp;
    span {{user.username}}
    br
    b Name:&nbsp;
    span {{user.name}}
    br
    b Email:&nbsp;
    span {{user.email}}
    br
    button(@click="onEdit") Editar
    button(@click="onDelete") Borrar
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
    computed: {
        userEditURL: function () {
            return `/users/${this.user._id}/edit`;
        },
    },
    methods: {
        onDelete: function () {
            axios.delete(`${config.api}users/${this.user._id}`)
                .then(res => this.$router.push('/users'))
                .catch(err => console.error(err));            
        },
        onEdit: function () {
            this.$router.push(this.userEditURL);
        }
    },
    beforeRouteUpdate: function (to) {
        axios.get(`${config.api}users/${to.params.id}`)
            .then(res => this.user = res.data)
            .catch(err => console.error(err))
    }
}
</script>

<style>
#user-details {
    text-align: left;
}
</style>
