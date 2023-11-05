class File {
    name: string;
    extension: string;
    data: any;
    createdDateTime: Date;
    updatedDateTime: Date;
    lastCommitDate: Date;
    hasChangedSinceCommit: boolean;

    constructor(name: string, extension: string, data: string) {
        this.name = name;
        this.extension = extension;
        this.data = data;
        this.createdDateTime = new Date();
        this.updatedDateTime = new Date();
        this.hasChangedSinceCommit = false;
    }

    printInfo() {
        console.log(`File Name: ${this.name}`);
        console.log(`Created at: ${this.createdDateTime}`);
        console.log(`Last Updated at: ${this.updatedDateTime}`);
    }

    commit() {
        this.lastCommitDate = new Date();
        this.hasChangedSinceCommit = false;
    }

    hasChangedSinceLastCommit(): boolean {
        if (this.hasChangedSinceCommit) this.updatedDateTime = new Date();
        return this.hasChangedSinceCommit;
    }
}

export default File;