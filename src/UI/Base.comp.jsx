import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import TaskList from './TaskList/TaskList';

export default class BaseComponent extends React.Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={SignUp}/>
                <Route path="/tasks" exact component={TaskList}/>
            </div>
        )
    }
}