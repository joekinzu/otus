import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'
import {StorageService} from "../storage/storage.service"

@Injectable({
  providedIn: 'root'
})

export class TranslateService {
  private key = 'trnsl.1.1.20200224T155628Z.b195a987fea60483.87bb8b7ce277713b73cf9c40787dbc5ec84a555c'
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  }

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getDictItem(word: string): Observable<{word: string, translate: string}> {
    const lang = this.storageService.getLang().value
    return of(word)
      .pipe(
        switchMap(item => this.http.post(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&lang=${lang}`,
          `text=${item}`,
          this.httpOptions
        )),
        map((item: {text}) => ({word, translate: item.text[0]}))
      )
  }
}
