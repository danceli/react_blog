import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
const store = createStore(reducer, applyMiddleware(thunk, logger))
export default store






// () => {
//   const store = createStore(myReducer, applyMiddleware(thunk, logger)) 
//   const persistor = persistStore(store)
//   return { store, persistor }
// };