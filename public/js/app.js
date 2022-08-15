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
            clickedImageId: location.pathname.slice(1),
            btnMoreImages: 'btn_show',
            firstID: null,
            lastID: null,
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
            history.pushState({}, '', `/${this.clickedImageId}`);
        },

        onModalClose() {
            console.log('App:onModalClose');
            this.clickedImageId = null;
            history.pushState({}, '', `/`);
        },

        onModalPre(ID) {
            console.log('App:onModalPre');
            this.clickedImageId = ID;
            history.pushState({}, '', `/${this.clickedImageId}`);
        },

        onModalNext(ID) {
            console.log('App:onModalNext');
            this.clickedImageId = ID;
            history.pushState({}, '', `/${this.clickedImageId}`);
        },

        onLoadMoreButtonClick() {
            fetch(`/more-images?limit=3&lastID=${this.lastID}`)
                .then((response) => response.json())
                .then((newImages) => {
                    this.images = [...this.images, ...newImages];
                    this.lastID -= 3;
                    // console.log('lastID', this.lastID);
                    if (this.lastID <= 1) {
                        this.btnMoreImages = 'btn_hidden';
                        return;
                    }
                });
        },
    },

    mounted() {
        console.log('mounted -> fetch some data.');

        fetch('/images')
            .then((response) => response.json())
            .then((data) => {
                // console.log('data', data);
                this.images = data;
                this.lastID = this.images[this.images.length - 1].id;
                this.firstID = this.images[0].id;
            })
            .catch((err) => console.log('fetch /images error', err));

        window.addEventListener('popstate', () => {
            // console.log(location.pathname, event.state);
            this.clickedImageId = location.pathname.slice(1);
        });
    },
}).mount('#main');
