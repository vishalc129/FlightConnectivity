/**
 * Copyright 2021 Vishal Chavan
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { TableRow, TableCell, TableSelectRow } from 'carbon-components-react';
import { AppDataTable } from '../../custom/DataTable';

interface IProps {
    setSelectedFlightDetails: (payload: any) => void;
    isTableDataLoading: boolean;
    allFlightDetails: any;
}

/**
 * @author Vishal Chavan
 */
export const AllFlightDetailsTable = (props: IProps) => {

    const { isTableDataLoading, allFlightDetails, setSelectedFlightDetails } = props

    const tableHeaders = [
        {
            header: 'Onward Flight',
            key: 'onwardFltNo'
        },
        {
            header: 'Departure Airport',
            key: 'onwardDepArpt'
        },
        {
            header: 'Arrival Airport',
            key: 'onwardArrArpt'
        },
        {
            header: 'Departure Time',
            key: 'onwardDepTime'
        },
        {
            header: 'Arrival Time',
            key: 'onwardArrTime'
        },
        {
            header: 'Connecting Flight',
            key: 'connFltNo'
        },
        {
            header: 'Departure Airport',
            key: 'connDepArpt'
        },
        {
            header: 'Arrival Airport',
            key: 'connArrArpt'
        },
        {
            header: 'Departure Time',
            key: 'connDepTime'
        },
        {
            header: 'Arrival Time',
            key: 'connArrTime'
        }

    ];

    const renderTableCell = (cell: any) => {
        return (
            <TableCell key={cell.id}> {cell.value || "-"}</TableCell>
        )
    }

    const selectRow = (row) => {
        if (row.row.isSelected) {
            const obj = Object.fromEntries(row.row.cells.map(item => [item.id.substr(item.id.indexOf(':') + 1), item.value]));
            props.setSelectedFlightDetails([obj]);

        }
    }

    const renderTableRow = (row: any, getRowProps: any, getSelectionProps?: any) => {
        return (
            <TableRow key={row.id} {...getRowProps({ row })} data-test="tableRow">
                <TableSelectRow {...getSelectionProps({ row })} {...selectRow({ row })} />
                {row.cells.map(renderTableCell)}
            </TableRow>
        )
    }

    return (
        <div className="airport--connectivity-table">
            <AppDataTable
                isLoading={isTableDataLoading}
                headers={tableHeaders}
                rows={allFlightDetails}
                sortableColumns={[]}
                totalItems={allFlightDetails?.length}
                useZebraStyles={true}
                pagination={false}
                renderTableRow={renderTableRow}
                isSelectAll={true}
                radio={true}
                isAllRowsSelectDisabled={true}
            />
        </div>
    )
}