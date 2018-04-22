<template lang="pug">
article(class="post")
    header
        h2
            router-link(:to="detailsUrl") {{post.title}}
        span by 
            user(:user="author")
            .
                &nbsp;at {{creationDateString}}
    section
        slot
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
        if ('author' in this.post){
            axios.get(`${config.api}users/${this.post.author}`)
                .then(res => this.author = res.data)
                .catch(err => console.error(err));
        }
    },
    watch: {
        post: function () {
            if (this.author._id !== this.post.author) {
                axios.get(`${config.api}users/${this.post.author}`)
                    .then(res => this.author = res.data)
                    .catch(err => console.error(err));
            }
        }
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
            const minutes = date.getMinutes().toString().padStart(2, '0');
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

.post > section {
    text-align: left;
}

.post > section hr {
    margin: 1em 0;
}
</style>