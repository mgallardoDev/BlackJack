let cards = [];
const palos = ['C', 'D', 'H', 'S'];
const figuras = ['Q', 'J', 'K', 'A'];

const botonNuevoJuego = document.getElementById('botonNuevoJuego')
const botonPedirCarta = document.getElementById('botonPedirCarta')
const botonPasar = document.getElementById('botonPasar')
const contenedorCartas = document.querySelectorAll('.jugador__cartas')




let puntuacionJugador = 0,
puntuacionOrdenador = 0;

const generateCards = function () {
    for (i = 2; i <= 10; i++) {
        for (letter of palos) {
            cards.push(i + letter);
        }
     }

     for (figura of figuras) {
          for (letter of palos) {
              cards.push(figura + letter);
            }
        }
        
        cards = _.shuffle(cards);
        
        console.log(cards);
};

const pedir = (jugador1ordenador2) => {
    let card = cards.pop();
    mostrarCarta(card, jugador1ordenador2)
    return card;
};

const mostrarCarta = (carta, jugador1ordenador2) => {
    console.log(contenedorCartas) 
    console.log(jugador1ordenador2) 
    const img = document.createElement('img')
    img.src =`assets/img/cartas/${carta}.png`
    img.classList=["carta"]
    contenedorCartas[jugador1ordenador2].append(img)
}

const getValor = (carta) => {
    let valor = carta.substring(0, carta.length - 1);
    
     return !isNaN(valor) ? valor : valor === 'A' ? 10 : 11;
    };
    
    
// EVENTS

botonNuevoJuego.addEventListener('click', () => {
    pedir(0)
})
    
    generateCards();
 
    
