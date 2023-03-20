const { createApp } = Vue
const app = createApp({
    data(){
        return{
            tarjetasJugueteria : [],
            favoritos : [],
            productosFiltrados : [],
            valorBusqueda : ''
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/petshop' )
            .then( response => response.json() )
            .then( data => { 
                let separadorPorCategoria = data.filter(elemento => elemento.categoria == "jugueteria")
                this.tarjetasJugueteria = separadorPorCategoria
                this.productosFiltrados = this.tarjetasJugueteria
                this.getData()
            }
            )
            .catch( err => console.log( err ) )  
            this.favoritos = JSON.parse( localStorage.getItem('favoritos') ) || []
    },
    methods: {
        borrarFavoritos(){
            this.favoritos = []
        },
    },
    computed : {
        filtro(){
            this.productosFiltrados = this.tarjetasJugueteria.filter(tarjeta => tarjeta.producto.toLowerCase().includes(this.valorBusqueda.toLowerCase()))
        },
        handleFav(){
            localStorage.setItem( 'favoritos', JSON.stringify( this.favoritos ) )
        },
        sumarPrecios(){
            let contador = 0
            for (let i of this.tarjetasJugueteria){
                if(this.favoritos.includes(i.producto)){
                    contador += i.precio
                }
            }
            return contador
        }
    }
})

app.mount('#app')
