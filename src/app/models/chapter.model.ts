export class ChapterModel {
    id: number;
    title: string;
    chapterNumber: number;
    chapterDescription: string;
    chapterThumbnailUrl: string;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.chapterNumber = data.chapterNumber;
        this.chapterDescription = data.chapterDescription;
        this.chapterThumbnailUrl = data.chapterThumbnailUrl;
    }
}