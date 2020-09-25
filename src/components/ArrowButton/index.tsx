import React, { FunctionComponent } from 'react';
import SvgArrow from './SvgArrow';
import './style.scss';
interface Props {
    onClick: () => void;
    alt?: string;
    secondary?: boolean;
    direction?: 'right' | 'left' | 'up' | 'down';
    width?: string | number;
    height?: string | number;
    tabIndex?: number;
}

const ArrowButton: FunctionComponent<Props> = ({
    onClick,
    alt,
    secondary = false,
    direction = 'left',
    width = 50,
    height = 50,
    tabIndex,
}) => {
    return (
        <button
            className={`px__mwc__button px__mwc__arrow-button ${secondary ? 'px__mwc__arrow-button--secondary' : ''}`}
            onClick={handleClick}
            onKeyDown={(e) => (e.which === 13 || e.keyCode === 13) && handleClick}
            aria-label={alt}
            name={alt}
            title={alt}
            data-direction={direction}
            style={{ width, height }}
            tabIndex={tabIndex}
        >
            <SvgArrow alt={alt} aria-hidden={true} />
        </button>
    );

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.currentTarget.blur();
        onClick();
    }
};

export default ArrowButton;
