import CommentsList from './comments-list.js';

const imageModal = {
    props: ['image_id'], // for index.html instance

    data() {
        return {
            title: '',
            description: '',
            username: '',
            created_at: '',
            url: '',
        };
    },

    methods: {
        onCloseButtonClick() {
            console.log('imageModal:onCloseButtonClick');
            this.$emit('close');
        },
    },

    components: {
        'comments-list': CommentsList,
    },

    mounted() {
        console.log('image-modal mounted -> fetch some data by image_id');
        // console.log('image_id', this.image_id);
        fetch(`/images/${this.image_id}`)
            .then((response) => response.json())
            .then((data) => {
                this.title = data.title;
                this.url = data.url;
                this.description = data.description;
                this.username = data.username;
                this.created_at = data.created_at;
            })
            .catch(() => {
                console.log('no image found');
                history.replaceState({}, '', `/`);
            });
    },

    template: `
        <section class="image-modal">
            <img v-bind:src="url">
            <figcaption> {{title}} </figcaption>
            <p>{{description}}</p>
            <p>Uploaded by {{username}} on {{ created_at }} </p>
            <button v-on:click="onCloseButtonClick">Close Modal</button>

            <comments-list :image_id="image_id"></comments-list>
            
            
        </section>
    `,
};

export default imageModal;
