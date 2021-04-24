/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PageNotFound } from '../common/PageNotFound/PageNotFound';
import { AppRoutes } from '../../constants';
import Dashboard from '../Dashboard';
/**
 * @author Vishal Chavan
 */
export const Routes = () => {
    return (
        <Suspense fallback={<></>}>
            <Switch>
                <Route exact path={AppRoutes.DASHBOARD_PATH} component={Dashboard} />
                <Redirect exact from={AppRoutes.ROOT_PATH} to={AppRoutes.DASHBOARD_PATH} />
                <Route path={AppRoutes.PAGE_NOT_FOUND} component={PageNotFound} />
                <Redirect from='*' to={AppRoutes.PAGE_NOT_FOUND} />
            </Switch>
        </Suspense>
    );
}
