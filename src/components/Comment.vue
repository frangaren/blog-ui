<template lang="pug">
article.comment
    header
        user(:user="author").author
        .
            &nbsp;:~
        time {{creationDateString}}
    section {{comment.text}}
</template>

<script>
import config from '@/config'
import axios from 'axios'
import User from '@/components/User'

export default {
    data: function() {
        return {
            author: {}
        }
    },
    props: [
        'comment'
    ],
    created: function () {
        if (this.comment) {
            axios.get(`${config.api}users/${this.comment.author}`)
                .then(res => this.author = res.data)
                .catch(err => console.error(err));
        }
    },
    watch: {
        comment: function () {
            axios.get(`${config.api}users/${this.comment.author}`)
                .then(res => this.author = res.data)
                .catch(err => console.error(err));
        }
    },
    computed: {
        creationDateString: function () {
            const date = new Date(this.comment.creationDate);
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
.comment {
    margin-bottom: 1em;
}

.comment > header .author{
    float: left;
    font-weight: bold;
}

.comment > header time {
    float: right;
    font-size: 0.8em;
    margin-top: 0.4em;
}
</style>

