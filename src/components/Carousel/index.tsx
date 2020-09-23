import React, { Component } from 'react';
import { FixedSizeList as List, } from 'react-window';
import { AutoSizer } from 'react-virtualized';
import './style.scss';

interface CarouselState {
    offset: number
}

interface CarouselProps {
    items: any[];
    renderItem: (props: any) => any;
}

class Carousel extends Component<CarouselProps, CarouselState> {
    state: CarouselState = {
        offset: 0
    };
    listRef: any;
    scrollableContainerRef: any;
    constructor(props: any) {
        super(props);
        this.listRef = React.createRef();
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
                    {({ height, width }) => (
                        <div>
                            <div className="px__mwc__arrow px__mwc__arrow--left" style={{height: '350px'}}>
                                <button onClick={() => { this.prev() }} className="">Prev without blink</button>
                            </div>     
                            <div className="px__mwc__arrow px__mwc__arrow--right" style={{ height: '350px' }}>
                                <button onClick={() => { this.next() }} className="">Prev without blink</button>
                            </div>
                            <List
                                className="px__mwc__carousel__component"
                                ref={this.listRef}
                                outerRef={this.scrollableContainerRef}
                                height={350}
                                itemCount={this.props.items.length}
                                itemSize={350}
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