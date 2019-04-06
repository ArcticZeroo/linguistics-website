import * as React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border-radius: 0.25rem;
  padding: 1rem;
`;

const CardTitle = styled.div`
  font-family: "Google Sans", "Product Sans", "Roboto", sans-serif;
  font-size: 1.25em;
  margin-bottom: 0.5rem;
`;

const CardBody = styled.div``;

interface ICardProps {
    title?: React.ReactNode | string;
    backgroundColor?: string;
    textColor?: string;
}

function getTextColorFromBackgroundColor(color: string) {
    if (color.startsWith('#')) {
        const hex = color.substr(1);

        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        const average = (r + g + b) / 3;

        return average >= (255 / 2) ? 'black' : 'white';
    }

    return 'black';
}

const Card: React.FC<ICardProps> = ({ title, children, backgroundColor, textColor }) => {
    if (!textColor && backgroundColor) {
        textColor = getTextColorFromBackgroundColor(backgroundColor);
    }

    return (
      <CardContainer style={{ backgroundColor, color: textColor }}>
          { title && (
              <CardTitle>
                  {title}
              </CardTitle>
          )}
          {
              children && (
                <CardBody>
                    {children}
                </CardBody>
              )
          }
      </CardContainer>
    );
};

Card.defaultProps = {
    backgroundColor: 'white'
};

export default Card;