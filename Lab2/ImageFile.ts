import File from './File';
import * as fs from "fs";
import sizeOf from "image-size";

class ImageFile extends File {
    private content: string;
    name: string;
    extension: string;
    width: number;
    height: number;

    constructor(name: string, extension: string, width: number, height: number, content: any) {
        super(name, extension, content);
        this.getImageDimensions(`./SRC/${name}.${extension}`);
        this.content = content;
        this.name = name;
        this.extension = extension;
    }

    printInfo() {
        super.printInfo();
        this.getImageDimensions(`./SRC/${this.name}.${this.extension}`)
        console.log(`Image Size: ${this.width}x${this.height}`);
    }

    private getImageDimensions(filePath: string) {
        let dimensions = { width: 0, height: 0 };

        if (fs.existsSync(filePath)) {
            dimensions = sizeOf(filePath);
        }

        this.width = dimensions.width;
        this.height = dimensions.height;
    }
}

export default ImageFile;