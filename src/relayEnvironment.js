/**
 * Relay environment file is responsible for all the relay 
 * features which will be used.
 */
import {
    installRelayDevTools
} from 'relay-devtools';
import {
    Environment,
    Network,
    RecordSource,
    Store
} from 'relay-runtime';

installRelayDevTools();

// the network component which relay talks to
const network = Network.create((operation, variables) => {
    return fetch(
        'http://localhost:8000/graphql',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query: operation.text,
                variables
            })
        }
    ).then(response => response.json());
});

//store where caching is done
const store = new Store(new RecordSource());

// instantiate the environment.
export default new Environment({
    network,
    store
});