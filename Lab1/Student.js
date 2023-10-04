"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
var Student = /** @class */ (function () {
    function Student(name, email, faculty) {
        if (faculty === void 0) { faculty = null; }
        this.name = name;
        this.email = email;
        this.faculty = faculty;
    }
    return Student;
}());
exports.Student = Student;
