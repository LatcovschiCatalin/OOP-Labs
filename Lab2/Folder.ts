import File from './File';

class Folder {
    private files: File[] = [];
    private lastSnapshotTime: Date = new Date();

    commit() {
        this.lastSnapshotTime = new Date();
        this.files.forEach((file) => file.commit());
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
            const hasChanged = file.hasChangedSinceLastCommit(this.lastSnapshotTime);
            console.log(`${file.name}.${file.extension}: ${hasChanged ? 'Changed' : 'Unchanged'}`);
        });
    }
}

export default Folder;