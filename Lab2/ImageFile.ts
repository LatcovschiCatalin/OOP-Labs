import File from './File';

class ImageFile extends File {
    private width: number;
    private height: number;

    constructor(name: string, extension: string, width: number, height: number) {
        super(name, extension);
        this.width = width;
        this.height = height;
    }

    printInfo() {
        super.printInfo();
        console.log(`Image Size: ${this.width}x${this.height}`);
    }
}

export default ImageFile;