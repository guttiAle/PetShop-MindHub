const { createApp } = Vue
const app = createApp({
    data(){
        return{
            tarjetasJugueteria : [],
            todasLasTarjetas:[],
            favoritos : [],
            productosFiltrados : [],
            valorBusqueda : '',
            listaModalDetalles : []
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/petshop' )
            .then( response => response.json() )
            .then( data => { 
                let separadorPorCategoria = data.filter(elemento => elemento.categoria == "jugueteria")
                this.todasLasTarjetas = data
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
        mostrarDetails(valor){
            // console.log(valor);
            for (let i of this.tarjetasJugueteria){
                if(valor == i.producto){
                    this.listaModalDetalles = i
                }
            }
        }
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
            for (let i of this.todasLasTarjetas){
                if(this.favoritos.includes(i.producto)){
                    contador += i.precio
                }
            }
            return contador
        }
    }
})

app.mount('#app')
