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
    footer.post-footer
        router-link(:to="postEditLink", v-if="$auth.state.userId == post.author") Edit
        a(@click="onDelete", v-if="$auth.state.userId == post.author") Delete
</template>

<script>
import config from '@/config'
import axios from 'axios'
import User from '@/components/User'

export default {
    props: [
        'post',
        'deleteRedirect'
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
    methods: {
        onDelete: function () {
            axios.delete(`${config.api}posts/${this.post._id}`)
                .then(res => {
                    if (this.deleteRedirect) {
                        this.$router.push(this.deleteRedirect);
                    } else {
                        this.$router.go(this.$router.history.current);
                    }
                })
                .catch(err => console.error(err));            
        }
    },
    computed: {
        detailsUrl: function () {
            return `/posts/${this.post._id}`;
        },
        authorUrl: function () {
            return `/users/${this.post.author}`;
        },
        postEditLink: function () {
            return `/posts/${this.post._id}/edit`;
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
.post > header {
    text-align: center;
}

.post > header > h2 {
    margin-bottom: 0.25em;
}

.post > section {
    text-align: left;
    white-space: pre;
}

.post > section hr {
    margin: 1em 0;
}

.post > footer {
    margin-top: 0.3em;
    text-align: center;
}

.post > footer > * {
    margin-right: 0.4em;
    font-size: 0.8em;
}

.post > hr {
    clear: left;
}
</style>