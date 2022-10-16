import sectorConstants from "../constants/sectorConstants";

/**
 * Create a sector
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */
export const sectorCreate = (data) => {
	return {
		type: sectorConstants.SECTOR_CREATE,
		payload: data,
	};
}

/**
 * Update a sector
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
export const sectorUpdate = (data) => {
	return {
		type: sectorConstants.SECTOR_UPDATE,
		data: data,
	};
}

/**
 * Delete a sector
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
export const sectorDelete = (data) => {
	return {
		type: sectorConstants.SECTOR_DELETE,
		data: data,
	};
}