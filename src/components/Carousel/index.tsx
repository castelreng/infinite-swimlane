import React, { Component } from 'react';
import { FixedSizeList as List, } from 'react-window';
import { AutoSizer } from 'react-virtualized';
import './style.scss';

interface CarouselState {
    offset: number
}

interface CarouselProps {
    itemsCount: number;
    height : number;
    itemSize : number;
    renderItem: (props: any) => any;
}

class Carousel extends Component<CarouselProps, CarouselState> {
    state: CarouselState = {
        offset: 0
    };
    scrollableContainerRef: any;
    constructor(props: any) {
        super(props);
        this.scrollableContainerRef = React.createRef();
    }   

    next() {
        this.setState((prevState) => {
            this.scrollableContainerRef.current.scrollTo({
                left: prevState.offset + 1000,
                top: 0,
                behavior: 'smooth',
            });
            return { ...prevState, offset: prevState.offset + 1000 }
        });
    }

    prev() {
        this.setState((prevState) => {
            this.scrollableContainerRef.current.scrollTo({
                left: prevState.offset - 1000,
                top: 0,
                behavior: 'smooth',
            });
            return { ...prevState, offset: prevState.offset - 1000 }
        });
    }

    render() {
        return (
            <div className="px__mwc__carousel">              
                <AutoSizer>
                    {({ width }) => (
                        <div>
                            <div className="px__mwc__arrow px__mwc__arrow--left" style={{ height: `${this.props.height}px`}}>
                                <button onClick={() => { this.prev() }} className="">Prev</button>
                            </div>     
                            <div className="px__mwc__arrow px__mwc__arrow--right" style={{ height: `${this.props.height}px`}}>
                                <button onClick={() => { this.next() }} className="">Next</button>
                            </div>
                            <List
                                className="px__mwc__carousel__component"
                                outerRef={this.scrollableContainerRef}
                                height={this.props.height}
                                itemCount={this.props.itemsCount}
                                itemSize={this.props.itemSize}
                                layout="horizontal"
                                width={width}
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