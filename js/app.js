const form = document.getElementById("formulario");
const listTweets = document.getElementById("lista-tweets");
let tweets = [];

const showError = (error) => {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = error;
  errorMessage.classList.add("error");

  const content = document.getElementById("contenido");
  content.appendChild(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
};

const clearHMTL = () => {
  while (listTweets.firstChild) {
    listTweets.removeChild(listTweets.firstChild);
  }
};

const removeTweet = (id) => {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  createHTML();
};

const createHTML = () => {
  clearHMTL();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const btnRemove = document.createElement("a");
      btnRemove.classList.add("borrar-tweet");
      btnRemove.textContent = "X";

      btnRemove.onclick = () => {
        removeTweet(tweet.id);
      };

      const li = document.createElement("li");
      li.textContent = tweet.tweet;

      li.appendChild(btnRemove);

      listTweets.appendChild(li);
    });
  }

  localStorage.setItem("tweets", JSON.stringify(tweets));
};

const addNewTweet = (e) => {
  e.preventDefault();
  const tweet = document.getElementById("tweet");
  const tweetText = tweet.value.trim();
  if (tweetText === "") {
    showError("Un mensaje no puede ir vacío.");
    return;
  }

  const tweetDB = {
    id: Date.now(),
    tweet: tweetText,
  };

  tweets = [...tweets, tweetDB];

  createHTML();

  form.reset();
};

const eventListeners = () => {
  form.addEventListener("submit", addNewTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    createHTML();
  });
};

eventListeners();
