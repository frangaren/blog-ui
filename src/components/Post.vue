<template lang="pug">
article(class="post")
    header
        h2
            router-link(:to="detailsUrl") {{post.title}}
        span by 
            user(:user="author")
            .
                &nbsp;at {{creationDateString}}
</template>

<script>
import config from '@/config'
import axios from 'axios'
import User from '@/components/User'

export default {
    props: [
        'post'
    ],
    data: function () {
        return {
            author: {}
        };
    },
    created: function () {
        axios.get(`${config.api}users/${this.post.author}`)
            .then(res => {this.author = res.data; console.log(this.author)})
            .catch(err => console.error(err));
    },
    computed: {
        detailsUrl: function () {
            return `/posts/${this.post._id}`;
        },
        authorUrl: function () {
            return `/users/${this.post.author}`;
        },
        creationDateString: function () {
            const date = new Date(this.post.creationDate);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            return `${month}/${day}/${year} ${hour}:${minutes}`;         
        }
    },
    components: {
        user: User
    }
}
</script>

<style>
.post > header > h2 {
    margin-bottom: 0.25em;
}

.author {
    font-style: italic;
}
</style>