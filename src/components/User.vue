<template lang="pug">
span.user
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
</style>