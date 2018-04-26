<template lang="pug">
nav(id="navbar")
    router-link(to="/") Home
    router-link(to="/users") Users
    router-link(to="/posts") Posts
    router-link(to="/comments") Comments
    router-link(to="/users/create", v-if="!$auth.state.logged") Register
    router-link(to="/users/login", v-if="!$auth.state.logged") Login
    a(to="/users/login", v-if="$auth.state.logged", @click="onLogout") Logout
</template>

<script>
export default {
    methods: {
        onLogout: function () {
            this.$auth.logout();
        }
    }
}
</script>

<style>
#navbar {
    width: 100%;
    padding: .3em 0;
    font-size: 1.4em;
    text-align: center;
    background: #444;
    color: #fff;
}

#navbar > a {
    margin: 0 .5em;
    color: #fff;
    text-decoration: none;
}

#navbar > a:hover {
    text-decoration: underline;
}

.router-link-exact-active {
    font-weight: bold;
}
</style>
