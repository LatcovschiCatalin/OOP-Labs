import {Faculty} from "./Faculty";

export class Student {
    constructor(public name: string, public email: string, public faculty: Faculty | null = null) {
    }
}