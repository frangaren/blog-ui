'use strict';

import Vue from 'vue'
import axios from 'axios'
import config from '@/config'

export default {
    install: function () {
        Vue.prototype.$auth = {
            storeInstance: new Vue({
                created: function () {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.accessToken;
                },
                data: {
                    logged: sessionStorage.getItem('logged') ||  false,
                    accessToken: sessionStorage.getItem('accessToken') || '',
                    refreshToken: sessionStorage.getItem('refreshToken') || '',
                    userId: sessionStorage.getItem('userId') || ''
                },
                watch: {
                    logged: function () {
                        sessionStorage.setItem('logged', this.logged);
                    },
                    accessToken: function () {
                        sessionStorage.setItem('accessToken', this.accessToken);
                        if (this.accessToken == '') {
                            delete axios.defaults.headers.common['Authorization'];
                        } else {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.accessToken;
                        }
                    },
                    refreshToken: function () {
                        sessionStorage.setItem('refreshToken', this.refreshToken);
                    },
                    userId: function () {
                        sessionStorage.setItem('userId', this.userId);
                    }
                }
            }),
            get state () {
                return this.storeInstance.$data;
            },
            login: function (username, password) {
                let payload = {
                    grant_type: 'password',
                    username: username,
                    password: password
                };
                return axios.post(`${config.api}auth/token`, payload)
                        .then(reply => {
                            this.state.logged = true;
                            this.state.accessToken = reply.data.access_token;
                            this.state.refreshToken = reply.data.refresh_token;
                            this.state.userId = reply.data._id;
                        });
            },
            logout: function () {
                this.state.logged = false;
                this.state.accessToken = '';
                this.state.refreshToken = '';
                this.state.userId = '';                
            }
        };
        console.log('asdf');
    }
}