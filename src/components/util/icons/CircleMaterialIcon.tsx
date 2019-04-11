import * as React from 'react';
import styled from 'styled-components';
import { getForegroundColor } from '../../../api/color/themeFromColor';
import MaterialIcon from './MaterialIcon';

const CircleContainer = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
        <CircleContainer style={{ backgroundColor, textColor: iconColor }}>
            <MaterialIcon icon={icon} />
        </CircleContainer>
    );
};

export default CircleMaterialIcon;