import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  navLinks = [
    { path: 'add', label: 'word'},
    { path: 'go', label: 'game'},
    { path: 'settings', label: 'settings'}
  ]

  constructor() {}
  ngOnInit() {
  }

}
