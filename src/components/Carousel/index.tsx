import React, { Component } from 'react';
import { FixedSizeList as List, ListOnScrollProps, ListChildComponentProps} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import './style.scss';
import ArrowButton from '../ArrowButton';

interface CarouselState {
    offset: number,
    arrowsVisible: boolean
}

interface CarouselProps {
    height: number;
    itemCount: number;
    itemSize: number;
    itemOffset: number;
    renderItem: (props: ListChildComponentProps) => any;
}

class Carousel extends Component<CarouselProps, CarouselState> {
    static defaultProps = { itemOffset: 0 };
    state: CarouselState = {
        offset: 0,
        arrowsVisible: false
    };    
    scrollableContainerRef: any;
    constructor(props: CarouselProps) {
        super(props);
        this.scrollableContainerRef = React.createRef();
        this._onScroll = this._onScroll.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._backward = this._backward.bind(this);
        this._forward = this._forward.bind(this);
    }   

    //Return the right gap to add to offset to ensure that last/first cropped item will be full visible after a backward/forward action
    _computeGap() : number {
        const itemsCountDisplayed = (window.innerWidth / this.props.itemSize);
        const itemRest = itemsCountDisplayed % 1; 
        return itemRest * this.props.itemSize;
    }

    _forward() :void {
        this.setState((prevState) => {
            let offset = prevState.offset;
            if (offset === 0) {
                offset += window.innerWidth - this._computeGap() + this.props.itemOffset;
            } else {
                offset += window.innerWidth - this._computeGap();
            }
            this.scrollableContainerRef.current.scrollTo({
                left: offset,
                top: 0,
                behavior: 'smooth',
            });
            return { offset: offset }
        });
        this._isEnd();
    }

    _backward() : void {
        this.setState((prevState) => {
            let offset = prevState.offset;
            //Offset value after the first forward action
            const firstOffset = window.innerWidth + this._computeGap() + this.props.itemOffset;
            if (offset <= firstOffset) {
                offset = 0;
            } else {
                offset -= window.innerWidth - this._computeGap()
            }
            this.scrollableContainerRef.current.scrollTo({
                left: offset,
                top: 0,
                behavior: 'smooth',
            });
            return { offset: offset}
        });
    }

    _onScroll(props: ListOnScrollProps) {
        const { scrollOffset } = props;
        this.setState({offset: scrollOffset});
    }

    _setArrowsVisibility = (isVisible : boolean) => {
        this.setState({arrowsVisible: isVisible})
    }

    _renderItem(props: ListChildComponentProps) {
        const { style, index } = props;
        return (
            <div key={index} style={{ ...style, paddingLeft: this.props.itemOffset}}>
                {this.props.renderItem(props)}
            </div>
        );
    }

    _isEnd() : boolean {
        const maxOffset = (this.props.itemSize * this.props.itemCount) - window.innerWidth + this.props.itemOffset;
        return this.state.offset >= maxOffset;        
    }

    render() {
        return (
            <div className="px__mwc__carousel" style={{height: this.props.height}} 
                onMouseEnter={() => this._setArrowsVisibility(true)}
                onMouseLeave={() => this._setArrowsVisibility(false)}>
                <AutoSizer>                    
                    {({ width }) => (
                        <div>
                            <div className={`px__mwc__arrow px__mwc__arrow--left ${this.state.offset === 0 || !this.state.arrowsVisible ? 'hidden' :''}`} 
                                style={{ height: `${this.props.height}px`}}>
                                <ArrowButton onClick={this._backward} height={45} width={45} />
                            </div>     
                            <div className={`px__mwc__arrow px__mwc__arrow--right ${!this.state.arrowsVisible || this._isEnd() ? 'hidden':''}`} 
                                style={{ height: `${this.props.height}px`}}>
                                <ArrowButton onClick={this._forward} direction="right" height={45} width={45} />
                            </div>

                            <List
                                className="px__mwc__carousel__component"
                                outerRef={this.scrollableContainerRef}
                                height={this.props.height}
                                width={width}
                                itemCount={this.props.itemCount}
                                itemSize={this.props.itemSize}
                                layout="horizontal"
                                onScroll={this._onScroll}
                                useIsScrolling
                            >
                                {this._renderItem}
                            </List>
                        </div>
                       )}
                </AutoSizer>
            </div>
        );
    }
};

export default Carousel;