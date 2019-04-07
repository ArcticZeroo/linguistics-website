import * as React from 'react';

interface IMaterialIconProps {
    icon?: string;
}

const MaterialIcon: React.FC<IMaterialIconProps> = ({ children, icon }) => {
    return (
        <i className="material-icons">
            {icon || children}
        </i>
    );
};

export default MaterialIcon;