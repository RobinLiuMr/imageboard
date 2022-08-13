const CommentsList = {
    props: ['image_id'], // for image-modal instance

    data() {
        return {
            comments: [],
            text: '',
            username: '',
        };
    },

    mounted() {
        console.log('CommentsList mounted -> fetch comments data');
        fetch(`/images/${this.image_id}/comments`)
            .then((response) => response.json())
            .then((data) => (this.comments = data));
    },

    methods: {
        onFromSubmit(event) {
            console.log('CommentsList:onFromSubmit');
            event.preventDefault();
            fetch(`/images/${this.image_id}/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    text: this.text,
                    username: this.username,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((newComment) => {
                    this.comments = [newComment, ...this.comments];
                })
                .catch((error) => console.log('post comment error', error));
        },
    },

    template: `
    <div class="comments">
        <p>Add a comment!</p>
        <form v-on:submit="onFromSubmit">
            <input type="text" name="text" required placeholder="Comment" v-model="text">
            <input type="text" name="username" required placeholder="Username" v-model="username">
            <button>Submit</button>
        </form>

        <p>The latest comment</p>
        <div v-for="comment in comments">
        <p>{{comment.text}}</p>
        <p>{{comment.username}} on {{comment.created_at}}</p>
        </div>
        
    </div>
    `,
};

export default CommentsList;
