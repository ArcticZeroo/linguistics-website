import * as React from 'react';

enum LinkOpenTarget {
    newTab = '_blank',
    currentTab = '_self'
}

export { LinkOpenTarget };

interface ISafeLinkProps {
    target?: LinkOpenTarget;
    href: string;
    children: React.ReactChildren;
}

const SafeExternalLink: React.FC<ISafeLinkProps> = ({ target, href, children }) => {
    return (
        <a href={href} target={target || LinkOpenTarget.newTab} rel="noopener noreferrer">
            {children}
        </a>
    );
};

export default SafeExternalLink;