import React from 'react';
import TaskListItem from './TaskListItem/TaskListItem';

import {
    createFragmentContainer,
    graphql
} from 'react-relay';

import './taskList.css';

class TaskList extends React.Component {

    handleCheck = (taskId) => {
        console.log("Chekced");
    }

    render() {

        let taskList = [];

        if (this.props.tasks) {
            taskList = this.props.tasks.map((task) => {
                return (
                    <div key={task.__id}>
                        <TaskListItem task={task} handleCheck={this.handleCheck}/>
                    </div>
                );
            });
        }

        return (
            <div>
                {taskList}
            </div>
        )
    }
}

const TaskListContainer = createFragmentContainer(
    TaskList,
    graphql`
        fragment TaskList_tasks on task @relay(plural: true){
            ...TaskListItem_task
        }
    `
);

export default TaskListContainer;
