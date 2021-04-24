import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import * as airportConnectionBuilderActions from './actions';
import {
    GET_AIRPORT_LIST, GET_AIRPORT_LIST_SUCCESS, GET_AIRPORT_LIST_FAILURE,
    GET_ALL_FLIGHT_DETAILS_LIST, GET_ALL_FLIGHT_DETAILS_LIST_SUCCESS, GET_ALL_FLIGHT_DETAILS_LIST_FAILURE,
    RESET_AIRPORT_CONNECTION_BUILDER_DATA
} from './constants';
import { AirportConnectionBuilderState } from '../../types';

export type AirportConnectionBuilderAction = ActionType<typeof airportConnectionBuilderActions>;

const defaultState = {
    airportList: null,
    hasAirportListLoaded: null,
    hasAirportListLoadedFailedData: null,

    allFlightDetails: null,
    hasAllFlightDetailsLoaded: null,
    hasAllFlightDetailsFailedData: null,
}
/**
 * @author Vishal Chavan
 */
export default combineReducers<AirportConnectionBuilderState, AirportConnectionBuilderAction>({
    airportConnectionBuilder: (state = defaultState, action) => {
        switch (action.type) {
            case GET_AIRPORT_LIST: {
                return {
                    ...state,
                    ...{ airportList: null, hasAirportListLoaded: null, hasAirportListLoadedFailedData: null }
                };
            }
            case GET_AIRPORT_LIST_SUCCESS: {
                const airportList = action.payload;
                return {
                    ...state,
                    ...{ airportList, hasAirportListLoaded: true, hasAirportListLoadedFailedData: null }
                };
            }
            case GET_AIRPORT_LIST_FAILURE: {
                return {
                    ...state,
                    ...{ airportList: null, hasAirportListLoaded: null, hasAirportListLoadedFailedData: action.payload }
                }
            }
            case GET_ALL_FLIGHT_DETAILS_LIST: {
                return {
                    ...state,
                    ...{ allFlightDetails: null, hasAllFlightDetailsLoaded: null, hasAllFlightDetailsFailedData: null }
                };
            }
            case GET_ALL_FLIGHT_DETAILS_LIST_SUCCESS: {
                const allFlightDetails = action.payload;
                return {
                    ...state,
                    ...{ allFlightDetails, hasAllFlightDetailsLoaded: true, hasAllFlightDetailsFailedData: null }
                };
            }
            case GET_ALL_FLIGHT_DETAILS_LIST_FAILURE: {
                return {
                    ...state,
                    ...{ allFlightDetails: null, hasAllFlightDetailsLoaded: null, hasAllFlightDetailsFailedData: action.payload }
                }
            }
            case RESET_AIRPORT_CONNECTION_BUILDER_DATA:
                return {
                    ...state,
                    ...defaultState
                };
            default:
                return state;
        }
    },
})
