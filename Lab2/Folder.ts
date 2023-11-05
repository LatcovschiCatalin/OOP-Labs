import * as fs from 'fs';
import File from './File';
import TextFile from './TextFile';

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

            if (fileExtension === 'png') {
                console.log(`Image file detected: ${file}`);
            } else if (fileExtension === 'txt') {
                this.files.push(new TextFile(fileName, fileExtension, fileData));
            } else if (fileExtension === 'ts') {
                console.log(`Program file detected: ${file}`);
            }
        });

        console.log('Files in the SRC folder have been read and added to the SRC.');
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