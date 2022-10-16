import { REHYDRATE } from "redux-persist";
import sectorConstants from "../constants/sectorConstants";

const reducerKey = "sector";

const defaultState = {
	sectors: [],
};

export default function reducer(state = defaultState, action) {
	let newState = {};
	let newData;
	let index;

	switch( action.type )
	{
		case REHYDRATE:
			let persistUpdate = {};

			if( action.payload && action.payload[reducerKey] )
			{
				const persistCache = action.payload[reducerKey];

				persistUpdate = {
					sectors: persistCache.sectors || defaultState.sectors,
				};
			}

			return Object.assign({}, state, persistUpdate);

		case sectorConstants.SECTOR_CREATE:
			newData = action.payload;

			newState = Object.assign({}, state, {
				sectors: [
					...state.sectors,
					newData,
				],
			});

			return newState;

		case sectorConstants.SECTOR_UPDATE:
			newData = [...state.sectors];

			index = newData.findIndex((sector) => sector.id === action.data.id);

			if( index > -1 )
			{
				newData[index] = action.data;
			}

			return Object.assign({}, state, {
				sectors: newData,
			});

		case sectorConstants.SECTOR_DELETE:
			newData = [...state.sectors];

			index = newData.findIndex((sector) => sector.id === action.data.id);

			if( index > -1 )
			{
				newData.splice(index, 1);
			}

			return Object.assign({}, state, {
				sectors: newData,
			});

		default:
			return state;
	}
}
