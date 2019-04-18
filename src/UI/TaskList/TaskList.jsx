import React from 'react';
import TaskListItem from './TaskListItem/TaskListItem';

import {
    createFragmentContainer,
    graphql
} from 'react-relay';

import './taskList.css';

class TaskList extends React.Component {

    listItems = [{
        taskName: "Get milk"
    }, {
        taskName: "Buy bread"
    }, {
        taskName: "Send mail"
    }, {
        taskName: "Pay fee"
    }];

    handleCheck = (taskId) => {
        // call a mutation to update the task status
    }

    render() {

        const taskList = this.listItems.map((task) => {
            return (
                <div key={task.taskName}>
                    <TaskListItem task={task} handleCheck={this.handleCheck} />
                </div>
            );
        });

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
        fragment TaskList_tasks on task {
            ...TaskListItem_task
        }
    `
);

export default TaskListContainer;