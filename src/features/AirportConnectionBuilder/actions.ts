import { action } from 'typesafe-actions';

import {
    GET_AIRPORT_LIST, GET_AIRPORT_LIST_SUCCESS, GET_AIRPORT_LIST_FAILURE,
    GET_ALL_FLIGHT_DETAILS_LIST, GET_ALL_FLIGHT_DETAILS_LIST_SUCCESS, GET_ALL_FLIGHT_DETAILS_LIST_FAILURE,
    RESET_AIRPORT_CONNECTION_BUILDER_DATA
} from './constants';
/**
 * @author Vishal Chavan
 */

export const getAirportList = () => action(GET_AIRPORT_LIST);
export const getAirportListSuccess = (payload: any) => action(GET_AIRPORT_LIST_SUCCESS, payload);
export const getAirportListFailure = (payload: any) => action(GET_AIRPORT_LIST_FAILURE, payload);

export const getAllFlightDetails = (payload:{from:string; to:string}) => action(GET_ALL_FLIGHT_DETAILS_LIST, payload);
export const getAllFlightDetailsSuccess = (payload: any) => action(GET_ALL_FLIGHT_DETAILS_LIST_SUCCESS, payload);
export const getAllFlightDetailsFailure = (payload: any) => action(GET_ALL_FLIGHT_DETAILS_LIST_FAILURE, payload);

export const resetAllData = () => action(RESET_AIRPORT_CONNECTION_BUILDER_DATA);
