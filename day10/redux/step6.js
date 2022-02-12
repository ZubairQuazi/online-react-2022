const redux = require("redux");
const thunkMiddleWare = require("redux-thunk").default;
const axios = require("axios");

//---------------------------------
const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;

// action
const AXIOS_USERS_REQUEST = "AXIOS_USERS_REQUEST";
const AXIOS_USERS_SUCCESS = "AXIOS_USERS_SUCCESS";
const AXIOS_USERS_ERROR = "AXIOS_USERS_ERROR";

// action creators
const fetchUsers = ()=>{
    return {
        type : AXIOS_USERS_REQUEST
    }
}
const fetchUsersSuccess = (users)=>{
    return {
        type : AXIOS_USERS_SUCCESS,
        payload : users
    }
}
const fetchUsersError = (err)=>{
    return {
        type : AXIOS_USERS_ERROR,
        payload : err
    }
}
// intial state
const initialState = {
    waiting : false,
    users : [],
    error : ''
}

// reducers
const usersReducer = (state = initialState, action)=>{
    switch(action.type){
        case AXIOS_USERS_REQUEST : return {
            ...state,
            waiting : true
        }
        case AXIOS_USERS_SUCCESS : return {
            ...state,
            waiting : false,
            users : action.payload,
            error : ''
        }
        case AXIOS_USERS_REQUEST : return {
            ...state,
            waiting : false,
            users : [],
            error : action.payload
        }
        default : return state
    }
} 
// configure middleware

const thunkFetchUsers = ()=>{
    return function( dispatch ){
        dispatch( fetchUsers() )
    }
}

const thunkAjaxResponseFetchUsers = ()=>{
    return function( dispatch ){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res)=>{
            dispatch( fetchUsersSuccess(res.data))
        })
        .catch(error =>{
            dispatch( fetchUsersError(error) )
        })
    }
}

// store
const store = createStore(usersReducer, applyMiddleWare( thunkMiddleWare ));
// subscribe and unsubscribe to store
console.log("Initial State of Store", store.getState() );
store.subscribe(()=>{
    console.log(store.getState() );
})
// dispatch events from store
store.dispatch( thunkFetchUsers() );
store.dispatch( thunkAjaxResponseFetchUsers() );