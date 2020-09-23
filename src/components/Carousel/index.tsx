import React, { Component } from 'react';
import { FixedSizeList as List, ListOnScrollProps, ListChildComponentProps} from 'react-window';
import { AutoSizer } from 'react-virtualized';
import './style.scss';

interface CarouselState {
    offset: number
}

interface CarouselProps {
    itemCount: number;
    height : number;
    itemSize : number;
    renderItem: (props: ListChildComponentProps) => any;
}

class Carousel extends Component<CarouselProps, CarouselState> {
    state: CarouselState = {
        offset: 0
    };
    scrollableContainerRef: any;
    listRef : any;
    constructor(props: any) {
        super(props);
        this.scrollableContainerRef = React.createRef();
        this.listRef = React.createRef();
    }   

    _forward() {
        this.setState((prevState) => {
            this.scrollableContainerRef.current.scrollTo({
                left: prevState.offset + 1000,
                top: 0,
                behavior: 'smooth',
            });
            return { ...prevState, offset: prevState.offset + 1000 }
        });
    }

    _backward() {
        this.setState((prevState) => {
            this.scrollableContainerRef.current.scrollTo({
                left: prevState.offset - 1000,
                top: 0,
                behavior: 'smooth',
            });
            return { ...prevState, offset: prevState.offset - 1000 }
        });
    }

    _onScroll(props: ListOnScrollProps) {
        const { scrollOffset } = props;
        this.setState({offset: scrollOffset});
    }

    render() {
        return (
            <div className="px__mwc__carousel" style={{height: this.props.height}}>
                <AutoSizer>                    
                    {({ width }) => (
                        <div>
                            <div className={`px__mwc__arrow px__mwc__arrow--left ${this.state.offset == 0 ? 'hidden' :''}`} 
                                style={{ height: `${this.props.height}px`}}>
                                <button onClick={() => { this._backward() }}>Prev</button>
                            </div>     
                            <div className="px__mwc__arrow px__mwc__arrow--right" style={{ height: `${this.props.height}px`}}>
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
                            >
                                {this.props.renderItem}
                            </List>
                        </div>
                       )}
                </AutoSizer>
            </div>
        );
    }
};

export default Carousel;