import File from './File';

class ProgramFile extends File {
    private codeLines: string[];

    constructor(name: string, extension: string, content: string) {
        super(name, extension, content);
        this.codeLines = content.split('\n');
    }

    private generateContent() {
        const classCount = this.countClasses();
        const methodCount = this.countMethods();
        console.log(`Line Count: ${this.codeLines.length}`);
        console.log(`Class Count: ${classCount}`);
        console.log(`Method Count: ${methodCount}`);
    }

    private countClasses(): number {
        const classRegex = this.isJavaFile()
            ? /\b(public\s+)?class\s+\w+\b/
            : /^\s*class\b/;
        const classLines = this.codeLines.filter((line) => classRegex.test(line.trim()));
        return classLines.length;
    }

    private countMethods(): number {
        const methodRegex = this.isJavaFile()
            ? /\b(public|private|protected)?\s*\w+\s+\w+\s*\([^\)]*\)\s*{/
            : /\bdef\s+\w+\s*\(.+\):/;
        const methodLines = this.codeLines.filter((line) => methodRegex.test(line.trim()));
        return methodLines.length;
    }

    private isJavaFile(): boolean {
        return this.extension.toLowerCase() === 'java';
    }

    printInfo() {
        super.printInfo();
        this.generateContent();
    }
}

export default ProgramFile;