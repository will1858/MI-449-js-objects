// ----
// DATA
// ----
var rbutton = document.getElementById('remember')
var dbutton = document.getElementById('delete')
// A couple jokes to start with

var jokesstring = window.localStorage.getItem('jokes')
var jokes = JSON.parse(jokesstring)
if (jokes === null) {
  jokes = {
    'the horse': {
      setup: 'A horse walks into the bar. The bartender asks...',
      punchline: 'Why the long face?'
    },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
}

var strigified = JSON.stringify(jokes)
window.localStorage.setItem('jokes', strigified)

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (jokes[requestedJokeKey]) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeKey]['setup'] + '</p>' + '<p>' + jokes[requestedJokeKey]['punchline'] + '</p>'
  } else {
    jokeBox.innerHTML = '<p> No matching joke found.</p>'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
rbutton.addEventListener('click', function () {
  var about = document.getElementById('about').value
  var newset = document.getElementById('newsetup').value
  var newpunch = document.getElementById('newpunch').value
  jokes[about] = {}
  jokes[about]['setup'] = newset
  jokes[about]['punchline'] = newpunch
  var strigified = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', strigified)
  updatePage()
})

dbutton.addEventListener('click', function () {
  var del = document.getElementById('keydel').value
  if (jokes[del]) {
    delete jokes[del]
  }
  var strigified = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', strigified)
  updatePage()
})
