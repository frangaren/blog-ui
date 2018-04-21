<template lang="pug">
.user 
    router-link(:to="detailsUrl") {{user.username}}
</template>

<script>
export default {
    props: [
        'user'
    ],
    computed: {
        detailsUrl: function () {
            return `/users/${this.user._id}`
        }
    }
}
</script>

<style>
.user > a {
    text-decoration: none;
    color: #444;
}

.user > a:hover {
    text-decoration: underline;
}
</style>