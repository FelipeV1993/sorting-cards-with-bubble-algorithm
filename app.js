let cartasArray = [];
const sort = "sort";
const sinSort = "sinSort";
const numeroDeCartas = document.querySelector("#numeroDeCartas");
const mostrar = document.querySelector("#repartir");
const ordenar = document.querySelector("#ordenar");
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const tipoCarta = ["corazon", "diamante", "espada", "trebol"];

const clearSortedContainer = () => {
  let cardsContainerSorted = document.querySelector(".cards-sorted-container");
  while (cardsContainerSorted.firstChild) {
    cardsContainerSorted.removeChild(cardsContainerSorted.firstChild);
  }
};

const cartas = () => {
  const cartas = [];
  for (let i = 0; i < tipoCarta.length; i++) {
    for (let u = 0; u < values.length; u++) {
      const pinta = tipoCarta[i];
      const numero = values[u];
      cartas.push({ numero, pinta });
    }
  }
  return cartas;
};

// class Carta {
//   constructor(numero, pinta) {
//     this.pinta = pinta;
//     this.numero = numero;
//   }
// }

function numeroRandom() {
  return Math.floor(Math.random() * 51);
}

function numeroCartasRandom(numeroDeCartas) {
  let cartasArray = [];
  for (let i = 0; i < numeroDeCartas; i++) {
    let carta = [];
    carta.pinta = cartas()[numeroRandom()].pinta;
    carta.numero = cartas()[numeroRandom()].numero;
    cartasArray.push(carta);
  }
  return cartasArray;
  // cartaPinta === "&diams;"
  //   ? (icono = `&diams;`)
  //   : cartaPinta === "&hearts;"
  //   ? (icono = `&hearts;`)
  //   : cartaPinta === "&spades;"
  //   ? (icono = `&spades;`)
  //   : cartaPinta === "&clubs;"
  //   ? (icono = ` &clubs;`)
  //   : (icono = "error");
  // const carta = document.createElement("div");
  // carta.classList.add("carta", cartaPinta.toLowerCase());
  // carta.innerHTML =
  //   '<span class="carta-numero-pinta top">' +
  //   cartaNumero +
  //   icono +
  //   "</span>" + //por alguna razon los iconos de espada y trebol de fontawesome no cargan
  //   '<span class="carta-pinta">' +
  //   cartaNumero +
  //   "</span>" +
  //   '<span class="carta-numero-pinta bot">' +
  //   cartaNumero +
  //   icono +
  //   "</span>";
  // document.body.appendChild(carta);
  // console.log(listaDeCartas)
  // return listaDeCartas
}
const crearCarta = (carta) => {
  let cartaNumero = carta.numero;
  let cartaPinta = carta.pinta;
  let valor;
  cartaNumero === 1
    ? (valor = "A")
    : cartaNumero === 11
    ? (valor = "J")
    : cartaNumero === 12
    ? (valor = "Q")
    : cartaNumero === 13
    ? (valor = "k")
    : (valor = cartaNumero);
  let icono;
  cartaPinta === "diamante"
    ? (icono = `&diams;`)
    : cartaPinta === "corazon"
    ? (icono = `&hearts;`)
    : cartaPinta === "espada"
    ? (icono = `&spades;`)
    : cartaPinta === "trebol"
    ? (icono = ` &clubs;`)
    : (icono = "error");
  return `<div class="carta ${cartaPinta.toLowerCase()}"> 
    <span class="carta-numero-pinta top ${cartaPinta}">${valor + icono}
    </span>
    <span class="carta-pinta">${valor}
    </span> 
    <span class="carta-numero-pinta bot">${valor + icono}
    </span> 
    </div>`;
};

function crearCartas(entradaCarta, parametro,filaNumero) {
  const contenedor = document.querySelector("#contenedor");
  const contenedorSorteado = document.querySelector("#contenedorSorteado");
  let listaDeCartas = "";

  for (let i = 0; i < entradaCarta.length; i++) {
    listaDeCartas += crearCarta(entradaCarta[i]);
  }
  if (parametro == "sinSort") {
    contenedor.innerHTML =
      '<div class="cards-container-row">' + listaDeCartas + "</div>";
  } else {
    contenedorSorteado.innerHTML +=
    '<div class="cards-container-row"><p class="iteration-num">' +
    filaNumero +
    "</p>"+listaDeCartas + "</div>";
  }
}

function cambiar() {
  const contenedor = document.querySelector("#contenedor");
  contenedor.innerHTML = "hola2";
}
// const agregarCarta = (cartasArray, sort, orden) => {
//   let cardsContainer = document.querySelector('.cards-container');
//   let cardsContainerSorted = document.querySelector('.cards-sorted-container');
//   let cardsDOM = '';

//   for (let i = 0; i < cartasArray.length; i++) {
//     cardsDOM += crearCartas(cartasArray[i]);
//   }
//   // If sort is set to false, only displays the cards
//   if (!sort) {
//     cardsContainer.innerHTML = '<div class="cards-container-row">' + cardsDOM + '</div>';
//   } else {
//     // If sort is set to true, sort them
//     cardsContainerSorted.innerHTML +=
//       '<div class="cards-container-sort-row"> <div class="container-iteration-num"> <p class="iteration-num">' +
//       orden +
//       '</p> </div> ' +
//       cardsDOM +
//       ' </div>';
//   }
// };

const bubbleSort = (cartasArray) => {
  let newCardsArr = [...cartasArray];
  let filaNumero = 0
  let wall = newCardsArr.length - 1; //we start the wall at the end of the array
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //compare the adjacent positions, if the right one is bigger, we have to swap
      if (newCardsArr[index].numero > newCardsArr[index + 1].numero) {
        let aux = newCardsArr[index].numero;
        newCardsArr[index].numero = newCardsArr[index + 1].numero;
        newCardsArr[index + 1].numero = aux;
        filaNumero++
        crearCartas(newCardsArr, sort,filaNumero);
      }
      index++;
    }
    wall--; //decrease the wall for optimization
  }
  return cartasArray;
};

// const bubbleSort = (cartasArray) => {
//   let cartasArrayCopy = [...cartasArray];
//   let interaccion = -1;

//   for (let i = 0; i < cartasArrayCopy.length; i++) {
//     for (let j = 0; j < cartasArrayCopy.length - i - 1; j++) {
//       if (values.indexOf(cartasArrayCopy[j].numero) > values.indexOf(cartasArrayCopy[j + 1].numero)) {
//         const cambio = cartasArrayCopy[j + 1];
//         cartasArrayCopy[j + 1] = cartasArrayCopy[j];
//         cartasArrayCopy[j] = cambio;
//         interaccion++;
//         // agregarCarta(cartasArrayCopy, true, interaccion);
//       }
//     }
//   }

//   if (interaccion == -1) {
//     agregarCarta(cartasArrayCopy, true, 0);
//   }

//   return cartasArrayCopy;
// };

// crearCartas(cartasArray);
// bubbleSort(cartasArray);
// console.log(bubbleSort(cartasArray));
// console.log(cartas);
// console.log(cartasArray);

mostrar.addEventListener("click", () => {
  let cantidadDeCartas = numeroDeCartas.value;
  console.log(cantidadDeCartas);
  cartasArray = numeroCartasRandom(cantidadDeCartas);
  console.log(cartasArray);
  crearCartas(cartasArray, sinSort);
  return cartasArray;
});

ordenar.addEventListener("click", () => {
  console.log(cartasArray);
  clearSortedContainer();
  bubbleSort(cartasArray);
  console.log(bubbleSort(cartasArray));
});
