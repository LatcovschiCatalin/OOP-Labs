export interface StackQueueInterface {
    isFull(): boolean;
    isEmpty(): boolean;
    pushOperation(element: Object): void;
    popOperation(): void;
    peekOperation(): Object;
    printAll(): void;
}