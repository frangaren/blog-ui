<template lang="pug">
#app
    header
        h1 Blog
        nav-bar
    main
        router-view
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'App',
    components: {
        'nav-bar': NavBar
    }
}
</script>

<style>
body {
    margin: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #444;
    margin-top: 60px;
}

main {
    width: 860px;
    padding-left: 50%;
    margin: 1em -430px;
    font-size: 1.2em;
}
</style>
