import { StackQueueInterface } from "./StackQueue.interface";

export class QueueArrayDown implements StackQueueInterface {
    private list: Object[];
    private capacity: number;
    private count: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.list = new Array(this.capacity);
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
        } else {
            this.list[this.count] = element;
            this.count -= 1;
        }
    }

    popOperation(): void {
        if (this.isEmpty()) {
            console.log("Queue is empty!");
        } else {
            for (let i = this.capacity - 1; i > this.count + 1; i--) {
                this.list[i] = this.list[i - 1];
            }
            this.count += 1;
        }
    }

    peekOperation(): Object {
        if (this.isEmpty()) {
            console.log("Queue is empty!");
            return null;
        } else {
            return this.list[this.capacity - 1];
        }
    }

    printAll(): void {
        if (this.isEmpty()) {
            console.log("Queue is empty!");
        } else {
            let i = this.capacity - 1;
            console.log("---------------------------------------------------");
            while (i !== this.count) {
                console.log(this.list[i]);
                i -= 1;
            }
        }
    }
}
