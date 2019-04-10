import * as React from 'react';
import Card, { ICardProps } from './Card';

export default (backgroundColor: string) => {
    const CardComponent: React.FC<ICardProps> = ({ children, title, textColor }) => {
        return (
            <Card {...{title, textColor, backgroundColor}}>
                {children}
            </Card>
        );
    };

    return CardComponent;
};