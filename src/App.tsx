import React, {Component} from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Carousel from './components/Carousel';
import data from "./data.json";
import { ListChildComponentProps } from 'react-window';

interface AppState {
  items: any[]
}

class App extends Component<{}, AppState> {
  state: AppState = {
    items: []
  }

  renderItem(props: ListChildComponentProps) {
    const { index } = props;
    return (
        <div className="item">
          <div className="img-container">
            <img alt={this.state.items[index].name} src={this.state.items[index].image.Original}></img>
          </div>          
          <span className="text-content">
            {this.state.items[index].name}
          </span>
        </div>
    );
  }

  componentDidMount() {
    this._initChannels();
  }

  _initChannels() {
    const channels = data.channels.map((channel: any) => {
      const live = data.live.filter((item) => item.channelId === channel.id);
      if (live) {
        channel.image = live[0].image;
      }
      return channel;
    });
    this.setState({
      items: channels
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <div className="swimlane">
                <h2 style={{ paddingLeft: '0.5rem' }}>More than 300 items</h2>
                <Carousel renderItem={(params) => this.renderItem(params)} itemCount={this.state.items.length} height={200} itemSize={250} />
              </div>
              {/*<div className="swimlane">
                <h2 style={{paddingLeft: '3.5rem'}}>Only 20 items with offset</h2>
                <Carousel renderItem={(params) => this.renderItem(params)} itemCount={20} height={300} itemSize={350} itemOffset={50} />
              </div>*/}
            </Route>    
            <Route exact path="/test">
              <div style={{ display: 'flex', width: 'fit-content' }}>
                {this.state.items.map((item) => (
                  <div className="item" key={item.id} style={{ height: "250px", width: "250px" }}>
                    <div className="img-container">
                      <img alt={item.name} src={item.image.Original}></img>
                    </div>
                    <span className="text-content">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div> 
            </Route>       
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
