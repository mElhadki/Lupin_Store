import { createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'

function saveToLocalStorage(state){
    try {
        const serializdState = JSON.stringify(state);
        localStorage.setItem('state', serializdState);
    } catch (error) {
        console.log(error);
    }
}

function loadFromLocalStorage(){
    try {
        const serializdState = localStorage.getItem('state');
        if(serializdState == null){
            return undefined;
        }
        return JSON.parse(serializdState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}
const persistedState = loadFromLocalStorage();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    reducer,
    persistedState,
    composeEnhancer(applyMiddleware(thunk))
)

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;