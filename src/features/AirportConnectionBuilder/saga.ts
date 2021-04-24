import { call, put, takeLatest } from 'redux-saga/effects';

import { GET_AIRPORT_LIST, GET_ALL_FLIGHT_DETAILS_LIST, RESET_AIRPORT_CONNECTION_BUILDER_DATA } from './constants';
import {
    getAirportListSuccess,
    getAllFlightDetailsSuccess,
    resetAllData
} from './actions';
import { AirportConnectionBuilderService } from '../../services/airport-connection-builder.service';

/**
 * @author Vishal Chavan
 */
export function* getAirportList() {
    try {
        const airportListResponse = yield call(AirportConnectionBuilderService.getAirportList);
        const airportList = airportListResponse.data;
        yield put(getAirportListSuccess(airportList))
    } catch (err) {
        // const errorData: AppErrorData = {
        //     errorCode: err.response?.data?.status,
        //     errorMessage: err.response?.data?.message,
        //     hasError: true,
        // }
        // AppService.handleAPIError(errorData)
        // yield put(apiError(errorData))
    }
}


export function* getAllFlightDetails(action: any) {
    try {
        const flightDetailsResponse = yield call(AirportConnectionBuilderService.getAllFlightDetails, action.payload);
        const flightDetails = flightDetailsResponse.data;
        yield put(getAllFlightDetailsSuccess(flightDetails))
    } catch (err) {
        console.log(err);
    }
}

export function* watchGetAirportList() {
    yield takeLatest(GET_AIRPORT_LIST, getAirportList)
}

export function* watchGetAllFlightDetails() {
    yield takeLatest(GET_ALL_FLIGHT_DETAILS_LIST, getAllFlightDetails)
}

export function* watchResetAllData() {
    yield takeLatest(RESET_AIRPORT_CONNECTION_BUILDER_DATA, resetAllData)
}

export const airportConnectionBuilderSaga = [
    call(watchGetAirportList),
    call(watchGetAllFlightDetails),
    call(watchResetAllData),
]
