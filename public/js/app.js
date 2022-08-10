import * as Vue from './vue.js';

Vue.createApp({
    data() {
        return {
            images: [],
            title: '',
            description: '',
            username: '',
            file: null,
        };
    },

    methods: {
        handleSubmit() {
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('username', this.username);

            fetch('/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((newImage) => {
                    this.images = [newImage, ...this.images];
                })
                .catch((error) => console.log('fetch /upload error', error));
        },

        handleFileChange(event) {
            this.file = event.target.files[0];
        },
    },

    mounted() {
        console.log('mounted -> fetch some data.');
        fetch('/images')
            .then((response) => response.json())
            .then((data) => {
                // console.log('data', data);
                this.images = data;
            })
            .catch((err) => console.log('fetch /images error', err));
    },
}).mount('#main');
