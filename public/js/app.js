import * as Vue from './vue.js';
import imageModal from './image-modal.js';

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
            clickedImageId: null,
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
            this.clickedImageId = image.id;
        },

        onModalClose() {
            console.log('App:onModalClose');
            this.clickedImageId = null;
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
