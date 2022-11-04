import {SelectList} from './select-list';
import {SelectListItem} from './select-list-item';

export class PagedData<T> {
    data: Array<T> = new Array<T>();
    totalElements = 0;
    totalPages = 0;
    limit = 0;
    offset = 0;
    term: string = null;

    constructor(pagedData?: PagedData<T>) {
        if (pagedData === undefined || pagedData === null) {
            return;
        }

        this.data = pagedData.data;
        this.totalElements = pagedData.totalElements;
        this.totalPages = pagedData.totalPages;
        this.limit = pagedData.limit;
        this.offset = pagedData.offset;
        this.term = pagedData.term;
    }

    public getList(select?: (o: T) => SelectListItem): SelectList {
        const list = new SelectList();

        if (this.data && this.data.length > 0 && select !== undefined && select !== null) {
            list.data.push(...this.data.map(i => select.call(undefined, i)));
        }

        return list;
    }
}
