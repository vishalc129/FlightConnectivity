/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import {
    DataTable, DataTableRow, DataTableSkeleton, TableContainer, Table, TableHead,
    TableRow, TableHeader, TableBody, Pagination, TableCell, TableSelectAll, Tile
} from 'carbon-components-react';

import './AppDataTable.scss';
import { Locale } from '../../../../libraries/localization';
import { AppDataTableCell } from '../AppDataTableCell';
// import { AppDataTableHeader } from '../../../../models';

/**
 * @author Vishal Chavan
 */
interface IProps {
    isLoading: boolean;
    headers: any;
    rows: DataTableRow[];
    renderToolbar?: (getBatchActionProps: any) => void;
    sortableColumns?: string[];
    totalItems: number;
    itemsPerPageText?: string;
    renderTableRow: (row: any, getRowProps: any, renderTableRow?: any, selectedRows?: any) => React.ReactNode;
    useZebraStyles: boolean;
    pagination: boolean;
    isSelectAll?: boolean;
    isAllRowsSelectDisabled?: boolean;
    noRecordsText?: string;
    radio?: boolean;
    handlePaginationChange?: (event: { page: number; pageSize: number }) => void;
    tableHeading?: React.ReactNode | string;
    overflowMenuOnHover?: boolean;
    sortRow?: Function | any;
    firstRowIndex?: number;
    onPaginationIndexChange?: Function;
}

const renderDefaultTableCell = (cell: any) => {
    return (
        <TableCell className="-adt-table-cell" key={cell.id}><AppDataTableCell title={cell.value}>{cell.value || '-'}</AppDataTableCell></TableCell>
    )
}

const renderDefaultTableRow = (row: any, getRowProps: any) => {
    return (
        <TableRow key={row.id} {...getRowProps({ row })} className="-adt-table-row" data-test="tableRow">
            {row.cells.map(renderDefaultTableCell)}
        </TableRow>
    )
}

export const AppDataTable = (props: IProps) => {

    const {
        headers, isLoading, renderTableRow, renderToolbar, rows, sortableColumns, totalItems, useZebraStyles,
        pagination, isSelectAll, isAllRowsSelectDisabled
    } = props;

    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (props.firstRowIndex === 0) {
            setFirstRowIndex(0)
            setCurrentPage(1);
        }
    }, [props.firstRowIndex])

    // useEffect(() => {
    //     if (props.firstRowIndex !== undefined) {
    //         setFirstRowIndex(props.firstRowIndex)
    //         setCurrentPage(props.firstRowIndex + 1);
    //     }
    // }, [props.firstRowIndex])

    const sortRow = (cellA: any, cellB: any, { sortDirection, locale, sortStates, compare }: any) => {
        if (sortDirection === sortStates.DESC) {
            return compare(cellB, cellA, locale);
        }
        return compare(cellA, cellB, locale);
    };

    const handlePaginationChange = (event: { page: number; pageSize: number }) => {
        setFirstRowIndex(event.pageSize * (event.page - 1));
        setCurrentPage(event.page);
        if (event.pageSize !== currentPageSize) {
            setCurrentPageSize(event.pageSize);
        }
        if (props.onPaginationIndexChange) {
            props.onPaginationIndexChange(event.pageSize * (event.page - 1));
        }
    }

    const renderDataTable = (data: any) => {
        return (
            <TableContainer className="-adt-table-container" title={props.tableHeading}>
                {renderToolbar ? renderToolbar(data.getBatchActionProps) : null}
                <Table className="-adt-table">
                    <TableHead data-test="tableHeader">
                        <TableRow>
                            {
                                isSelectAll && <TableSelectAll disabled={isAllRowsSelectDisabled} {...data.getSelectionProps()} />
                            }

                            {data.headers.map(
                                (headerItem: any) => (
                                    <TableHeader
                                        key={headerItem.key}
                                        className={headerItem.headerClass}
                                        {...data.getHeaderProps({ header: headerItem })}
                                        isSortable={sortableColumns?.includes(headerItem.key)}>
                                        {headerItem.header}
                                    </TableHeader>
                                ))}
                        </TableRow>
                    </TableHead>
                    {data.rows.length > 0 ?
                        <TableBody data-test="tableBody">
                            {(data.rows.slice(firstRowIndex, firstRowIndex + currentPageSize)).map(
                                row => renderTableRow(row, data.getRowProps, data.getSelectionProps)
                            )}
                        </TableBody>
                        : null}
                </Table>

                {data.rows && !data.rows.length ? <Tile className="adt-no-datatile" data-test="noDataRowTile">{props.noRecordsText ? props.noRecordsText : 'No Records'}</Tile> : null}
                <Pagination
                    data-test="dataTablePagination"
                    className={pagination && data.rows.length !== 0 ? "-adt-pagination" : "bx--visually-hidden"}
                    totalItems={totalItems}
                    page={currentPage}
                    pageSize={currentPageSize}
                    itemsPerPageText={props.itemsPerPageText ? props.itemsPerPageText : Locale.requests_list_page?.pagination_items_per_page_text}
                    pageSizes={[10, 20, 30, 40]}
                    onChange={props.handlePaginationChange || handlePaginationChange}
                />
            </TableContainer>
        )
    }

    const renderLoading = () => {
        return (
            <DataTableSkeleton
                className='-adt-table-skeleton'
                columnCount={headers.length}
                rowCount={renderToolbar !== undefined ? 5 : 2}
                compact={false}
                // headers={headers}
                zebra={useZebraStyles}
                showHeader={false}
                showToolbar={renderToolbar !== undefined}
            />
        )
    }

    const renderContent = () => (
        <DataTable
            sortRow={props.sortRow || sortRow}
            useZebraStyles={useZebraStyles}
            size="short"
            rows={rows || []}
            headers={headers}
            radio={props.radio}
            render={renderDataTable}
        // overflowMenuOnHover={true}
        />
    )

    return (
        <div className="-adt-container">
            {isLoading ? renderLoading() : renderContent()}
        </div>
    )
}

AppDataTable.defaultProps = {
    renderTableRow: renderDefaultTableRow,
    useZebraStyles: false,
    pagination: true
}
