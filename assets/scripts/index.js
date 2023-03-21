const { createApp } = Vue
const app = createApp({
    data() {
        return {
            todasLasTarjetas:[],
            favoritos : []
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                this.todasLasTarjetas = data
                this.getData()
            }
            )
            .catch( err => console.log( err ) )
            this.favoritos = JSON.parse( localStorage.getItem('favoritos') ) || []      
    },
    methods: {
        borrarFavoritos(){
            this.favoritos = []
        }
    },
    computed : {
        handleFav(){
            localStorage.setItem( 'favoritos', JSON.stringify( this.favoritos ) )
        },
        sumarPrecios(){
            let contador = 0
            for (let i of this.todasLasTarjetas){
                if(this.favoritos.includes(i.producto)){
                    contador += i.precio
                }
            }
            return contador
        },
    }
})

app.mount('#app')