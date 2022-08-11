import * as Vue from './vue.js';

const UserDetail = {
    props: ['student'],
    methods: {
        onCloseButtonClick() {
            console.log('UserDetail:onCloseButtonClick');
            this.$emit('close');
        },
    },
    template: `
    <section class="user-detail">
    <h2>Current User: {{ student.name }}</h2>
    <p> {{ student.bio }} </p>
    
    <button v-on:click="onCloseButtonClick">Close Detail</button>
    
    </section>
    `,
};

const app = Vue.createApp({
    components: {
        'user-detail': UserDetail,
    },

    methods: {
        onImageClick(x) {
            console.log('App:onImageClick', x);
            this.currentUser = x;
        },

        onDetailClose() {
            console.log('App:onDetailClose');
            this.currentUser = null;
        },
    },
    mounted() {
        fetch('/users.json')
            .then((response) => response.json())
            .then((data) => {
                this.users = data;
            });
    },
    data() {
        return {
            users: [],
            currentUser: null,
        };
    },
});

app.mount('#main');
