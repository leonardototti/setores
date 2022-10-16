import sectorConstants from "../constants/sectorConstants";

const defaultState = {
	sectors: [],
};

export default function reducer(state = defaultState, action) {
	let newState = {};
	let newData;
	let index;

	switch( action.type )
	{
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
