import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactVirtualized from './components/ReactVirtualized';
import Carousel from './components/Carousel';

interface AppState {
  items: any[]
}

class App extends Component<{}, AppState> {
  state: AppState = {
    items: []
  }

  renderItem(props: { index: any, style: any }) {
    const { style, index } = props;
    return (
      <div key={index} style={style}>
        Item {index}
        <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" style={{ height: '20rem' }}></img>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      items: Array(100).fill({}).map((val, idx) => {
        return {
          id: idx,
          name: 'John Doe',
          image: 'http://via.placeholder.com/40',
        }
      })
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
              <Carousel renderItem={this.renderItem} items={this.state.items}/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
