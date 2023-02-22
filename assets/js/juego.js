(() => {
     let cards = [];
     const palos = ['C', 'D', 'H', 'S'];
     const figuras = ['Q', 'J', 'K', 'A'];

     const botonNuevoJuego = document.getElementById('botonNuevoJuego');
     const botonPedirCarta = document.getElementById('botonPedir');
     const botonPasar = document.getElementById('botonPasar');
     const contenedoresCartas = document.querySelectorAll('.jugador__cartas');
     const contenedoresPuntuacion =
          document.querySelectorAll('.jugador__puntos');

     let puntuaciones = [0, 0];

     const inicializarJuego = () => {
          cards = [];
          botonPedirCarta.removeAttribute('disabled');
          botonPasar.removeAttribute('disabled');
          contenedoresCartas.forEach(
               (contenedor) => (contenedor.innerHTML = '')
          );
          contenedoresPuntuacion.forEach(
               (contenedor) => (contenedor.innerText = 0)
          );
          puntuaciones = [0, 0];
     };

     const initGame = function () {
          inicializarJuego();

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
     };

     const pedir = (jugador0ordenador1) => {
          let card = cards.pop();
          mostrarCarta(card, jugador0ordenador1);
          puntuar(card, jugador0ordenador1);
          return card;
     };

     const mostrarCarta = (carta, jugador0ordenador1) => {
          const img = document.createElement('img');
          img.src = `assets/img/cartas/${carta}.png`;
          img.classList = ['carta'];
          contenedoresCartas[jugador0ordenador1].append(img);
     };

     const puntuar = function (carta, jugador0ordenador1) {
          puntuaciones[jugador0ordenador1] += +getValor(carta);
          contenedoresPuntuacion[jugador0ordenador1].innerText =
               puntuaciones[jugador0ordenador1];
          isBiggerThan21(jugador0ordenador1)
               ? (jugador0ordenador1 = 0 ? alertLoose() : null)
               : isBlackJack(jugador0ordenador1)
               ? cambiarTurno()
               : null;
     };

     const isBiggerThan21 = (jugador0ordenador1) => {
          return puntuaciones[jugador0ordenador1] > 21;
     };

     const isBlackJack = (jugador0ordenador1) => {
          return puntuaciones[jugador0ordenador1] == 21;
     };

     const getValor = (carta) => {
          let valor = carta.substring(0, carta.length - 1);

          return !isNaN(valor) ? valor : valor === 'A' ? 11 : 10;
     };

     const cambiarTurno = () => {
          bloquearBotones();
          turnoOrdenador();
     };

     const turnoOrdenador = () => {
          let contador = 1
          do {
               pedir(1);
          } while (seguirJugando());
          setTimeout(() => {
               showResult();
          }, 100);
     };

     const showResult = () => {
          if (isBiggerThan21(1) || puntuaciones[1] < puntuaciones[0]) {
               alertWin();
               return;
          }
          if (puntuaciones[1] > puntuaciones[0]) {
               alertLoose();
               return;
          }
          if ((puntuaciones[1] = puntuaciones[0])) {
               alertEmpate();
          }
     };

     const seguirJugando = () => {
          return puntuaciones[1] < 15 || puntuaciones[1] < puntuaciones[0];
     };

     const alertLoose = () => {
          bloquearBotones();
          alert('You loose');
     };
     const alertWin = () => {
          bloquearBotones();
          alert('You win');
     };
     const alertEmpate = () => {
          bloquearBotones();
          alert('Empatados!');
     };

     const bloquearBotones = () => {
          botonPedirCarta.setAttribute('disabled', 'true');
          botonPasar.setAttribute('disabled', 'true');
     };

     // EVENTS
     botonPedirCarta.addEventListener('click', () => {
          pedir(0);
     });

     botonPasar.addEventListener('click', () => {
          cambiarTurno();
     });

     botonNuevoJuego.addEventListener('click', () => {
          initGame();
     });

     //ejecucion
     initGame();
})();
