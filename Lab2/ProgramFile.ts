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
        const classCount = this.countClasses();
        const methodCount = this.countMethods();
        console.log(`'class' Count: ${classCount}`);
        console.log(`Method Count: ${methodCount}`);
    }

    private countClasses(): number {
        const classKeyword = 'class';
        const classLines = this.codeLines.filter(line => line.includes(classKeyword));
        return classLines.length;
    }

    private countMethods(): number {
        const methodRegex = /(public|private|protected)?\s*\w+\s*\(.+\)\s*{/;
        const methodLines = this.codeLines.filter(line => methodRegex.test(line));
        return methodLines.length;
    }
}

export default ProgramFile;