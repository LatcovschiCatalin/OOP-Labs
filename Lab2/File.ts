class File {
    name: string;
    extension: string;
    createdDateTime: Date;
    updatedDateTime: Date;

    constructor(name: string, extension: string) {
        this.name = name;
        this.extension = extension;
        this.createdDateTime = new Date();
        this.updatedDateTime = new Date();
    }

    printInfo() {
        console.log(`File Name: ${this.name}`);
        console.log(`Created at: ${this.createdDateTime}`);
        console.log(`Updated at: ${this.updatedDateTime}`);
    }

    commit() {
        this.updatedDateTime = new Date();
    }

    hasChangedSinceLastCommit(lastSnapshotTime: Date): boolean {
        return this.updatedDateTime > lastSnapshotTime;
    }
}

export default File;