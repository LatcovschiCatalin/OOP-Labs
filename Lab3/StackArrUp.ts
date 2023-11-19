import { StackQueueInterface } from "./StackQueue.interface";

export class StackArrayUp implements StackQueueInterface {
    private list: Object[];
    private count: number;
    private capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.list = new Array(this.capacity);
        this.count = 0;
    }

    isFull(): boolean {
        return this.count === this.capacity;
    }

    isEmpty(): boolean {
        return this.count === 0;
    }

    pushOperation(element: Object): void {
        if (this.isFull()) {
            console.log("Not enough capacity!");
        } else {
            this.list[this.count] = element;
            this.count += 1;
        }
    }

    popOperation(): void {
        if (this.isEmpty()) {
            console.log("Stack is empty!");
        } else {
            this.count -= 1;
        }
    }

    peekOperation(): Object | null {
        if (this.isEmpty()) {
            console.log("Stack is empty!");
            return null;
        } else {
            return this.list[this.count - 1];
        }
    }

    printAll(): void {
        if (this.isEmpty()) {
            console.log("Stack is empty!");
        } else {
            let i = this.count;
            console.log("---------------------------------------------------");
            while (i > 0) {
                console.log(this.list[i - 1]);
                i -= 1;
            }
        }
    }
}