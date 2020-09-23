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
          <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"></img>
          <div>testst</div>
        </div>
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
              <Carousel renderItem={this.renderItem} itemCount={this.state.items.length} height={200} itemSize={250}/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
