import {StackQueueInterface} from "./StackQueue.interface";
import {Node} from "./node"

export class StackNode implements StackQueueInterface {
    private top: Node | null;
    private capacity: number;
    private count: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.count = 0;
        this.top = null;
    }

    isEmpty(): boolean {
        return this.top === null;
    }

    isFull(): boolean {
        return this.count === this.capacity;
    }

    pushOperation(element: Object): void {
        if (this.isFull()) {
            console.log("Not enough capacity!");
        } else {
            try {
                const newNode: Node = new Node(element);
                newNode.pointNode = this.top;
                this.top = newNode;
                this.count += 1;
            } catch (error) {
                console.log("Invalid number format");
                return;
            }
        }
    }

    popOperation(): void {
        if (this.top === null) {
            console.log("Stack is empty!");
        } else {
            this.top = this.top.pointNode;
            this.count--;
        }
    }

    peekOperation(): Object | null {
        if (this.top === null) {
            console.log("Stack is empty!");
            return null;
        } else {
            return this.top.element;
        }
    }

    printAll(): void {
        let currentNode: Node | null = this.top;
        console.log("---------------------------------------------------");
        while (currentNode !== null) {
            console.log(currentNode.element);
            currentNode = currentNode.pointNode;
        }
    }
}