import * as React from 'react';
import { Route, Switch } from 'react-router';
import routes from '../../config/routes';
import IPACharts from '../linguistics/ipa/IPACharts';
import PhoneticEnvironmentRoute from '../routes/phonology/PhoneticEnvironmentRoute';
import SyllabificationRoute from '../routes/syllabification/SyllabificationRoute';

const PageContent: React.FC = () => {
    return (
        <>
            <IPACharts/>
            <Switch>
                <Route path={routes.syllabification.url} component={SyllabificationRoute}/>
                <Route path={routes.environment.url} component={PhoneticEnvironmentRoute}/>
            </Switch>
        </>
    );
};

export default PageContent;