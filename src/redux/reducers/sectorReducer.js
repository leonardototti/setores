import sectorConstants from "../constants/sectorConstants";

const defaultState = {
	sectors: [
		{
			id: 1,
			name: 'Administrativo',
			roles: [
				{
					id: 1,
					name: 'Cargo 1',
				},
				{
					id: 2,
					name: 'Cargo 2',
				},
			],
		},
		{
			id: 2,
			name: 'Financeiro',
			roles: [
				{
					id: 1,
					name: 'Cargo 3',
				},
				{
					id: 2,
					name: 'Cargo 4',
				},
			],
		},
		{
			id: 3,
			name: 'Comercial',
			roles: [
				{
					id: 1,
					name: 'Cargo 5',
				},
				{
					id: 2,
					name: 'Cargo 6',
				},
				{
					id: 2,
					name: 'Cargo 7',
				},
				{
					id: 2,
					name: 'Cargo 8',
				},
			],
		},
		{
			id: 4,
			name: 'Recursos Humanos',
			roles: [
				{
					id: 1,
					name: 'Cargo 9',
				},
				{
					id: 2,
					name: 'Cargo 10',
				},
			],
		},
		{
			id: 5,
			name: 'Operacional',
			roles: [
				{
					id: 1,
					name: 'Cargo 11',
				},
			],
		},
	],
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
