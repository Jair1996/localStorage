const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

eventListeners();

function eventListeners() {
  //Cuando el usuario agrega Tweets
  formulario.addEventListener("submit", agregarTweet);

  //Cuanod el documento está listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    crearHTML();
  });
}

function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;

  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacío");

    return;
  }

  const tweetDB = {
    id: Date.now(),
    tweet,
  };

  tweets = [...tweets, tweetDB];

  crearHTML();

  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const li = document.createElement("li");
      li.textContent = tweet.tweet;

      li.appendChild(btnEliminar);

      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHTML();
}
