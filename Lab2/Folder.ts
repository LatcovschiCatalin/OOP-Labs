import * as fs from 'fs';
import File from './File';
import TextFile from './TextFile';
import ImageFile from "./ImageFile";
import sizeOf from 'image-size';
import ProgramFile from "./ProgramFile";

class Folder {
    files: File[] = [];
    private lastSnapshotTime: Date = new Date();

    constructor() {
        this.readFilesFromSRC();
    }

    private readFilesFromSRC() {
        fs.readdirSync('./SRC').forEach((file) => {
            const fileData = fs.readFileSync(`./SRC/${file}`, 'utf-8');
            const fileName = file.split('.')[0];
            const fileExtension = file.split('.').pop();

            if (fileExtension === 'png' || fileExtension === 'jpg') {
                const dimensions = this.getImageDimensions(`./SRC/${file}`);
                this.files.push(new ImageFile(fileName, fileExtension, dimensions.width, dimensions.height, fileData));
            } else if (fileExtension === 'txt') {
                this.files.push(new TextFile(fileName, fileExtension, fileData));
            } else if (fileExtension === 'py' || fileExtension === 'java') {
                this.files.push(new ProgramFile(fileName, fileExtension, fileData));
            }
        });

        console.log('Files in the SRC folder have been read and added to the SRC.');
    }

    private getImageDimensions(filePath: string) {
        let dimensions = { width: 0, height: 0 };

        if (fs.existsSync(filePath)) {
            dimensions = sizeOf(filePath);
        }

        return dimensions;
    }

    commit() {
        this.lastSnapshotTime = new Date();
        this.files.forEach((file) => {
            const filePath = `./SRC/${file.name}.${file.extension}`;
            file.data = fs.readFileSync(filePath, 'utf-8');
            file.commit();
        });
    }

    info(filename: string) {
        const file = this.files.find((f) => `${f.name}.${f.extension}` === filename);
        if (file) {
            file.printInfo();
        } else {
            console.log('File not found.');
        }
    }

    status() {
        console.log('Change Status Since Last Snapshot:');
        this.files.forEach((file) => {
            const filePath = `./SRC/${file.name}.${file.extension}`;
            const fileData = fs.readFileSync(filePath, 'utf-8');
            file.hasChangedSinceCommit = fileData !== file.data;
            console.log(`${file.name}.${file.extension}: ${file.hasChangedSinceLastCommit() ? 'Changed' : 'Unchanged'}`);
        });
    }
}

export default Folder;