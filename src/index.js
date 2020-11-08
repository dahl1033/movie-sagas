import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('FETCH_SPECIFIC_GENRES', fetchSpecificMovieGenres);
    yield takeEvery('FETCH_MOVIE_ID', fetchSpecificMovieId);
    yield takeEvery('CREATE_MOVIES', createMovie);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();
//
// *** GENERATOR FUNCTIONS ***
//
// generator function to fetch movie list from DB using saga
function* fetchMovies(action) {
    console.log(`In fetchMovies action.type: ${action.type}`);
    let response = yield axios({
        method: 'GET',
        url: '/api/movie'
    });
    // set movies reducer state to our response from DB
    yield put({
        type: 'SET_MOVIES',
        payload: response.data
    })
}

// generator function to fetch all genres using saga
function* fetchGenres(action) {
    console.log(`In fetchGenres action.type: ${action.type}`)
    let response = yield axios({
        method: 'GET',
        url: '/api/genre'
    })
    // set genre reducer state to our response from DB
    yield put({
        type: 'SET_GENRES',
        payload: response.data
    })
}

// generator function to fetch specific genres related to a given movie
function* fetchSpecificMovieGenres(action) {
    console.log(`In fetchSpecificMovieGenres action.type: ${action.type} action.payload: ${action.payload}`)
    let response = yield axios({
        method: 'GET',
        url: `/api/genre/${action.payload}`,
        payload: {
            id: action.payload
        }
    })
    // set specificGenres reducer state to our response from DB
    yield put({
        type: 'SET_SPECIFIC_GENRES',
        payload: response.data
    })
}

// generator function to fetch specific movie selected from DB
function* fetchSpecificMovieId(action) {
    console.log('fetchMoviesIdSaga', action.type, action.payload)
    let response = yield axios({
        method: 'GET',
        url: `/api/movie/${action.payload}`,
        params: {
            id: action.payload
        }
    })
    // set specificMovie reducer state to our response from DB
    yield put({
        type: 'SET_MOVIE_ID',
        payload: response.data[0]
    })
}

// Saga used to create new movie
function* createMovie(action) {
    yield axios({
        method: 'POST',
        url: '/api/movie/',
        data: action.payload
    })
    // grab updated movie list from DB
    yield put({type: 'FETCH_MOVIES'})
}
//
// *** REDUCERS ***
//
// reducer used to store specific genres related to a given movie
const specificGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_SPECIFIC_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// reducer used to store the id of a specific movie selected
const specificMovie = (state = [], action) => {
    switch(action.type) {
        case 'SET_MOVIE_ID':
            return action.payload;
        default:
            return state;
    }
}

// reducer used to store movies from our DB
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// reducer used to store movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// redux store for components
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        specificGenres,
        specificMovie
    }),
    applyMiddleware(sagaMiddleware, logger),
);

// passing rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
