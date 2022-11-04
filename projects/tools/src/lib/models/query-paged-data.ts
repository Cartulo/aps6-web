import {HttpParams} from '@angular/common/http';
import {StringUtils} from '../utils';

export abstract class QuerydPagedData {
    constructor(
        public limit = 10,
        public offset = 0,
        public term: string = null) {
    }

    public getParams(): HttpParams {
        let params = new HttpParams();

        if (this.limit !== 10) {
            params = params.set('limit', this.limit.toString());
        }

        if (this.offset !== 0) {
            params = params.set('offset', this.offset.toString());
        }

        if (!StringUtils.isNullOrEmpty(this.term)) {
            params = params.set('term', this.term);
        }

        return params;
    }
}
