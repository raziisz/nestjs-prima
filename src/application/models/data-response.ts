export class DataResponse<T> {
    private _data: T[];
    private _currentPage: number;
    private _pageSize: number;
    private _totalPages: number;
    private _totalCount: number;
    
    constructor(data: T[], pageNumber: number, pageSize: number, totalPages: number, totalCount: number) {
        this._data = data;
        this._pageSize = Number(pageSize);
        this._currentPage = Number(pageNumber);
        this._totalPages = Number(totalPages);
        this._totalCount = Number(totalCount);
    }
    
    public get data(): T[] {
        return this._data;
    }

    public get currentPage(): number {
        return this._currentPage;
    }
    public get pageSize(): number {
        return this._pageSize;
    }
    public get totalPages(): number {
        return this._totalPages;
    }
    public get totalCount(): number {
        return this._totalCount;
    }
}