const { createApp } = Vue
const app = createApp({
    data() {
        return {
            tarjetasFarmacia: []
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let separadorPorCategoria = data.filter(elemento => elemento.categoria == "farmacia")
                this.tarjetasFarmacia = separadorPorCategoria
                console.log(separadorPorCategoria);
            }
            )
        // .catch( err => console.log( err ) )      
    },
    computed: {

    }
})

app.mount('#app')