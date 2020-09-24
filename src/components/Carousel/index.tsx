import React, { Component } from 'react';
import { FixedSizeList as List, ListOnScrollProps, ListChildComponentProps} from 'react-window';
import { AutoSizer } from 'react-virtualized';
import './style.scss';

interface CarouselState {
    offset: number,
    arrowsVisible: boolean
}

interface CarouselProps {
    height: number;
    itemCount: number;
    itemSize: number;
    renderItem: (props: ListChildComponentProps) => any;

}

class Carousel extends Component<CarouselProps, CarouselState> {
    state: CarouselState = {
        offset: 0,
        arrowsVisible: false
    };
    scrollableContainerRef: any;
    constructor(props: CarouselProps) {
        super(props);
        this.scrollableContainerRef = React.createRef();
    }   

    _forward() {
        this.setState((prevState) => {
            const offset = prevState.offset + (window.innerWidth - this.props.itemSize / 2);
            this.scrollableContainerRef.current.scrollTo({
                left: offset,
                top: 0,
                behavior: 'smooth',
            });
            return { offset: offset }
        });
    }

    _backward() {
        this.setState((prevState) => {
            const offset = prevState.offset - (window.innerWidth - this.props.itemSize / 2);
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

    _setArrowsVisibility(isVisible : boolean) {
        this.setState({arrowsVisible: isVisible})
    }

    _renderItem(props: ListChildComponentProps) {
        const { style, index } = props;
        return (
            <div key={index} style={style}>
                {this.props.renderItem(props)}
            </div>
        );
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
                                <button onClick={() => { this._backward() }}>Prev</button>
                            </div>     
                            <div className={`px__mwc__arrow px__mwc__arrow--right ${!this.state.arrowsVisible ? 'hidden':''}`} 
                                style={{ height: `${this.props.height}px`}}>
                                <button onClick={() => { this._forward() }}>Next</button>
                            </div>

                            <List
                                className="px__mwc__carousel__component"
                                outerRef={this.scrollableContainerRef}
                                height={this.props.height}
                                width={width}
                                itemCount={this.props.itemCount}
                                itemSize={this.props.itemSize}
                                layout="horizontal"
                                onScroll={(props) => { this._onScroll(props)}}
                                useIsScrolling
                                initialScrollOffset={20000}
                            >
                                {(props) => this._renderItem(props)}
                            </List>
                        </div>
                       )}
                </AutoSizer>
            </div>
        );
    }
};

export default Carousel;