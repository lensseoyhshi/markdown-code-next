import React from 'react';

interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
                                       width = 40,
                                       height = 40,
                                       className = ""
                                   }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width={width}
            height={height}
        >
            <circle cx="50" cy="50" r="50" fill="#4A90E2"/>
            <text x="50" y="45" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="white">MD</text>
            <text x="50" y="70" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle" fill="white">&lt;/&gt;</text>
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
        </svg>
    );
};

export default Logo;
