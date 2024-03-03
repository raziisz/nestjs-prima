export class PagedList<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    items: T[];

    constructor(items: T[], totalCount: number, pageNumber: number, pageSize: number) {
        this.items = items;
        this.totalCount = totalCount;
        this.pageSize = pageSize;
        this.currentPage = pageNumber;
        this.totalPages = Math.ceil(totalCount / pageSize);
    }
}