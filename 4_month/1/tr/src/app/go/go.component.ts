import {Component, OnInit} from '@angular/core'
import {StorageService} from "../services/storage/storage.service"

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoPageComponent implements OnInit {
  wordList: any[]
  currentWord: any
  placeholder: string
  userInput: string
  disableInput: boolean
  turn: number
  result: number
  message: string
  level: number

  constructor(
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.setInitState()
  }

  onNextClick() {
    this.turn++
    console.log(this.turn)
    console.log(this.level)
    if (this.userInput === this.currentWord.translate) {
      this.result++
    }

    if (this.turn == this.level) {
      console.log('game is over')
      this.message = 'result:' + this.result + '/' + this.level
      this.placeholder = ''
      this.userInput = ''
      this.disableInput = true
      return
    }

    if (this.turn > this.level) {
      this.setInitState()
    }

    this.userInput = ''
    this.currentWord = this.getRandomWord()
    this.message = this.currentWord.word
  }

  setInitState() {
    this.turn = 0
    this.result = 0
    this.placeholder = 'enter word'
    this.level = this.storage.getLevel()
    this.wordList = this.storage.getDictFromStorage()
    console.log(this.wordList)
    if(this.wordList.length == 0){
      this.disableInput = true
      this.message = 'no words to test'
      return
    }
    this.currentWord = this.getRandomWord()
    this.message = this.currentWord.word
    this.disableInput = false
  }

  getRandomWord() {
    const index = Math.floor(Math.random() * this.wordList.length)
    return this.wordList[index]
  }
}
