const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

// action
const ADD_HERO = "ADD_HERO";
const REMOVE_HERO = "REMOVE_HERO";
const ADD_MOVIE = "ADD_MOVIE";
const REMOVE_MOVIE = "REMOVE_MOVIE";

// action creators
const addHero = ()=>{
    return {
        type : ADD_HERO,
        info : "First Redux Action"
    }
}
const removeHero = ()=>{
    return {
        type : REMOVE_HERO,
        info : "Second Redux Action"
    }
}
const addMovie = ()=>{
    return {
        type : ADD_MOVIE,
        info : "Third Redux Action"
    }
}
const removeMovie = ()=>{
    return {
        type : REMOVE_MOVIE,
        info : "Fourth Redux Action"
    }
}

// intial state
const initialHeroState = {
    numberOfHeroes : 0
}
const initialMovieState = {
    numberOfMovies : 0
}

// reducers
const heroReducer = (state = initialHeroState, action)=>{
    switch(action.type){
        case ADD_HERO : return { ...state, numberOfHeroes : state.numberOfHeroes + 1 }
        case REMOVE_HERO : return { ...state, numberOfHeroes : state.numberOfHeroes - 1 }
        default : return state
    }
}
const movieReducer = (state = initialMovieState, action)=>{
    switch(action.type){
        case ADD_MOVIE : return { ...state, numberOfMovies : state.numberOfMovies + 1 }
        case REMOVE_MOVIE : return { ...state, numberOfMovies : state.numberOfMovies - 1 }
        default : return state
    }
}

// combine reducers
const rootReducer = combineReducers({
    heroes : heroReducer,
    movies : movieReducer
})
// store
const store = createStore(rootReducer, applyMiddleWare( logger ));
// console.log("Initial State", store.getState() );

// subscribe and unsubscribe to store
const unsubscribe = store.subscribe(()=>{});

// dispatch events from store
store.dispatch( addHero() );// 1
store.dispatch( addHero() );
store.dispatch( addMovie() );
store.dispatch( addHero() );
store.dispatch( addMovie() );
store.dispatch( removeHero() );
store.dispatch( removeHero() );
store.dispatch( removeMovie() );
unsubscribe();
// console.log("store unsubscribed");