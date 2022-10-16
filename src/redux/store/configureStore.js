import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sectorReducer from "../reducers/sectorReducer";
import generalReducer from "../reducers/generalReducer";

const IS_DEBUG = process.env.NODE_ENV === 'development';

const persistConfig = {
	key      : "root",
	storage  : storage,
	whitelist: [
		"sector",
		"general",
	],
};

const rootReducer = combineReducers({
	sector : sectorReducer,
	general: generalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

if( IS_DEBUG )
{
	middleware.push(logger);
}

export const store     = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
