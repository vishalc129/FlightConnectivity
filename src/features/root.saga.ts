import { all } from 'redux-saga/effects';
import { airportConnectionBuilderSaga } from './AirportConnectionBuilder';

/**
 * @author Vishal Chavan
 */
export default function* rootSaga() {
    yield all([
        ...airportConnectionBuilderSaga
    ])
}