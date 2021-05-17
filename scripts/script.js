// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

var currId = 0;
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        currId += 1;
        newPost.entry = entry;
        newPost.numId = currId;
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener('click', () => {
          setState({page: "entry page", id: newPost.numId, entry: entry}, false);
        });
      });
    });
});

document.querySelector("[alt='settings']").addEventListener('click', () => {
  setState({page: "settings"}, false);
});

document.querySelector("h1").addEventListener('click', () => {
  setState({page: "home"}, false);
});

window.onpopstate = function(event) {
  setState(event.state, true);
}

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}