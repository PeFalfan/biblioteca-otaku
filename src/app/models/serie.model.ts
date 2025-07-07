import { ChapterModel } from "./chapter.model";

export enum SeriesType {
    ANIME, MOVIE, TV_SERIES, MANGA, NOVEL,
}

export class SeriesDataModel {
    id: number;
    title: string;
    currentChapters: number;
    totalChapters: number;
    yearOfRelease: number;
    mainTag: SeriesType;
    allTags: string[];
    originalName: string;
    description: string;
    chapters: Array<ChapterModel>;
    mainImageUrl: string;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.currentChapters = data.currentChapters;
        this.totalChapters = data.totalChapters;
        this.yearOfRelease = data.yearOfRelease;
        this.mainTag = data.mainTag;
        this.allTags = data.allTags;
        this.originalName = data.originalName;
        this.description = data.description;
        this.chapters = data.chapters;
        this.mainImageUrl = data.mainImageUrl;
    }
}