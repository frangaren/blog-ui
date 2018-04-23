<template lang="pug">
form#comment-editor(@submit="onSubmit")
    label Username:&nbsp;
    input(required, type="text", v-model="newUser.username", 
        pattern="[A-Za-z0-9_]{3,16}")
    br  
    label Email:&nbsp;
    input(required, type="email", v-model="newUser.email")
    br
    label Name:&nbsp;
    input(required, v-model="newUser.name")
    br
    label Password:&nbsp;
    input(required, v-model="newUser.password", 
        @change="validatePassword")
    br
    .error
        slot
    button(type="submit") Save
</template>

<script>
import config from '@/config'
import axios from 'axios'
import User from '@/components/User'

export default {
    data: function() {
        return {
            newUser: {
                username: "",
                email: "",
                name: "",
                password: ""
            }
        }
    },
    props: [
        'user'
    ],
    created: function () {
        this.newUser = this.user;
    },
    watch: {
        user: function () {
            this.newUser = this.user;
        }
    },
    methods: {
        onSubmit: function () {
            this.$emit('submit', this.newUser);
        },
        validatePassword: function (event) {
            const elem = event.target;
            const lowercaseLetters = /[a-z]/g.test(elem.value);
            const uppercaseLetters = /[A-Z]/g.test(elem.value);
            const numbers = /[0-9]/g.test(elem.value);
            const symbols = /[^A-Z0-9a-z]/g.test(elem.value);
            const length = elem.value.length;
            if (lowercaseLetters && uppercaseLetters && numbers && symbols && length >= 8) {
                elem.setCustomValidity('');
            } else {
                elem.setCustomValidity('Passwords must have at least 8' +
                    ' characters: 1 lowercase letter, 1 uppercase letter, 1' + 
                    ' number and 1 symbol.');
            }
        }
    }
}
</script>

<style>
#user-editor {
    text-align: left;
}
.error {
    color: red;
}
</style>