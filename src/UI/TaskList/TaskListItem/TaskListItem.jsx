import React from 'react';
import { Card, Form } from 'react-bootstrap';

import {
    createFragmentContainer,
    graphql
} from 'react-relay';

import './taskList.css';

class TaskListItem extends React.Component {

    render() {
        const task = this.props.task;

        return (
            <Card className="taskListItem">
                <div className="taskName">
                    {task.taskName}
                </div>
                <Form.Check type="checkbox" className="taskCheck" defaultChecked={task.taskDone} onChange={() => { }} />
            </Card>
        )
    }
}

const TaskListItemContainer = createFragmentContainer(
    TaskListItem,
    graphql`
        fragment TaskListItem_task on task {
            id
            taskName
            taskDone
            authorId
        }
    `
);

export default TaskListItemContainer;