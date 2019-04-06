import * as React from 'react';
import Card from './Card';

interface IErrorCardProps {
    title?: React.ReactNode;
}

const ErrorCard: React.FC<IErrorCardProps> = ({ title, children }) => (
    <Card title={title} backgroundColor={'#F44336'}>
        {children}
    </Card>
);

export default ErrorCard;