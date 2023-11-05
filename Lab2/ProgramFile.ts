import File from './File';

class ProgramFile extends File {
    private codeLines: string[];

    constructor(name: string, extension: string, codeLines: string[]) {
        super(name, extension);
        this.codeLines = codeLines;
    }

    printInfo() {
        super.printInfo();
        console.log(`Line Count: ${this.codeLines.length}`);
    }
}

export default ProgramFile;