import { combineReducers } from 'redux';
import { airportConnectionBuilderReducer } from './AirportConnectionBuilder';
/**
 * @author Vishal Chavan
 */
const rootReducer = () => combineReducers({
    airportConnectionBuilderState: airportConnectionBuilderReducer
});

export default rootReducer;