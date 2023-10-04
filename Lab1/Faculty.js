"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
var Faculty = /** @class */ (function () {
    function Faculty(name, field) {
        this.name = name;
        this.field = field;
        this.students = [];
    }
    Faculty.prototype.enrollStudent = function (student) {
        student.faculty = this;
        this.students.push(student);
    };
    Faculty.prototype.graduateStudent = function (student) {
        if (student.faculty === this)
            student.faculty = null;
    };
    Faculty.prototype.getCurrentStudents = function () {
        var _this = this;
        return this.students.filter(function (student) { return student.faculty === _this; });
    };
    Faculty.prototype.getGraduates = function () {
        var _this = this;
        return this.students.filter(function (student) { return student.faculty !== _this; });
    };
    return Faculty;
}());
exports.Faculty = Faculty;
