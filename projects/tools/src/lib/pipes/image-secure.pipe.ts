import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Pipe({
    name: 'imageSecure'
})
export class ImageSecurePipe implements PipeTransform {

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    }

    transform(url: string, largura?: number, altura?: number, qualidade?: number, tipoRedimensionamento?: number): Observable<SafeUrl> {
        let params = new HttpParams();

        if (largura !== undefined) {
            params = params.set('largura', largura.toString());
        }

        if (altura !== undefined) {
            params = params.set('altura', altura.toString());
        }

        if (qualidade !== undefined) {
            params = params.set('qualidade', qualidade.toString());
        }

        if (tipoRedimensionamento !== undefined) {
            params = params.set('tipoRedimensionamento', tipoRedimensionamento.toString());
        }

        return this.http
            .get(url, {responseType: 'blob', params})
            .pipe(map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));
    }
}
