import * as fs from 'fs';
import {Faculty} from "./Faculty";
import {Student} from "./Student";

export class SaveManager {
    private readonly filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    save(data: any) {
        const replacer = (key, value) => {
            if (value instanceof Faculty) {
                return { name: value.name, students: value.students.map(student => student.name) };
            }
            if (value instanceof Student) {
                return { name: value.name, email: value.email, faculty: value.faculty };
            }
            return value;
        };

        const json = JSON.stringify(data, replacer, 2);
        fs.writeFileSync(this.filename, json);
    }

    load() {
        try {
            const json = fs.readFileSync(this.filename, 'utf8');
            return JSON.parse(json);
        } catch (error) {
            return null;
        }
    }
}
