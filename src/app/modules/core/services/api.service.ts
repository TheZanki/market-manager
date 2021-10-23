import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ISearch, ISearchResult, ItemModel } from './market.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api = environment.api;

  constructor(private http: HttpClient) { }

  public search(body: ISearch): Observable<any> {
    return this.http.post(`${this.api}search/search`, body)
  }

	public save(body: any): Observable<any> {
		return this.http.post(`${this.api}/item`, body);
	}
}
