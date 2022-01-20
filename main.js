"use strict";

/////************************************VARIBLES*************************************************************////

const selectCoins = document.querySelector(".js_input_coins");
const addMoney = document.querySelector(".js_button_coin");
const haveCoins = document.querySelector(".js_have_money");
const leaveButton = document.querySelector(".js_button_leave");
const rest = document.querySelector(".js_rest");
const oneBox = document.querySelector(".js_one_box");
const twoBox = document.querySelector(".js_two_box");
const threeBox = document.querySelector(".js_three_box");
const shoot = document.querySelector(".js_button");
let record = document.querySelector(".js_record");
const note = document.querySelector(".js_note");
let counter = document.querySelector(".js_zero");
let winner = 0;
///////////////////////////////////////////////////ARRAY PRINCIPAL///////////////////////////////////////////////////////////////////////////////////

let array = [
  { name: "aubergine", url: "./images/aubergine.png" },
  { name: "banana", url: "./images/banana.png" },
  { name: "carrots", url: "./images/carrots.png" },
  { name: "cherries", url: "./images/cherries.png" },
  { name: "dollar", url: "./images/dollar.png" },
  { name: "lemon", url: "./images/lemon.png" },
  { name: "orange", url: "./images/orange.png" },
  { name: "peach", url: "./images/peach.png" },
  { name: "potato", url: "./images/potato.png" },
  { name: "tomato", url: "./images/tomato.png" },
];

/////************************************PARA AÑADIR MONEDAS Y DESHABILITAR EL INPUT*************************************************************////
function handleAddMoney(ev) {
  addMoney.classList.remove("parpadea");
  selectCoins.disabled = true;
  ev.preventDefault();

  counter.innerHTML = selectCoins.value;
  selectCoins.value = 0;
  record.innerHTML += `<li> "Has introducido monedas" </li>`;
}
addMoney.addEventListener("click", handleAddMoney);

/////******************************************BOTON DE SALIR CON INFORMACIÓN ********************************************************************/////

function handleLeaveButton(ev) {
  selectCoins.disabled = false;
  record.innerHTML += `<li>Sacas todas las monedas <li>`;
  selectCoins.value = winner + parseInt(counter.innerHTML);

  alert("Has ganado un total de:" + winner + "monedas");
  counter.innerHTML = 0;
  winner = 0;
  ev.preventDefault();
}

leaveButton.addEventListener("click", handleLeaveButton);

/////////////////////////////////////////ESTO ES PARA CONSEGUIR LOS NUMEROS ALEATORIOS PARA CADA UNO DE LOS HUECOS///////////////////////////////////////

function getRandomNumberBox() {
  return Math.random() * 10;
}

/////////////////////////////////////////CUANDO DAS CLICK EN LA PALANCA SE MUEVEN LAS IAMGENES Y LA PALANCA///////////////////////////////////////

function handleShoot(ev) {
  let arrayNumberOneBox = getRandomNumberBox();
  let paintImageOneBox = `<img class="js_one_box" src="${
    array[parseInt(arrayNumberOneBox)].url
  }" />`;

  let arrayNumberTwoBox = getRandomNumberBox();
  let paintImageTwoBox = `<img class="js_two_box" src="${
    array[parseInt(arrayNumberTwoBox)].url
  }" />`;

  let arrayNumberThreeBox = getRandomNumberBox();
  let paintImageThreeBox = `<img class="js_three_box" src="${
    array[parseInt(arrayNumberThreeBox)].url
  }" />`;

  oneBox.style.backgroundImage = `url("${
    array[parseInt(arrayNumberOneBox)].url
  }")`;
  twoBox.style.backgroundImage = `url("${
    array[parseInt(arrayNumberTwoBox)].url
  }")`;
  threeBox.style.backgroundImage = `url("${
    array[parseInt(arrayNumberThreeBox)].url
  }")`;
}
function mouseDown() {
  shoot.classList.add("backgroundDOWN");
}
function mouseUp() {
  shoot.classList.remove("backgroundDOWN");
}
shoot.addEventListener("mousedown", mouseDown);
shoot.addEventListener("mouseup", mouseUp);

/////////////////////////////////////////PARA QUE CUANDO DE CLICK RESTE UNA MONEDA///////////////////////////////////////////////////////////////

