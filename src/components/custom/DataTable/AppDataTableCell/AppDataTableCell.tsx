import React from 'react'
import './AppDataTableCell.scss'

interface IProps {
    title: string;
    children: React.ReactNode | string;
}
/**
 * @author Vishal Chavan
 * 
 * @param props Properties passed to the component
 */
export const AppDataTableCell = (props: IProps) => {
    return (
        <span title={props.title} className="-text-truncate-end">
            {props.children}
        </span>
    )
}