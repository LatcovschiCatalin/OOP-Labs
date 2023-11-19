import {StackQueueInterface} from "./StackQueue.interface";
import {Node} from "./node"

export class QueueNode implements StackQueueInterface {
    private first: Node | null;
    private capacity: number;
    private count: number;

    constructor(capacity: string) {
        this.capacity = parseInt(capacity);
        this.count = 0;
        this.first = null;
    }

    isEmpty(): boolean {
        return this.first === null;
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

                if (this.first === null) {
                    this.first = newNode;
                } else {
                    let currentNode: Node | null = this.first;
                    while (currentNode.pointNode !== null) {
                        currentNode = currentNode.pointNode;
                    }
                    currentNode.pointNode = newNode;
                }
                this.count += 1;
            } catch (error) {
                console.log("Invalid number format");
                return;
            }
        }
    }

    popOperation(): void {
        if (this.first === null) {
            console.log("Queue is empty!");
        } else {
            this.first = this.first.pointNode;
            this.count--;
        }
    }

    peekOperation(): Object | null {
        if (this.first === null) {
            console.log("Queue is empty!");
            return null;
        } else {
            return this.first.element;
        }
    }

    printAll(): void {
        let currentNode: Node | null = this.first;
        console.log("---------------------------------------------------");
        while (currentNode !== null) {
            console.log(currentNode.element);
            currentNode = currentNode.pointNode;
        }
    }
}