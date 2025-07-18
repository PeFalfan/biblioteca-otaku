export class MangaDataModel {

    id: number;
    title: string;
    currentChapters: number;
    mainTag: string;
    description: string;
    coverUrl: string;
    yearOfRelease: number;
    
    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.currentChapters = data.currentChapters;
        this.mainTag = data.mainTag;
        this.description = data.description;
        this.coverUrl = data.coverUrl;
        this.yearOfRelease = data.yearOfRelease;
    }
}