"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Faculty_1 = require("./Faculty");
var University_1 = require("./University");
var Student_1 = require("./Student");
var SaveManager_1 = require("./SaveManager");
var Logger_1 = require("./Logger");
var university = new University_1.University();
var saveManager = new SaveManager_1.SaveManager('data.json');
var operationLogger = new Logger_1.Logger('logs.txt');
var students = saveManager.load().students;
var savedData = saveManager.load();
if (savedData) {
    university.faculties = savedData.faculties.map(function (facultyData) {
        var faculty = new Faculty_1.Faculty(facultyData.name, facultyData.field);
        faculty.students = students.filter(function (student) { return student.faculty && student.faculty.name === faculty.name; });
        return faculty;
    });
    students.length = 0;
    students.push.apply(students, savedData.students.map(function (studentData) { return new Student_1.Student(studentData.name, studentData.email); }));
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
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", function (input) {
    switch (input) {
        case "1":
            // Create and Assign a Student to a Faculty
            rl.question("Enter student name: ", function (name) {
                rl.question("Enter student email: ", function (email) {
                    rl.question("Enter faculty name: ", function (facultyName) {
                        var faculty = university.faculties.find(function (f) { return f.name === facultyName; });
                        if (faculty) {
                            var student = new Student_1.Student(name, email);
                            students.push(student);
                            faculty.enrollStudent(student);
                            console.log("Enrolled ".concat(student.name, " in ").concat(faculty.name, "."));
                            operationLogger.log('INFO', "Create and Assign ".concat(student.name, " to ").concat(faculty.name));
                        }
                        else {
                            console.log("Faculty ".concat(facultyName, " not found."));
                            operationLogger.log('ERROR', "Faculty ".concat(facultyName, " not found for student ").concat(name, " (").concat(email, ")"));
                        }
                        showMenu();
                    });
                });
            });
            break;
        case "2":
            // Graduate a Student from a Faculty
            rl.question("Enter student email: ", function (email) {
                var student = students.find(function (s) { return s.email === email; });
                if (student) {
                    var faculty = student.faculty;
                    if (faculty) {
                        faculty.graduateStudent(student);
                        console.log("Graduated ".concat(student.name, " from ").concat(faculty.name, "."));
                        operationLogger.log('INFO', "Graduate Student ".concat(student.name, " from ").concat(faculty.name));
                    }
                    else {
                        console.log("".concat(student.name, " is not enrolled in any faculty."));
                        operationLogger.log('WARN', "".concat(student.name, " is not enrolled in any faculty. Cannot graduate."));
                    }
                }
                else {
                    console.log("Student with email ".concat(email, " not found."));
                    operationLogger.log('ERROR', "Student with email ".concat(email, " not found for graduation."));
                }
                showMenu();
            });
            break;
        case "3":
            // Display Current Enrolled Students
            university.faculties.forEach(function (faculty) {
                var currentStudents = faculty.getCurrentStudents();
                console.log("Current students in ".concat(faculty.name, ":"));
                currentStudents.forEach(function (student) {
                    console.log("- ".concat(student.name, " (").concat(student.email, ")"));
                });
            });
            operationLogger.log('INFO', 'Displayed current students in all faculties.');
            showMenu();
            break;
        case "4":
            // Display Graduates
            university.faculties.forEach(function (faculty) {
                var graduates = faculty.getGraduates();
                console.log("Graduates from ".concat(faculty.name, ":"));
                graduates.forEach(function (student) {
                    console.log("- ".concat(student.name, " (").concat(student.email, ")"));
                });
            });
            operationLogger.log('INFO', 'Displayed graduates from all faculties.');
            showMenu();
            break;
        case "5":
            // Check if a Student Belongs to a Faculty
            rl.question("Enter student email: ", function (email) {
                var student = students.find(function (s) { return s.email === email; });
                if (student) {
                    if (student.faculty) {
                        console.log("".concat(student.name, " belongs to ").concat(student.faculty.name, "."));
                        operationLogger.log('INFO', "Check Student Belonging ".concat(student.name, " belongs to ").concat(student.faculty.name));
                    }
                    else {
                        console.log("".concat(student.name, " is not enrolled in any faculty."));
                        operationLogger.log('INFO', "Check Student Belonging ".concat(student.name, " is not enrolled in any faculty."));
                    }
                }
                else {
                    console.log("Student with email ".concat(email, " not found."));
                    operationLogger.log('ERROR', "Student with email ".concat(email, " not found for belonging check."));
                }
                showMenu();
            });
            break;
        case "6":
            // Create a New Faculty
            rl.question("Enter faculty name: ", function (name) {
                rl.question("Enter faculty field: ", function (field) {
                    var faculty = university.createFaculty(name, field);
                    console.log("Created new faculty: ".concat(faculty.name, " (").concat(faculty.field, ")"));
                    operationLogger.log('INFO', "Create Faculty ".concat(faculty.name, " (").concat(faculty.field, ")"));
                    showMenu();
                });
            });
            break;
        case "7":
            // Find Faculty by Student Email
            rl.question("Enter student email: ", function (email) {
                var faculty = university.findFacultyByEmail(email);
                if (faculty) {
                    console.log("Faculty for student with email ".concat(email, ": ").concat(faculty.name));
                    operationLogger.log('INFO', "Find Faculty for student with email ".concat(email, ": ").concat(faculty.name));
                }
                else {
                    console.log("Student with email ".concat(email, " not found in any faculty."));
                    operationLogger.log('WARN', "Student with email ".concat(email, " not found in any faculty."));
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
            rl.question("Enter field: ", function (field) {
                university.displayFacultiesByField(field);
                operationLogger.log('INFO', "Displayed faculties in the field ".concat(field, "."));
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
    var dataToSave = {
        faculties: university.faculties,
        students: students,
    };
    saveManager.save(dataToSave);
}
process.on('exit', function () {
    saveState();
});
function handleExtraOperations(input) {
    var operationParts = input.split(' ');
    var operation = operationParts[0].toLowerCase();
    var args = operationParts.slice(1);
    switch (operation) {
        case 'batchenroll':
            if (args.length !== 1) {
                console.log('Error: Batch Enrollment operation requires a filename.');
                operationLogger.log('ERROR', 'Batch Enrollment operation requires a filename.');
            }
            else {
                university.batchEnrollStudents(args[0]);
                operationLogger.log('INFO', "Batch enrollment completed using file: ".concat(args[0]));
            }
            break;
        case 'batchgraduate':
            if (args.length !== 1) {
                console.log('Error: Batch Graduation operation requires a filename.');
                operationLogger.log('ERROR', 'Batch Graduation operation requires a filename.');
            }
            else {
                university.batchGraduateStudents(args[0]);
                operationLogger.log('INFO', "Batch graduation completed using file: ".concat(args[0]));
            }
            break;
        default:
            console.log('Error: Invalid operation. Supported operations are: batchenroll, batchgraduate');
            operationLogger.log('ERROR', 'Invalid operation. Supported operations are: batchenroll, batchgraduate');
    }
}
