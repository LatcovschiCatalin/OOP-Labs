import * as fs from "fs";
import {Faculty} from "./Faculty";
import {Student} from "./Student";
import {Logger} from "./Logger";
import {StudyField} from "./StudyField";
import {SaveManager} from "./SaveManager";

const saveManager = new SaveManager('data.json');
const students: Student[] = saveManager.load().students;
const operationLogger = new Logger('logs.txt');

export class University {
    faculties: Faculty[] = [];

    isFieldValid(field) {
        return Object.keys(StudyField).includes(field);
    }
    createFaculty(name: string, field: StudyField) {
        if (this.isFieldValid(field)) {
            const faculty = new Faculty(name, StudyField[field]);
            this.faculties.push(faculty);
            operationLogger.log('INFO', `Create Faculty ${name} (${field})`);
            return faculty;
        } else {
            operationLogger.log('ERROR', `${field} is an invalid Study Field.`);
            console.log('Invalid field type. Please provide a valid StudyField.');
        }
    }

    findFacultyByEmail(email: string) {
        const student = students.find(student => student.email === email);
        return student ? student.faculty : null;
    }

    displayFaculties() {
        console.log("University Faculties:");
        this.faculties.forEach(faculty => {
            console.log(`- ${faculty.name} (${faculty.field})`);
        });
        operationLogger.log('INFO', 'Displayed all faculties.');
    }

    displayFacultiesByField(field: string) {
        console.log(`Faculties in the field ${field}:`);
        this.faculties
            .filter(faculty => faculty.field === field)
            .forEach(faculty => {
                console.log(`- ${faculty.name}`);
            });
        operationLogger.log('INFO', `Displayed faculties in the field ${field}.`);
    }

    batchEnrollStudents(filename: string) {
        try {
            const fileData = fs.readFileSync(filename, 'utf8');
            const lines = fileData.split('\n');
            for (const line of lines) {
                const [name, email, facultyName] = line.split(',');
                const faculty = this.faculties.find(f => f.name === facultyName);
                if (faculty) {
                    const student = new Student(name, email);
                    students.push(student);
                    faculty.enrollStudent(student);
                    operationLogger.log('INFO', `Batch Enrollment ${student.name} in ${faculty.name}`);
                } else {
                    operationLogger.log('ERROR', `Faculty ${facultyName} not found for ${name} (${email})`);
                }
            }
            console.log('Batch enrollment completed.');
        } catch (error) {
            operationLogger.log('ERROR', `Failed to read or process the batch enrollment file: ${error.message}`);
        }
    }

    batchGraduateStudents(filename: string) {
        try {
            const fileData = fs.readFileSync(filename, 'utf8');
            const emailsToGraduate = fileData.split('\n');
            for (const email of emailsToGraduate) {
                const student = students.find(s => s.email === email);
                if (student) {
                    const faculty = student.faculty;
                    if (faculty) {
                        faculty.graduateStudent(student);
                        operationLogger.log('INFO', `Batch Graduation ${student.name} from ${faculty.name}`);
                    } else {
                        operationLogger.log('ERROR', `${student.name} is not enrolled in any faculty.`);
                    }
                } else {
                    operationLogger.log('ERROR', `Student with email ${email} not found for batch graduation.`);
                }
            }
            console.log('Batch graduation completed.');
        } catch (error) {
            operationLogger.log('ERROR', `Failed to read or process the batch graduation file: ${error.message}`);
        }
    }
}