import React from 'react';
import './Dashboard.scss';
import { AirportConnectivityBuilder } from '../AirportConnectivityBuilder';

/**
 * @author Vishal Chavan
 */
export const Dashboard = () => {
    return (
        <section className='dashboard-page' data-test='dashboardComponent'>
            <div className="airport-connectivity-section">
                <AirportConnectivityBuilder />
            </div>
        </section>
    )
}
