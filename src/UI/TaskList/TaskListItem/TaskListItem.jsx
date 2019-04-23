import React from 'react';
import { Card, Form } from 'react-bootstrap';

import {
    createFragmentContainer,
    commitMutation,
    graphql
} from 'react-relay';

import './taskListItem.css';

class TaskListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.task.taskDone
        }
    }

    handleCheck = () => {
        this.setState({
            checked: !this.state.checked
        });

        //call the relay mutation to update the task status
        updateTask(this.props.relay.environment, this.props.task.id, !this.state.checked);
    }

    render() {
        const task = this.props.task;

        return (
            <Card className="taskListItem">
                <div className="taskName">
                    {task.taskName}
                </div>
                <Form.Check type="checkbox" className="taskCheck" defaultChecked={this.state.checked}
                    onChange={this.handleCheck} />
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

const mutation = graphql`
  mutation TaskListItemMutation($input: updateTaskStatusType!) {
    checkTask(input: $input) {
      id
      taskName
      taskDone
      authorId
    }
  }
`

const updateTask = (environment, taskId, taskDone) => {
    return commitMutation(
        environment,
        {
            mutation,
            variables: {
                input: { id: taskId, taskDone }
            },
            //executed before the server response, update the proxyStore assuming that the API will repond with positively
            optimisticUpdater: (proxyStore) => {
                const task = proxyStore.get(taskId);
                task.setValue(true, 'taskDone');
            },
            //executed after the actual reponse comes back from the API
            updater: (proxyStore) => {
                //retrieve the actual data that was returned from the API
                const response = proxyStore.getRootField('checkTask');
                const taskDoneResponse = response.getValue('taskDone');

                //update the cache with the actual API response
                const task = proxyStore.get(taskId);
                task.setValue(taskDoneResponse, 'taskDone');
            },
            onCompleted: (response, errors) => {
                if (errors) {
                    console.log("Errors " + errors);
                } else {
                    console.log("Mutated successfully");
                }
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );
}

export default TaskListItemContainer;