import CommentsList from './comments-list.js';

const imageModal = {
    props: ['image_id', 'first_id'], // for index.html instance

    data() {
        return {
            title: '',
            description: '',
            username: '',
            created_at: '',
            url: '',
            previous_id: null,
            next_id: null,
            btnPre: true,
            btnNext: true,
        };
    },

    methods: {
        onCloseButtonClick() {
            console.log('imageModal:onCloseButtonClick');
            this.$emit('close');
        },

        onPreButtonClick() {
            console.log('imageModal:onPreButtonClick');
            this.$emit('pre', this.previous_id);
        },

        onNextButtonClick() {
            console.log('imageModal:onNextButtonClick');
            this.$emit('next', this.next_id);
        },

        fetchData() {
            fetch(`/images/${this.image_id}`)
                .then((response) => response.json())
                .then(([data, previousID, nextID]) => {
                    this.title = data.title;
                    this.url = data.url;
                    this.description = data.description;
                    this.username = data.username;
                    this.created_at = data.created_at;

                    console.log('image_id', this.image_id);
                    if (this.image_id <= 1) {
                        this.btnNext = false;
                        this.btnPre = true;
                    } else if (this.image_id >= this.first_id) {
                        this.btnNext = true;
                        this.btnPre = false;
                    } else {
                        this.btnNext = true;
                        this.btnPre = true;
                    }
                    console.log('first_id', this.first_id);

                    this.previous_id = previousID.id;

                    // console.log('previous_id', this.previous_id);
                    // if (this.previous_id > this.first_id) {
                    //     this.btnPre = 'btn_hidden';
                    // }

                    this.next_id = nextID.id;
                    // console.log('next_id', this.next_id);
                    // if (this.next_id <= 1) {
                    //     this.btnNext = 'btn_hidden';
                    // }
                })
                .catch(() => {
                    console.log('no image found');
                    history.replaceState({}, '', `/`);
                });
        },
    },

    components: {
        'comments-list': CommentsList,
    },

    mounted() {
        console.log('image-modal mounted -> fetch some data by image_id');

        this.fetchData();
    },

    watch: {
        image_id: function () {
            console.log('image id changed!!!!!');
            this.fetchData();
        },
    },

    computed: {
        formattedDate() {
            const date = new Date(this.created_at);
            return date.toLocaleDateString();
        },
    },

    template: `
        <section class="image-modal">
            <nav>
            <button v-if="btnPre" v-on:click="onPreButtonClick">Previous Modal</button>
            <button v-if="btnNext"  v-on:click="onNextButtonClick">Next Modal</button>
            </nav>

            <div class="container">
            <img v-bind:src="url">
            <div class="info">
            <figcaption> <strong>{{title}}</strong> </figcaption>
            <p>{{description}}</p>

            <p>
            Uploaded by {{ username }}
            on <time>{{ formattedDate }}</time>
            </p>
            </div>
            </div>

            <button v-on:click="onCloseButtonClick">Close Modal</button>

            <comments-list :image_id="image_id"></comments-list>
            
            
        </section>
    `,
};

export default imageModal;
