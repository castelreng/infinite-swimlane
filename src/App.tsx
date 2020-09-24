import React, {Component} from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactVirtualized from './components/ReactVirtualized';
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
          <img alt={this.state.items[index].name} src={this.state.items[index].image.Original}></img>
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
          <nav>
            <ul>
              <li>
                <Link to="/">React virtualized</Link>
              </li>
              <li>
                <Link to="/test">React window</Link> 
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <ReactVirtualized/>
            </Route>
            <Route exact path="/test">              
              <div className="swimlane">
                <Carousel renderItem={(params) => this.renderItem(params)} itemCount={this.state.items.length} height={200} itemSize={250} />
              </div>
              <div className="swimlane">
                <Carousel renderItem={(params) =>this.renderItem(params)}  itemCount={this.state.items.length} height={300} itemSize={350} />
              </div>                          
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
