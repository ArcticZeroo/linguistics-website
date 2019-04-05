import * as React from 'react';
import { Route, Switch } from 'react-router';
import routes from '../../config/routes';
import ConsonantChart from '../linguistics/ipa/ConsonantChart';
import SyllabificationRoute from '../routes/syllabification/SyllabificationRoute';

const PageContent: React.FC = () => {
    return (
        <>
            <ConsonantChart/>
            <Switch>
                <Route path={routes.syllabification.url} component={SyllabificationRoute} />
            </Switch>
        </>
    );
};

export default PageContent;