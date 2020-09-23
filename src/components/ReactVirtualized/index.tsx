import React, { Component } from 'react';
import { Grid, GridCellProps, AutoSizer, ScrollParams } from "react-virtualized";
const rowCount = 10;

interface CarouselState {
    itemId: number;
    offset: number;
    items: any[];
}

class ReactVirtualized extends Component<{}, CarouselState> {
    carousel : any;
    scrollableContainerRef: any;
    mounted : boolean = false;
    state : CarouselState = {
        itemId: 0,
        offset: 0,
        items: []
    }
    constructor(props : any) {
        super(props);
        this.renderCell = this.renderCell.bind(this);
        this.scrollableContainerRef = React.createRef();        
    }

    componentDidMount() {
        this.mounted = true;
        this.setState({
            items: Array(rowCount).fill({}).map((val, idx) => {
                return {
                    id: idx,
                    name: 'John Doe',
                    image: 'http://via.placeholder.com/40',
                }
            })
        });
    }

    renderCell(props : GridCellProps) {
        const { columnIndex, style, key } = props;
        return (
            <div key={key} style={style}>
                {columnIndex}
                <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" style={{ height: '20rem' }} alt="Ntest"></img>                
            </div>
        );
    }

    prevWithBlink() {
        this.setState((prevState) => {
            return {
                itemId: prevState.itemId <= 0 ? 0 : prevState.itemId - 4
            }           
        });
    }

    nextWithBlink() {
      this.setState((prevState) => {
          return {
              itemId: prevState.itemId + 4
          }          
        });
    }

    onScroll(params: ScrollParams) {
        console.log(Math.abs(params.scrollWidth - params.scrollLeft) );
        console.log(params.clientWidth);
        if (Math.abs(params.scrollWidth - params.scrollLeft) >= params.clientWidth) {
            this.setState({
                items: this.state.items.concat(Array(rowCount).fill({}).map((val, idx) => {
                    return {
                        id: idx,
                        name: 'John Doe',
                        image: 'http://via.placeholder.com/40',
                    }
                }))
            })
        }
        //if (params.scrollLeft - params.scrollWidth )
       /* if (params.scrollWidth / 2 <= params.scrollLeft) {
            this.setState({
                items: this.state.items.concat(Array(rowCount).fill({}).map((val, idx) => {
                    return {
                        id: idx,
                        name: 'John Doe',
                        image: 'http://via.placeholder.com/40',
                    }
                }))
            })
        }*/

    }

    render() {
        return (
            <div className="App">
                <div>
                    <button onClick={() => { this.prevWithBlink() }}>Prev with blink</button>
                    <button onClick={() => { this.nextWithBlink() }}>Next with blink</button>
                </div>
                <div className="list">
                        <AutoSizer>
                            {({ height, width }) => (
                                <Grid
                                    style={{ scrollBehavior: 'smooth' }}
                                    columnCount={this.state.items.length}
                                    columnWidth={400}
                                    width={width}
                                    height={500}
                                    rowHeight={400}
                                    cellRenderer={this.renderCell}
                                    rowCount={1}
                                    scrollToColumn={this.state.itemId}
                                    scrollToAlignment="start"
                                    outerRef={this.scrollableContainerRef}
                                    onScroll={(params) => this.onScroll(params)}
                                />
                            )}
                        </AutoSizer>                                
                </div>                
            </div>
        );
    }
};

export default ReactVirtualized;