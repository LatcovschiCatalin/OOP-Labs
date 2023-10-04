import * as fs from 'fs';

export class Logger {
    private logFile: fs.WriteStream;

    constructor(logFileName: string) {
        this.logFile = fs.createWriteStream(logFileName, { flags: 'a' });
    }

    log(operation: string, details: string) {
        const timestamp = new Date().toISOString();
        this.logFile.write(`[${timestamp}] ${operation}: ${details}\n`);
    }
}