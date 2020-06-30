# VUTTR-CHARLIETZU

<p align="center">
  <a href="https://www.linkedin.com/in/caio-c%C3%A9sar-silva-1aa8b7101/" target="_blank">
    <img alt="Developed by: Caio César" src="https://img.shields.io/badge/developed%20by-Caio%20C%C3%A9sar-blueviolet">
  </a>
  <a href="https://github.com/Charlietzu" target="_blank" >
    <img alt="Github - Charlietzu" src="https://img.shields.io/badge/GitHub-Charlietzu-blueviolet">
  </a>
</p>

This repository contains a Tool management application using React and makes requests for a third-party API that contains all the data to be manipulated. <br />

Basically a CRUD application that we can filter by the items requested for the API. <br />

### WARNING

I documented this whole project in english because it makes more easier if someone from another country needs to use this code.

## How to use

Clone/Download this repository, then run:

### `npm install`

And:

### `npm run dev`

This will open two terminals, one of them will start the application at:

### `http://localhost:8000`

And the other will also start the API at:

### `http://localhost:3000`

## Dependencies used in this application

- bootstrap/react-bootstrap/reactstrap: libraries used to create the responsive interface.
- chai: library used to create assertions in the application tests, i think it is better than the native assertions.
- deep-freeze: library used for recursive call of the expression Object.freeze, i used it to maintain the principle of immutability.
- react-redux/redux/redux-immutable-state-invariant/redux-thunk: libraries used to control and manipulate the state of the application, it makes the implementation of new actions in the project more easier.
- react-router-dom: library used for the application routing.
- json-server: library used for creating a local server for the JSON data file.
- cross-env: library used for running scripts that set and use environment variables across platforms.
