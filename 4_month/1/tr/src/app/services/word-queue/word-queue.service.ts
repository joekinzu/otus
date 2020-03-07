import {Injectable} from '@angular/core'
import {TranslateService} from '../translate/translate.service'
import {from, Observable} from 'rxjs'
import {concatMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})

export class WordQueueService {
  constructor(
    private translateService: TranslateService
  ) {}

  getDictItemsFromInput(input: string): Observable<{word: string, translate: string}> {
    return from(input.split('.')).pipe(concatMap(item => this.translateService.getDictItem(item)))
  }
}
