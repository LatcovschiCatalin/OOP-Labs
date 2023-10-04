import {Student} from "./Student";
import {StudyField} from "./StudyField";

export class Faculty {
    students: Student[] = [];

    constructor(public name: string, public field: StudyField) {
    }

    enrollStudent(student: Student) {
        student.faculty = this;
        this.students.push(student);
    }

    graduateStudent(student: Student) {
        if (student.faculty === this) student.faculty = null;
    }

    getCurrentStudents() {
        return this.students.filter(student => student.faculty === this);
    }

    getGraduates() {
        return this.students.filter(student => student.faculty !== this);
    }
}
