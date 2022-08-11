import * as Vue from './vue.js';

// components
const imageModal = {
    props: ['image'],
    methods: {
        onCloseButtonClick() {
            console.log('imageModal:onCloseButtonClick');
            this.$emit('close');
        },
    },
    template: `
        <section class="image-modal">
            <img v-bind:src="image.url">
            <figcaption> {{image.title}} </figcaption>
            <p>{{image.description}}</p>
            <p>Uploaded by {{image.username}} on created time (add later)</p>
            <button v-on:click="onCloseButtonClick">Close Modal</button>

        </section>
    `,
};

Vue.createApp({
    components: {
        'image-modal': imageModal,
    },

    data() {
        return {
            images: [],
            title: '',
            description: '',
            username: '',
            file: null,
            currentImage: null,
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

        onImageClick(image) {
            console.log('App:onImageClick', image);
            this.currentImage = image;
        },

        onModalClose() {
            console.log('App:onModalClose');
            this.currentImage = null;
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
