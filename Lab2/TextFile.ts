import File from './File';

class TextFile extends File {
    private content: string;

    constructor(name: string, extension: string, content: string) {
        super(name, extension, content);
        this.content = content;
    }

    printInfo() {
        super.printInfo();
        console.log(`Content Length: ${this.content.length} characters`);
        const lineCount = this.countLines();
        const wordCount = this.countWords();
        console.log(`Line Count: ${lineCount}`);
        console.log(`Word Count: ${wordCount}`);
    }

    private countLines(): number {
        return this.content.split('\n').length;
    }

    private countWords(): number {
        const words = this.content.split(/\s+/);
        return words.length;
    }
}

export default TextFile;