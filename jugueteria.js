const { createApp } = Vue;
const url = 'https://mindhub-xj03.onrender.com/api/petshop';
const app = createApp({
    data() {
        return {

        }
    },
    created() {
        fetch(url)
            .then(answer => answer.json())
            .then(data => {

            })
    }
})