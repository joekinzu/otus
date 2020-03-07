import {Injectable} from '@angular/core'
import {from} from 'rxjs'
import {filter, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage = window.localStorage
  private lang = {display: 'English', value: 'ru-en'}
  private level = 1

  constructor() {}

  getDictFromStorage(): Array<any> {
    const arr = JSON.parse(this.localStorage.getItem(this.lang.value))
    return arr === null ? [] : arr
  }

  addDictItems(dictItems: Array<any>) {
    const dict = this.getDictFromStorage()
    from(dictItems)
      .pipe(
        filter(item => !dict.find(({word}) => word === item.word)),
        map(item => dict.unshift(item))
      )
      .subscribe({
        complete: () => {
          console.log('added'),
          this.localStorage.setItem(this.lang.value, JSON.stringify(dict))
        }
      })
  }

  clearDictStorage() {
    this.localStorage.removeItem(this.lang.value)
  }

  setLang(lang: any) {
    this.lang = lang
  }

  getLang() {
    return this.lang
  }

  setLevel(level: number) {
    this.level = level
  }

  getLevel() {
    return this.level
  }

}
