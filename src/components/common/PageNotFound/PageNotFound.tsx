
import React from 'react';
import { Button } from 'carbon-components-react'
import { useHistory } from 'react-router-dom';

import './PageNotFound.scss';
import { AppRoutes } from '../../../constants';

/**
* @author Vishal Chavan
*/
export const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="page-not-found-container">
      <div className='pnf-details'>
        <div className="pnf-error-warning">
          <span>Oops!</span>
        </div>
        <div className="pnf-error-message">
          <span>404 - PAGE NOT FOUND</span>
        </div>
        <div className="pnf-error-message-details">
          <span>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</span>
        </div>
        <Button onClick={() => { history.push({ pathname: AppRoutes.DASHBOARD_PATH }) }}>GO TO HOMEPAGE</Button>
      </div>
    </div>
  );
}