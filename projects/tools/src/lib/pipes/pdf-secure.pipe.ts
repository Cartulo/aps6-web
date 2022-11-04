import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

@Pipe({
    name: 'pdfSecure'
})
export class PdfSecurePipe implements PipeTransform {

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    }

    transform(url: string): Promise<SafeUrl> {
        return this.http
            .get(url, {responseType: 'blob'})
            .pipe(map(val => URL.createObjectURL(val)))
            .toPromise();
    }
}
