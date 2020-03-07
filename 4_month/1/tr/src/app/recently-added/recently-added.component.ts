import {Component, OnInit} from '@angular/core'
import {WordQueueService} from '../services/word-queue/word-queue.service'
import {StorageService} from '../services/storage/storage.service'

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css'],
  providers: [
    WordQueueService
  ]
})

export class RecentlyAddedPageComponent implements OnInit {

  dict: Array<any>
  isAdd = false
  canSave = false
  userInput = ''
  dictItems: Array<any> = []

  constructor(
    private wordQueueService: WordQueueService,
    private storageService: StorageService
    ){}

  ngOnInit() {
    this.dict = this.storageService.getDictFromStorage()
    console.log(this.dict)
  }

  onTranslate() {
    this.canSave = false
    this.wordQueueService.getDictItemsFromInput(this.userInput)
      .subscribe(
        data => this.dictItems.push(data),
        err => console.error(),
        () => this.canSave = true
      )
  }

  onSave() {
    this.storageService.addDictItems(this.dictItems)
    this.dictItems = []
    this.userInput = ''
    this.isAdd = false
    this.dict = this.storageService.getDictFromStorage()
    this.canSave = false
  }

}
