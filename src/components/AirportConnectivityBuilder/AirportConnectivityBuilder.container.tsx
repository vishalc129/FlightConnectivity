import { compose } from 'redux';
import { connect } from 'react-redux';

import { AirportConnectivityBuilder as AirportConnectivityBuilderComponent } from './AirportConnectivityBuilder';
import { RootState } from '../../types';
import { airportConnectionBuilderSelectors, airportConnectionBuilderActions } from '../../features/AirportConnectionBuilder';

/**
 * @author Vishal Chavan
 */
const mapStateToProps = (state: RootState) => {
    const airportConnectivityState = airportConnectionBuilderSelectors.getAirportConnectionBuilderState(state.airportConnectionBuilderState);
    if (airportConnectivityState) {
        return ({
            hasAirportListLoaded: airportConnectivityState.hasAirportListLoaded,
            airportList: airportConnectivityState.airportList,
            hasAllFlightDetailsLoaded: airportConnectivityState.hasAllFlightDetailsLoaded,
            allFlightDetails: airportConnectivityState.allFlightDetails,
        });
    }
};

const dispatchProps = {
    getAirportList: airportConnectionBuilderActions.getAirportList,
    getAllFlightDetails: airportConnectionBuilderActions.getAllFlightDetails,
    resetAllData: airportConnectionBuilderActions.resetAllData
};

const enhance = compose(
    connect(
        mapStateToProps,
        dispatchProps
    )
);
export const AirportConnectivityBuilder = enhance(AirportConnectivityBuilderComponent);
