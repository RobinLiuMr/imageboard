import * as Vue from './vue.js';

Vue.createApp({
    data() {
        return {
            images: [],
        };
    },

    methods: {},

    mounted() {
        console.log('mounted -> fetch some data.');
        fetch('/images')
            .then((response) => response.json())
            .then((data) => {
                // console.log('data', data);
                this.images = data;
            })
            .catch((err) => console.log('fetch data error', err));
    },
}).mount('#main');
