import { StackQueueInterface } from "./StackQueue.interface";

export class StackArrayDown implements StackQueueInterface {
    private list: Object[];
    private capacity: number;
    private count: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.list = [];
        this.count = this.capacity - 1;
    }

    isFull(): boolean {
        return this.count === -1;
    }

    isEmpty(): boolean {
        return this.count === this.capacity - 1;
    }

    pushOperation(element: Object): void {
        if (this.isFull()) {
            console.log("Not enough capacity!");
            return;
        }

        this.list.push(element);
        this.count -= 1;
    }

    popOperation(): void {
        if (this.isEmpty()) {
            console.log("Stack is empty!");
            return;
        }

        this.list.pop();
        this.count += 1;
    }

    peekOperation(): Object | null {
        if (this.isEmpty()) {
            console.log("Stack is empty!");
            return null;
        }

        return this.list[this.count + 1];
    }

    printAll(): void {
        if (this.isEmpty()) {
            console.log("Stack is empty!");
            return;
        }

        console.log("---------------------------------------------------");
        this.list.forEach((element) => {
            console.log(element);
        });
    }
}