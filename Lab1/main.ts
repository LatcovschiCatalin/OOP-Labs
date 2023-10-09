import {Faculty} from "./Faculty";
import {University} from "./University";
import {Student} from "./Student";
import {SaveManager} from "./SaveManager";
import {Logger} from "./Logger";

const university = new University();
const saveManager = new SaveManager('data.json');
const operationLogger = new Logger('logs.txt');
const students: Student[] = saveManager.load().students;
const savedData = saveManager.load();
if (savedData) {
    university.faculties = savedData.faculties.map((facultyData: any) => {
        const faculty = new Faculty(facultyData.name, facultyData.field);
        faculty.students = students.filter(student => student.faculty && student.faculty.name === faculty.name);
        return faculty;
    });
    students.length = 0;
    students.push(...savedData.students.map((studentData: any) => new Student(studentData.name, studentData.email)));
}

function showMenu() {
    console.log("\nTUM Board - Interactive Command Line");
    console.log("Faculty Operations:");
    console.log("1. Create and Assign a Student to a Faculty");
    console.log("2. Graduate a Student from a Faculty");
    console.log("3. Display Current Enrolled Students");
    console.log("4. Display Graduates");
    console.log("5. Check if a Student Belongs to a Faculty");
    console.log("\nGeneral Operations:");
    console.log("6. Create a New Faculty");
    console.log("7. Find Faculty by Student Email");
    console.log("8. Display University Faculties");
    console.log("9. Display Faculties by Field");
    console.log("0. Exit");
    console.log("Choose an option:");
}

