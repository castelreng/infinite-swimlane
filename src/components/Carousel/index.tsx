import React, { Component } from 'react';
import { FixedSizeList as List, } from 'react-window';
import { AutoSizer } from 'react-virtualized';


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
            <div>
                <div>
                    <button onClick={() => { this.prev() }}>Prev without blink</button>
                    <button onClick={() => { this.next() }}>Next without blink</button>
                </div>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            style={{ scrollBehavior: 'smooth', overflowX: 'hidden' }}
                            ref={this.listRef}
                            outerRef={this.scrollableContainerRef}
                            height={350}
                            itemCount={this.props.items.length}
                            itemSize={350}
                            layout="horizontal"
                            width={width}
                        >
                            {this.props.renderItem}
                        </List>)}
                </AutoSizer>
            </div>
        );
    }
};

export default Carousel;