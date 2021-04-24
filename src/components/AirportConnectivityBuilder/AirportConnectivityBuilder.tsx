import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownSkeleton, TableRow, TableCell, TableSelectRow } from 'carbon-components-react';
import { AppDataTable } from '../custom/DataTable';
import { AllFlightDetailsTable } from './Components/AllFlightDetailsTable'

import './AirportConnectivityBuilder.scss';

interface IProps {
    getAirportList: () => void;
    airportList: string[];
    hasAirportListLoaded: boolean;

    getAllFlightDetails: (payload: { from: string; to: string }) => void;
    allFlightDetails: string[];
    hasAllFlightDetailsLoaded: boolean;
}

/**
 * @author Vishal Chavan
 */
export const AirportConnectivityBuilder = (props: IProps) => {

    const { getAirportList, airportList, hasAirportListLoaded,
        getAllFlightDetails, allFlightDetails, hasAllFlightDetailsLoaded,
    } = props;

    const [deptAirportList, setDeptAirportList] = useState<any>();
    const [arrivalAirportList, setArrivalAirportList] = useState<any>();
    const [isDepartureAirportSelected, setIsDepartureAirportSelected] = useState(0);
    const [isArrivalAirportSelected, setIsArrivalAirportSelected] = useState(0);
    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState('');
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState('');
    const [isTableDataLoading, setIsTableDataLoading] = useState(false);
    const [tableData, setTableData] = useState<any>();
    const [mapDetails, setMapDetails] = useState<any>();
    let m: any = []
    const setSelectedFlightDetails = (payload: any) => {
        m = payload;
        if (payload.length) {
            setMapDetails(payload);
        }
    }
    useEffect(() => {
        if (m.length) {
            setMapDetails(mapDetails);
        }
    }, [m, setSelectedFlightDetails]);


    useEffect(() => {
        getAirportList();
    }, []);

    useEffect(() => {
        if (hasAirportListLoaded) {
            setDeptAirportList(airportList);
            setArrivalAirportList(airportList);
        }
    }, [hasAirportListLoaded]);

    useEffect(() => {
        if (selectedArrivalAirport && selectedDepartureAirport) {
            setIsTableDataLoading(true);
            getAllFlightDetails({ from: selectedDepartureAirport, to: selectedArrivalAirport });
        }
    }, [selectedDepartureAirport, selectedArrivalAirport]);


    useEffect(() => {
        if (hasAllFlightDetailsLoaded) {
            setIsTableDataLoading(false);
            setTableData(allFlightDetails);
        }
    }, [hasAllFlightDetailsLoaded, allFlightDetails]);

    useEffect(() => {
        // resetAllData();
    })

    const typeItemToElement = (item): React.ReactNode | any => {
        return (
            <div key={item.arptCd}>
                <span title={item.arptName}>{item.arptName}</span>
            </div>
        );
    }


    const onDepartureFlightChange = (data: any): void => {
        setSelectedDepartureAirport(data.selectedItem.arptCd);
    }

    const onArrivalFlightChange = (data: any): void => {
        setSelectedArrivalAirport(data.selectedItem.arptCd);
    }

    const selectedAirport = (airport: string): string => {
        const selectedItem: any = airportList?.find((type: any) => type.arptCd === airport)
        return selectedItem?.arptCd;
    }

    return (
        <section className='airport--connectivity-builder-page' data-test='airportConnectivityComponent'>
            <div className="airport--connectivity-dropdown-section">
                {deptAirportList?.length > 0 ?
                    <div className="airport--connectivity-dropdown">
                        <Dropdown
                            items={deptAirportList || []}
                            id="airport--connectivity-builder-dept-from"
                            className="airport--connectivity-builder-dept-from"
                            titleText={'From'}
                            ariaLabel={'From'}
                            onChange={onDepartureFlightChange}
                            itemToElement={typeItemToElement}
                            invalid={isDepartureAirportSelected === -1}
                            invalidText={'Please select departure airport'}
                            selectedItem={selectedAirport(selectedDepartureAirport)}

                        />
                    </div>
                    :
                    <DropdownSkeleton />
                }
                {arrivalAirportList?.length > 0 ?
                    <div className="airport--connectivity-dropdown">
                        <Dropdown
                            items={arrivalAirportList || []}
                            id="airport--connectivity-builder-arrival-from"
                            className="airport--connectivity-builder-arrival-from"
                            titleText={'To'}
                            ariaLabel={'To'}
                            onChange={onArrivalFlightChange}
                            itemToElement={typeItemToElement}
                            invalid={isArrivalAirportSelected === -1}
                            invalidText={'Please select Arrival airport'}
                            selectedItem={selectedAirport(selectedArrivalAirport)}

                        />
                    </div> :
                    <DropdownSkeleton />
                }
            </div>
            <AllFlightDetailsTable
                allFlightDetails={allFlightDetails}
                isTableDataLoading={isTableDataLoading}
                setSelectedFlightDetails={setSelectedFlightDetails}
            />
            <div className="airport--connectivity-map">
                {
                    mapDetails && <h4>
                        <h4>Selected Flight details</h4>
                        <>{mapDetails?.map((item) => (
                            <>
                                <h5>{`Flight No- ${item.onwardFltNo}`}</h5>
                                <h5>{`Departure Airport- ${item.onwardDepArpt}`}</h5>
                                <h5>{`Arrival Airport- ${item.onwardArrArpt}`}</h5>
                                <h5>{`Departure Time- ${item.onwardDepTime}`}</h5>
                                <h5>{`Arrival Time- ${item.onwardArrTime}`}</h5>
                                <h5>{`Connecting Flight No- ${item.connFltNo}`}</h5>
                                <h5>{`Connecting Depature Airport- ${item.connDepArpt}`}</h5>
                                <h5>{`Connecting Arrival Airport- ${item.connArrArpt}`}</h5>
                                <h5>{`connecting Departure Time- ${item.connDepTime}`}</h5>
                                <h5>{`Connecting Arrival Time- ${item.connArrTime}`}</h5>
                            </>
                        ))}
                        </>
                    </h4>
                }
            </div>
        </section>
    )
}