import * as React from 'react';
import styled from 'styled-components';
import { getForegroundColor } from '../../../api/color/themeFromColor';

const CircleContainer = styled.i`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem;
`;

interface ICircleMaterialIconProps {
    icon: string;
    backgroundColor: string;
    iconColor?: string;
}

const CircleMaterialIcon: React.FC<ICircleMaterialIconProps> = ({ icon, backgroundColor, iconColor }) => {
    if (!iconColor && backgroundColor) {
        iconColor = getForegroundColor(backgroundColor);
    }

    return (
        <CircleContainer style={{ backgroundColor, color: iconColor }} className="material-icons">
            {icon}
        </CircleContainer>
    );
};

export default CircleMaterialIcon;