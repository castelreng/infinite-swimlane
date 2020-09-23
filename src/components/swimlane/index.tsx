import { PureComponent, createElement, RefObject, ReactElement } from 'react';
import { cancelTimeout, requestTimeout } from './timer';

const IS_SCROLLING_DEBOUNCE_INTERVAL = 150;
const defaultKey = (itemIndex : any) => `carousel:${itemIndex}`;

type RenderComponentProps = (props: {
    itemIndex: number;
    isScrolling?: boolean;
    data?: Object;
    style: Object;
}) => ReactElement;

type OnItemsRenderedCallback = (params: {
    overscanStartIndex: number;
    overscanStopIndex: number;
    visibleStartIndex: number;
    visibleStopIndex: number;
}) => void;
type OnScrollCallback = (params: {
    scrollDirection : any;
    scrollLeft : any;
    scrollUpdateWasRequested : any;
}) => void;
type ItemKeyCallback = (params: { itemIndex: number }) => string;

type InfiniteCarouselProps = {
    itemCount: number;
    onItemsRendered: OnItemsRenderedCallback;
    onScroll: OnScrollCallback;
    width: number;
    height: number;
    itemWidth: number;
    initialScrollLeft?: number;
    overscanCount?: number;
    itemKey?: ItemKeyCallback;
    data?: any;
    ref?: RefObject<InfiniteCarousel>;
    children: RenderComponentProps;
};

type InfiniteCarouselState = {
    isScrolling: boolean;
    scrollDirection: 'forward' | 'backward';
    scrollLeft: number;
    scrollUpdateWasRequested: boolean;
};

class InfiniteCarousel extends PureComponent<
    InfiniteCarouselProps,
    InfiniteCarouselState
    > {
    _resetIsScrollingTimeoutId = null;

    state: InfiniteCarouselState = {
        isScrolling: false,
        scrollDirection: 'forward',
        scrollLeft:
            typeof this.props.initialScrollLeft === 'number'
                ? this.props.initialScrollLeft
                : 0,
        scrollUpdateWasRequested: false,
    };

    _getRangeToRender(): [number, number, number, number] {
        const { width, itemWidth, itemCount, overscanCount } = this.props;
        const { isScrolling, scrollDirection, scrollLeft } = this.state;

        const startIndex = Math.max(
            0,
            Math.min(itemCount - 1, Math.floor(scrollLeft / itemWidth)),
        );
        const numVisibleColumns = Math.ceil(width / itemWidth);
        const stopColumnIndex = Math.max(
            0,
            Math.min(itemCount - 1, startIndex + numVisibleColumns),
        );

        const overscanCountResolved = overscanCount || 1;
        const overscan = Math.max(1, overscanCountResolved);

        return [
            Math.max(0, startIndex - overscan),
            Math.max(0, Math.min(itemCount - 1, stopColumnIndex + overscan)),
            startIndex,
            stopColumnIndex,
        ];
    }

    _onScroll = (event: any): void => {
        const { clientWidth, scrollLeft, scrollWidth } = event.currentTarget;

        this.setState((prevState) => {
            if (prevState.scrollLeft === scrollLeft) {
                return null;
            }

            const calculatedScrollLeft = Math.max(
                0,
                Math.min(scrollLeft, scrollWidth - clientWidth),
            );

            return {
                isScrolling: true,
                scrollLeft: calculatedScrollLeft,
                scrollDirection:
                    prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
                scrollUpdateWasRequested: false,
            };
        }, this._resetIsScrollingDebounced);
    };

    _resetIsScrollingDebounced = (): void => {
        if (this._resetIsScrollingTimeoutId !== null) {
            cancelTimeout(this._resetIsScrollingTimeoutId);
        }

        /*this._resetIsScrollingTimeoutId = requestTimeout(
            this._resetIsScrolling,
            IS_SCROLLING_DEBOUNCE_INTERVAL,
        );*/
    };

    _resetIsScrolling = (): void => {
        this._resetIsScrollingTimeoutId = null;

        this.setState({ isScrolling: false });
    };

    render() {
        const {
            itemCount,
            itemWidth,
            children,
            itemKey = defaultKey,
            data,
            width,
            height,
        } = this.props;
        const { isScrolling } = this.state;
        const [overscanStartIndex, overscanStopIndex] = this._getRangeToRender();

        let items = [];
        for (
            let itemIndex = overscanStartIndex;
            itemIndex < overscanStopIndex;
            itemIndex++
        ) {
            items.push(
                createElement(children, {
                    itemIndex,
                    isScrolling,
                    key: itemKey({ itemIndex }),
                    data,
                    style: {
                        position: 'absolute',
                        left: itemIndex * itemWidth,
                        width: itemWidth,
                    },
                }),
            );
        }
        return createElement(
            'div',
            {
                onScroll: this._onScroll,
                style: {
                    position: 'relative',
                    overflow: 'scroll',
                    willChange: 'scroll-position',
                    width,
                    height,
                },
            },
            createElement('div', {
                style: {
                    height: '100%',
                    width: `${itemCount * itemWidth}px`,
                    pointerEvents: isScrolling ? 'none' : undefined,
                },
                children: items,
            }),
        );
    }
}

export default InfiniteCarousel;