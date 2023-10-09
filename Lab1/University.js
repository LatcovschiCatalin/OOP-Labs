"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.University = void 0;
var fs = require("fs");
var Faculty_1 = require("./Faculty");
var Student_1 = require("./Student");
var Logger_1 = require("./Logger");
var StudyField_1 = require("./StudyField");
var SaveManager_1 = require("./SaveManager");
var saveManager = new SaveManager_1.SaveManager('data.json');
var students = saveManager.load().students;
var operationLogger = new Logger_1.Logger('logs.txt');
var University = /** @class */ (function () {
    function University() {
        this.faculties = [];
    }
    University.prototype.isFieldValid = function (field) {
        return Object.keys(StudyField_1.StudyField).includes(field);
    };
    University.prototype.createFaculty = function (name, field) {
        if (this.isFieldValid(field)) {
            var faculty = new Faculty_1.Faculty(name, StudyField_1.StudyField[field]);
            this.faculties.push(faculty);
            operationLogger.log('INFO', "Create Faculty ".concat(name, " (").concat(field, ")"));
            return faculty;
        }
        else {
            operationLogger.log('ERROR', "".concat(field, " is an invalid Study Field."));
            console.log('Invalid field type. Please provide a valid StudyField.');
        }
    };
    University.prototype.findFacultyByEmail = function (email) {
        var student = students.find(function (student) { return student.email === email; });
        return student ? student.faculty : null;
    };
    University.prototype.displayFaculties = function () {
        console.log("University Faculties:");
        this.faculties.forEach(function (faculty) {
            console.log("- ".concat(faculty.name, " (").concat(faculty.field, ")"));
        });
        operationLogger.log('INFO', 'Displayed all faculties.');
    };
    University.prototype.displayFacultiesByField = function (field) {
        console.log("Faculties in the field ".concat(field, ":"));
        this.faculties
            .filter(function (faculty) { return faculty.field === field; })
            .forEach(function (faculty) {
            console.log("- ".concat(faculty.name));
        });
        operationLogger.log('INFO', "Displayed faculties in the field ".concat(field, "."));
    };
    University.prototype.batchEnrollStudents = function (filename) {
        try {
            var fileData = fs.readFileSync(filename, 'utf8');
            var lines = fileData.split('\n');
            var _loop_1 = function (line) {
                var _a = line.split(','), name_1 = _a[0], email = _a[1], facultyName = _a[2];
                var faculty = this_1.faculties.find(function (f) { return f.name === facultyName; });
                if (faculty) {
                    var student = new Student_1.Student(name_1, email);
                    students.push(student);
                    faculty.enrollStudent(student);
                    operationLogger.log('INFO', "Batch Enrollment ".concat(student.name, " in ").concat(faculty.name));
                }
                else {
                    operationLogger.log('ERROR', "Faculty ".concat(facultyName, " not found for ").concat(name_1, " (").concat(email, ")"));
                }
            };
            var this_1 = this;
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                var line = lines_1[_i];
                _loop_1(line);
            }
            console.log('Batch enrollment completed.');
        }
        catch (error) {
            operationLogger.log('ERROR', "Failed to read or process the batch enrollment file: ".concat(error.message));
        }
    };
    University.prototype.batchGraduateStudents = function (filename, email) {
        var fileData = fs.readFileSync(filename, 'utf8');
        var student = students.find(function (s) { return s.email === email; });
        console.log(student);
        if (student) {
            var faculty = this.faculties.find(function (s) { return s.name === student.faculty.name; });
            console.log(faculty);
            if (faculty) {
                faculty.graduateStudent(student);
                operationLogger.log('INFO', "Batch Graduation ".concat(student.name, " from ").concat(faculty.name));
            }
            else {
                operationLogger.log('ERROR', "".concat(student.name, " is not enrolled in any faculty."));
            }
        }
        else {
            operationLogger.log('ERROR', "Student with email ".concat(email, " not found for batch graduation."));
        }
        console.log('Batch graduation completed.');
    };
    return University;
}());
exports.University = University;
