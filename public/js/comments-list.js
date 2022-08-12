const CommentsList = {
    props: ['image_id'],

    data() {
        return {
            comments: [],
        };
    },

    mounted() {
        console.log('fetch comments');
        fetch(`/images/:{{this.image_id}}/comments`).then(
            (comments) => (this.comments = comments)
        );
    },

    // methods: {
    //     onFromSubmit(event) {
    //         console.log('CommentsList:onFromSubmit');
    //         event.preventDefault();
    //         fetch(`/images/:{{this.image_id}}/comments`, {
    //             method: 'POST',
    //             ...
    //         });
    //     },

    //     v-on:submit="onFromSubmit",
    // },

    template: `
    <div class="comments">
        <p>Add a comment!</p>
        <form >
            <input type="text" name="comment" placeholder="Comment">
            <input type="text" name="username" placeholder="Username">
            <button>Submit</button>
        </form>

        <p>the latest comment...</p>
        <p> {{comments}} </p>
    </div>
    `,
};

export default CommentsList;
