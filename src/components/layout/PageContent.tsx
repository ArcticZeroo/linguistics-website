import * as React from 'react';
import { Route, Switch } from 'react-router';
import routes from '../../config/routes';
import IPACharts from '../linguistics/ipa/IPACharts';
import SyllabificationRoute from '../routes/syllabification/SyllabificationRoute';

const PageContent: React.FC = () => {
    return (
        <>
            <IPACharts/>
            <Switch>
                <Route path={routes.syllabification.url} component={SyllabificationRoute} />
            </Switch>
        </>
    );
};

export default PageContent;