import File from './File';
import * as fs from 'fs';

class TextFile extends File {
    private content: string;
    name: string;
    extension: string;
    constructor(name: string, extension: string, content: string) {
        super(name, extension, content);
        this.name = name;
        this.extension = extension;
        const filePath = `./SRC/${name}.${extension}`;
        this.content = fs.readFileSync(filePath, 'utf-8');
    }

    printInfo() {
        super.printInfo();
        const filePath = `./SRC/${this.name}.${this.extension}`;
        this.content = fs.readFileSync(filePath, 'utf-8');
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