showMenu();

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", (input) => {
    switch (input) {
        case "1":
            // Create and Assign a Student to a Faculty
            rl.question("Enter student name: ", (name) => {
                rl.question("Enter student email: ", (email) => {
                    rl.question("Enter faculty name: ", (facultyName) => {
                        const faculty = university.faculties.find(f => f.name === facultyName);
                        if (faculty) {
                            const student = new Student(name, email);
                            students.push(student);
                            faculty.enrollStudent(student);
                            console.log(`Enrolled ${student.name} in ${faculty.name}.`);
                            operationLogger.log('INFO', `Create and Assign ${student.name} to ${faculty.name}`);
                        } else {
                            console.log(`Faculty ${facultyName} not found.`);
                            operationLogger.log('ERROR', `Faculty ${facultyName} not found for student ${name} (${email})`);
                        }
                        showMenu();
                    });
                });
            });
            break;
        case "2":
            // Graduate a Student from a Faculty
            rl.question("Enter student email: ", (email) => {
                const student = students.find(s => s.email === email);
                if (student) {
                    const faculty = student.faculty;
                    if (faculty) {
                        faculty.graduateStudent(student);
                        console.log(`Graduated ${student.name} from ${faculty.name}.`);
                        operationLogger.log('INFO', `Graduate Student ${student.name} from ${faculty.name}`);
                    } else {
                        console.log(`${student.name} is not enrolled in any faculty.`);
                        operationLogger.log('WARN', `${student.name} is not enrolled in any faculty. Cannot graduate.`);
                    }
                } else {
                    console.log(`Student with email ${email} not found.`);
                    operationLogger.log('ERROR', `Student with email ${email} not found for graduation.`);
                }
                showMenu();
            });
            break;
        case "3":
            // Display Current Enrolled Students
            university.faculties.forEach(faculty => {
                const currentStudents = faculty.getCurrentStudents();
                console.log(`Current students in ${faculty.name}:`);
                currentStudents.forEach(student => {
                    console.log(`- ${student.name} (${student.email})`);
                });
            });
            operationLogger.log('INFO', 'Displayed current students in all faculties.');
            showMenu();
            break;
        case "4":
            // Display Graduates
            university.faculties.forEach(faculty => {
                const graduates = faculty.getGraduates();
                console.log(`Graduates from ${faculty.name}:`);
                graduates.forEach(student => {
                    console.log(`- ${student.name} (${student.email})`);
                });
            });
            operationLogger.log('INFO', 'Displayed graduates from all faculties.');
            showMenu();
            break;
        case "5":
            // Check if a Student Belongs to a Faculty
            rl.question("Enter student email: ", (email) => {
                const student = students.find(s => s.email === email);
                if (student) {
                    if (student.faculty) {
                        console.log(`${student.name} belongs to ${student.faculty.name}.`);
                        operationLogger.log('INFO', `Check Student Belonging ${student.name} belongs to ${student.faculty.name}`);
                    } else {
                        console.log(`${student.name} is not enrolled in any faculty.`);
                        operationLogger.log('INFO', `Check Student Belonging ${student.name} is not enrolled in any faculty.`);
                    }
                } else {
                    console.log(`Student with email ${email} not found.`);
                    operationLogger.log('ERROR', `Student with email ${email} not found for belonging check.`);
                }
                showMenu();
            });
            break;
        case "6":
            // Create a New Faculty
            rl.question("Enter faculty name: ", (name) => {
                rl.question("Enter faculty field: ", (field) => {
                    const faculty = university.createFaculty(name, field);
                    console.log(`Created new faculty: ${faculty.name} (${faculty.field})`);
                    operationLogger.log('INFO', `Create Faculty ${faculty.name} (${faculty.field})`);
                    showMenu();
                });
            });
            break;
        case "7":
            // Find Faculty by Student Email
            rl.question("Enter student email: ", (email) => {
                const faculty = university.findFacultyByEmail(email);
                if (faculty) {
                    console.log(`Faculty for student with email ${email}: ${faculty.name}`);
                    operationLogger.log('INFO', `Find Faculty for student with email ${email}: ${faculty.name}`);
                } else {
                    console.log(`Student with email ${email} not found in any faculty.`);
                    operationLogger.log('WARN', `Student with email ${email} not found in any faculty.`);
                }
                showMenu();
            });
            break;
        case "8":
            // Display University Faculties
            university.displayFaculties();
            operationLogger.log('INFO', 'Displayed all university faculties.');
            showMenu();
            break;
        case "9":
            // Display Faculties by Field
            rl.question("Enter field: ", (field) => {
                university.displayFacultiesByField(field);
                operationLogger.log('INFO', `Displayed faculties in the field ${field}.`);
                showMenu();
            });
            break;
        case "0":
            // Exit
            rl.close();
            break;
        default:
            operationLogger.log('WARN', 'Invalid option selected.');
            showMenu();
    }
});

function saveState() {
    const dataToSave = {
        faculties: university.faculties,
        students: students,
    };
    saveManager.save(dataToSave);
}

process.on('exit', () => {
    saveState();
});

function handleExtraOperations(input: string, email: string) {
    const operationParts = input.split(' ');
    const operation = operationParts[0].toLowerCase();
    const args = operationParts.slice(1);

    switch (operation) {
        case 'batchenroll':
            if (args.length !== 1) {
                console.log('Error: Batch Enrollment operation requires a filename.');
                operationLogger.log('ERROR', 'Batch Enrollment operation requires a filename.');
            } else {
                university.batchEnrollStudents(args[0]);
                operationLogger.log('INFO', `Batch enrollment completed using file: ${args[0]}`);
            }
            break;
        case 'batchgraduate':
            if (args.length !== 1) {
                console.log('Error: Batch Graduation operation requires a filename.');
                operationLogger.log('ERROR', 'Batch Graduation operation requires a filename.');
            } else {
                university.batchGraduateStudents(args[0], email);
                operationLogger.log('INFO', `Batch graduation completed using file: ${args[0]}`);
            }
            break;
        default:
            console.log('Error: Invalid operation. Supported operations are: batchenroll, batchgraduate');
            operationLogger.log('ERROR', 'Invalid operation. Supported operations are: batchenroll, batchgraduate');
    }
}

handleExtraOperations('batchgraduate data.json', 'john.doe@isa.utm.md')