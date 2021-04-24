import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import './Root.scss';
import { Routes } from "../Routes";
/**
 * @author Vishal Chavan
 */
export const Root = () => {
    return (
        <Router>
            <main id='main-content'>
                <Routes />
            </main>
        </Router>
    );
}