const { createApp } = Vue
const app = createApp({
    data() {
        return {
            tarjetasFarmacia: [],
            todasLasTarjetas: [],
            favoritos: [],
            productosFiltrados: [],
            valorBusqueda: '',
            listaModalDetalles: []
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let separadorPorCategoria = data.filter(elemento => elemento.categoria == "farmacia")
                this.todasLasTarjetas = data
                this.tarjetasFarmacia = separadorPorCategoria
                this.productosFiltrados = this.tarjetasFarmacia
                this.getData()
            }
            )
            .catch(err => console.log(err))
        this.favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
    },
    methods: {
        borrarFavoritos() {
            this.favoritos = []
        },
        mostrarDetails(valor) {
            for (let i of this.tarjetasFarmacia) {
                if (valor == i.producto) {
                    this.listaModalDetalles = i
                }
            }
        }
    },
    computed: {
        filtro() {
            this.productosFiltrados = this.tarjetasFarmacia.filter(tarjeta => tarjeta.producto.toLowerCase().includes(this.valorBusqueda.toLowerCase()))
        },
        handleFav() {
            localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
        },
        sumarPrecios() {
            let contador = 0
            for (let i of this.todasLasTarjetas) {
                if (this.favoritos.includes(i.producto)) {
                    contador += i.precio
                }
            }
            return contador
        },
    }
})

app.mount('#app')