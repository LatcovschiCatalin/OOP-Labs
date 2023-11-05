import Folder from './Folder';
const readline = require('readline');

const folder = new Folder();

function executeAction(action: string, filename?: string) {
    switch (action) {
        case 'status':
            folder.status();
            break;
        case 'commit':
            folder.commit();
            console.log('Snapshot has been updated.');
            break;
        case 'info':
            if (filename) {
                folder.info(filename);
            } else {
                console.log('Please provide a filename for the "info" action.');
            }
            break;
        case 'exit':
            console.log('Exiting the program.');
            process.exit(0); // Exit the program
            break;
        default:
            console.log('Invalid action. Supported actions are: "status", "commit", "info", or "exit".');
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getUserInput() {
    rl.question('Enter action (status, commit, info, or exit): ', (action) => {
        handleUserAction(action);
    });
}

function handleUserAction(action: string) {
    if (['status', 'commit', 'info', 'exit'].includes(action)) {
        if (action === 'info') {
            rl.question('Enter filename: ', (filename) => {
                executeAction(action, filename);
                // Continue the loop
                getUserInput();
            });
        } else {
            executeAction(action);
            // Continue the loop
            getUserInput();
        }
    } else {
        console.log('Invalid action. Supported actions are: "status", "commit", "info", or "exit".');
        // Continue the loop
        getUserInput();
    }
}

getUserInput();