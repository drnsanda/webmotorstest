import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showMinMenu: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  toggleMinMenu(){
    this.showMinMenu = this.showMinMenu ? false : true;
  }

}
