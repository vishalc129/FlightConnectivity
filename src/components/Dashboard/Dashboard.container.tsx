import { compose } from 'redux';
import { connect } from 'react-redux';

import { Dashboard } from './Dashboard';
import { RootState } from '../../types';
import { airportConnectionBuilderSelectors, airportConnectionBuilderActions } from '../../features/AirportConnectionBuilder';

/**
 * @author Vishal Chavan
 */
const mapStateToProps = (state: RootState): Record<string, any> => {
    let componentState = {};
    const userState = airportConnectionBuilderSelectors.getAirportConnectionBuilderState(state.airportConnectionBuilderState);
    if (userState) {
        componentState = {
            ...componentState, ...{
                airportList: userState.airportList,
                hasAirportListLoaded: userState.hasAirportListLoaded,
            }
        };
    }

    return componentState;
};

const dispatchProps = {
    getAirportList: airportConnectionBuilderActions.getAirportList,
};

const enhance = compose(
    connect(
        mapStateToProps,
        dispatchProps
    )
);

export const DashboardContainer = enhance(Dashboard);
