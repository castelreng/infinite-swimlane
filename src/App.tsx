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

interface AppState {
  items: any[]
}

class App extends Component<{}, AppState> {
  state: AppState = {
    items: []
  }

  renderItem(props: any) {
    const { style, index } = props;
    return (
      <div key={index} style={style}>
        <div className="item">
          <img src={this.state.items[index].image.Original}></img>
          <span className="text-content">
            {this.state.items[index].name}
          </span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const channels = data.channels.map((channel : any) => {
      const live = data.live.filter((item) => item.channelId === channel.id);
      if(live) {
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

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <ReactVirtualized/>
            </Route>
            <Route exact path="/test">              
              <div style={{ padding: '2rem 0', backgroundColor: '#000' }}>
                <Carousel renderItem={(params) => this.renderItem(params)} itemCount={this.state.items.length} height={200} itemSize={250} />
              </div>
              <div style={{ padding: '2rem 0', backgroundColor: '#000'  }}>
                <Carousel renderItem={(params) =>this.renderItem(params)}  itemCount={this.state.items.length} height={200} itemSize={250} />
                </div>                          
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
