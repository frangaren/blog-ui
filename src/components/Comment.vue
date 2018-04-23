<template lang="pug">
article.comment
    header
        span.comment-info-left
            user(:user="author", v-if="showAuthor")
            span(v-if="showAuthor && showPost") &nbsp;at&nbsp;
            span(v-if="showPost")
                router-link(:to="postLink") "{{post.title}}"
            .
                &nbsp;:~
        time {{creationDateString}}
    section.comment-body {{comment.text}}
    footer.comment-footer
        router-link(:to="commentDetailsLink") View
        router-link(:to="commentEditLink") Edit
        a(@click="onDelete") Delete
</template>

<script>
import config from '@/config'
import axios from 'axios'
import User from '@/components/User'

export default {
    data: function() {
        return {
            author: {},
            post: {}
        }
    },
    props: [
        'comment',
        'showAuthor',
        'showPost',
        'deleteRedirect'
    ],
    created: function () {
        if (this.comment) {
            if (this.showAuthor && this.comment.author) {
                axios.get(`${config.api}users/${this.comment.author}`)
                    .then(res => this.author = res.data)
                    .catch(err => console.error(err));
            }
            if (this.showPost && this.comment.post) {
                axios.get(`${config.api}posts/${this.comment.post}`)
                    .then(res => this.post = res.data)
                    .catch(err => console.error(err));
            }
        }
    },
    methods: {
        onDelete: function () {
            axios.delete(`${config.api}comments/${this.comment._id}`)
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
    watch: {
        comment: function () {
            if (this.showAuthor) {
                axios.get(`${config.api}users/${this.comment.author}`)
                    .then(res => this.author = res.data)
                    .catch(err => console.error(err));
            }
            if (this.showPost) {
                axios.get(`${config.api}posts/${this.comment.post}`)
                    .then(res => this.post = res.data)
                    .catch(err => console.error(err));
            }
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
        },
        postLink: function () {
            return `/posts/${this.comment.post}`;
        },
        commentDetailsLink: function () {
            return `/comments/${this.comment._id}`;
        },
        commentEditLink: function () {
            return `/comments/${this.comment._id}/edit`;
        }
    },
    components: {
        user: User
    }
}
</script>

<style>
.comment {
    margin-bottom: 2em;
}

.comment > header .comment-info-left {
    float: left;
    font-weight: bold;
}

.comment > header time {
    float: right;
    font-size: 0.8em;
    margin-top: 0.4em;
}

.comment > section.comment-body {
    clear: left;
}

.comment > footer {
    margin-top: 0.2em;
    clear: left;
}

.comment > footer > * {
    float: left;
    margin-right: 0.4em;
    font-size: 0.8em;
}
</style>