function handleRemoveCoin(value) {
  let removeCoin = counter.innerHTML;

  if (removeCoin > 0) {
    counter.innerHTML = counter.innerHTML - 1;
    handleShoot();
    handleRecord();
  } else {
    alert("Por favor introduce monedas");
    selectCoins.disabled = false;
  }
}
shoot.addEventListener("click", handleRemoveCoin);

///////////////////////////////////////////////////////////////PARA QUE AÑADA EL HISTORIAL///////////////////////////////////////////////////////////////

function handleRecord(ev) {
  record.innerHTML += `<li>Gastas una moneda</li>`;

  if (
    (oneBox.style.backgroundImage.includes(array[4].url) &&
      !twoBox.style.backgroundImage.includes(array[4].url) &&
      !threeBox.style.backgroundImage.includes(array[4].url)) ||
    (!oneBox.style.backgroundImage.includes(array[4].url) &&
      twoBox.style.backgroundImage.includes(array[4].url) &&
      !threeBox.style.backgroundImage.includes(array[4].url)) ||
    (!oneBox.style.backgroundImage.includes(array[4].url) &&
      !twoBox.style.backgroundImage.includes(array[4].url) &&
      threeBox.style.backgroundImage.includes(array[4].url))
  ) {
    winner += 1;
    record.innerHTML += `<li>¡Una MONEDA! Ganas 1 moneda.</li>`;
  } else if (
    (oneBox.style.backgroundImage.includes(array[4].url) &&
      twoBox.style.backgroundImage.includes(array[4].url) &&
      !threeBox.style.backgroundImage.includes(array[4].url)) ||
    (oneBox.style.backgroundImage.includes(array[4].url) &&
      !twoBox.style.backgroundImage.includes(array[4].url) &&
      threeBox.style.backgroundImage.includes(array[4].url)) ||
    (!oneBox.style.backgroundImage.includes(array[4].url) &&
      twoBox.style.backgroundImage.includes(array[4].url) &&
      threeBox.style.backgroundImage.includes(array[4].url))
  ) {
    winner += 4;
    record.innerHTML += `<li>¡Dos MONEDAS! Ganas 4 monedas.</li>`;
  } else if (
    oneBox.style.backgroundImage.includes(array[4].url) &&
    twoBox.style.backgroundImage.includes(array[4].url) &&
    !threeBox.style.backgroundImage.includes(array[4].url)
  ) {
    winner += 10;
    record.innerHTML += `<li>¡Tres MONEDAS! Ganas 10 monedas.</li>`;
  } else if (
    (oneBox.style.backgroundImage === twoBox.style.backgroundImage &&
      !threeBox.style.backgroundImage.includes(array[4].url)) ||
    (!oneBox.style.backgroundImage.includes(array[4].url) &&
      twoBox.style.backgroundImage === threeBox.style.backgroundImage) ||
    (oneBox.style.backgroundImage === threeBox.style.backgroundImage &&
      !twoBox.style.backgroundImage.includes(array[4].url))
  ) {
    winner += 2;
    record.innerHTML += `<li>¡Dos HORTALIZAS O FRUTAS iguales! Ganas 2 monedas.</li>`;
  } else if (
    oneBox.style.backgroundImage === twoBox.style.backgroundImage &&
    oneBox.style.backgroundImage === threeBox.style.backgroundImage &&
    twoBox.style.backgroundImage === threeBox.style.backgroundImage
  ) {
    winner += 5;
    record.innerHTML += `<li>¡Tres HORTALIZAS O FRUTAS iguales! Ganas 5 monedas.</li>`;
  } else if (
    (oneBox.style.backgroundImage === twoBox.style.backgroundImage &&
      threeBox.style.backgroundImage.includes(array[4].url)) ||
    (oneBox.style.backgroundImage.includes(array[4].url) &&
      twoBox.style.backgroundImage === threeBox.style.backgroundImage) ||
    (oneBox.style.backgroundImage === threeBox.style.backgroundImage &&
      twoBox.style.backgroundImage.includes(array[4].url))
  ) {
    winner += 3;
    record.innerHTML += `<li>¡Dos HORTALIZAS O FRUTAS iguales más una MONEDA! Ganas 3 monedas.</li>`;
  }
}
