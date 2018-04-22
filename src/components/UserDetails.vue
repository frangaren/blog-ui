<template lang="pug">
ul(id="user-details")
    li
        b Nombre de usuario: 
        span {{user.username}}
    li
        b Name:
        span {{user.name}}
    li
        b Email:
        span {{user.email}}
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
  data: function () {
      return {
          user: {
              username: ''
          }
      }
  },
  created: function () {
    axios.get(`${config.api}users/${this.$route.params.id}`)
        .then(res => this.user = res.data)
        .catch(err => console.error(err))
  }
}
</script>
