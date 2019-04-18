import React, { Component } from 'react';
import './App.css';
import BaseComponent from './UI/Base.comp';
import { BrowserRouter } from 'react-router-dom';

import { graphql, QueryRenderer } from 'react-relay';
import history from './history';

import TaskList from './UI/TaskList/TaskList';

import relayEnvironment from './relayEnvironment';

class App extends Component {

  render() {
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
            query AppQuery {
              tasks {
                ...TaskList_tasks
              }
            }
          `
        }
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return (
            <div className="App">
              {/* <BrowserRouter>
                <BaseComponent />
              </BrowserRouter> */}
              <TaskList />
            </div>
          )
        }}
      />
    );
  }
}

export default App;
