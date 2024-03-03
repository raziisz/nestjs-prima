export class Query {
    private _take: number;
    private _skip: number;

    constructor(take?: number, skip?: number) {
        this._take = 20;
        this._skip = 1;
        
        if (!!take && !isNaN(take)) 
            this._take = Number(take);
        if (!!skip && !isNaN(skip))
            this._skip = Number(skip);
    }

    get take(): number {
        return this._take;
    }

    get skip(): number {
        return this._skip;
    }
}