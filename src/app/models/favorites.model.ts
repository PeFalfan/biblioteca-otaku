export class FavoriteModel {
    title: string;
    mainTag: string;

    constructor(data: any) {
        this.title = data.title;
        this.mainTag = data.mainTag;
    }
}