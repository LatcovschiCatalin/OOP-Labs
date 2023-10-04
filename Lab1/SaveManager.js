"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveManager = void 0;
var fs = require("fs");
var Faculty_1 = require("./Faculty");
var Student_1 = require("./Student");
var SaveManager = /** @class */ (function () {
    function SaveManager(filename) {
        this.filename = filename;
    }
    SaveManager.prototype.save = function (data) {
        var replacer = function (key, value) {
            if (value instanceof Faculty_1.Faculty) {
                return { name: value.name, students: value.students.map(function (student) { return student.name; }) };
            }
            if (value instanceof Student_1.Student) {
                return { name: value.name, email: value.email, faculty: value.faculty };
            }
            return value;
        };
        var json = JSON.stringify(data, replacer, 2);
        fs.writeFileSync(this.filename, json);
    };
    SaveManager.prototype.load = function () {
        try {
            var json = fs.readFileSync(this.filename, 'utf8');
            return JSON.parse(json);
        }
        catch (error) {
            return null;
        }
    };
    return SaveManager;
}());
exports.SaveManager = SaveManager;
