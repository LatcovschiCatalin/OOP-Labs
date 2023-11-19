import { StackQueueInterface } from "./StackQueue.interface";
import * as readlineSync from 'readline-sync';
import {QueueArrayUp} from "./QueueArrUp";
import {StackArrayDown} from "./StackArrDown";
import {StackNode} from "./StackNode";
import {StackArrayUp} from "./StackArrUp";
import {QueueArrayDown} from "./QueueArrDown";

export class Main {

    private takeUserInput(): string {
        return readlineSync.question();
    }

    private takeCapacity(): number {
        let userInput: string = "";
        console.log("Enter the capacity: ");
        userInput = this.takeUserInput();
        try {
            return parseInt(userInput);
        } catch (error) {
            console.log("Invalid number format!");
            process.exit(1);
            return -1;
        }
    }

    public runCommands(dataStructure: StackQueueInterface): void {
        let userInput: string = "";
        while (userInput !== "0") {
            console.log("1 - push, 2 - pop, 3 - peek, 4 - print all, 0 - exit");
            userInput = this.takeUserInput();
            if (userInput === "1") {
                console.log("Enter the new Element: ");
                userInput = this.takeUserInput();
                dataStructure.pushOperation(userInput);
            } else if (userInput === "2") {
                dataStructure.popOperation();
            } else if (userInput === "3") {
                console.log(dataStructure.peekOperation());
            } else if (userInput === "4") {
                dataStructure.printAll();
            }
        }
        process.exit(0);
    }

    public selectType(): void {
        let userInput: string = "";

        while (userInput !== "0") {
            console.log("1 - Stack Array Down\n2 - Stack Array Up\n3 - Stack Link\n4 - Queue Array Down\n5 - Queue Array Up\n6 - Queue Link\n0 - exit");
            userInput = this.takeUserInput();
            if (userInput === "1") {
                let dataStructure: StackQueueInterface = new StackArrayDown(this.takeCapacity());
                this.runCommands(dataStructure);
            } else if (userInput === "2") {
                let dataStructure: StackQueueInterface = new StackArrayUp(this.takeCapacity());
                this.runCommands(dataStructure);
            } else if (userInput === "3") {
                let dataStructure: StackQueueInterface = new StackNode(this.takeCapacity());
                this.runCommands(dataStructure);
            } else if (userInput === "4") {
                let dataStructure: StackQueueInterface = new QueueArrayDown(this.takeCapacity());
                this.runCommands(dataStructure);
            } else if (userInput === "5") {
                let dataStructure: StackQueueInterface = new QueueArrayUp(this.takeCapacity());
                this.runCommands(dataStructure);
            } else if (userInput === "6") {
                let dataStructure: StackQueueInterface = new QueueArrayDown(this.takeCapacity());
                this.runCommands(dataStructure);
            }
        }
    }

    public static main(): void {
        let app: Main = new Main();
        app.selectType();
    }
}

Main.main();