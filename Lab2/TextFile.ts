import File from './File';

class TextFile extends File {
    private content: string;

    constructor(name: string, extension: string, content: string) {
        super(name, extension);
        this.content = content;
    }

    printInfo() {
        super.printInfo();
        console.log(`Content Length: ${this.content.length} characters`);
    }
}

export default TextFile;