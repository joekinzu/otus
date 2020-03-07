import {Component, OnInit} from '@angular/core'
import {StorageService} from "../services/storage/storage.service"

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsPageComponent implements OnInit {
  languages = [
    {display: 'English', value: 'ru-en'},
    {display: 'German', value: 'ru-de'}
  ]
  levels = [1,3,5]
  selectedLang: any
  selectedLevel: number

  constructor(
    private storage: StorageService,
  ){}

  ngOnInit() {
    this.setInitialState()
  }

  setInitialState() {
    this.selectedLang = this.storage.getLang()
    this.selectedLevel = this.storage.getLevel()
  }

  onChangeLangSelect(eventValue: string) {
    console.log(eventValue)
    this.selectedLang = this.languages.find(({value}) => value === eventValue)
  }

  onChangeLevSelect(eventValue: number) {
    console.log(eventValue)
    this.selectedLevel = eventValue
  }

  onAgreeClick() {
    this.storage.setLang(this.selectedLang)
    this.storage.setLevel(this.selectedLevel)
  }

  onResetClick() {
    this.storage.setLang({display: 'English', value: 'ru-en'})
    this.storage.setLevel(1)
    this.setInitialState()
    console.log('reset')
  }

  onClearClick() {
    this.storage.clearDictStorage()
  }
}
