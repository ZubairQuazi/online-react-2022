const redux = require("redux");
const createStore = redux.createStore;

// action
const ADD_HERO = "ADD_HERO";
const REMOVE_HERO = "REMOVE_HERO";

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

// intial state
const initialState = {
    numberOfHeroes : 0
}

// reducers
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_HERO : return {
            numberOfHeroes : state.numberOfHeroes + 1
        }
        case REMOVE_HERO : return {
            numberOfHeroes : state.numberOfHeroes - 1
        }
        default : return state
    }
}

// store
const store = createStore(reducer);
console.log("Initial State", store.getState() );

// subscribe and unsubscribe to store
const unsubscribe = store.subscribe(()=>{
    console.log( store.getState() );
});

// dispatch events from store

store.dispatch( addHero() );// 1
store.dispatch( addHero() );
store.dispatch( addHero() );
store.dispatch( addHero() );
store.dispatch( addHero() );
store.dispatch( removeHero() );
store.dispatch( removeHero() );
store.dispatch( removeHero() );
unsubscribe();
console.log("store unsubscribed");