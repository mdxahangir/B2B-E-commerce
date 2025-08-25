import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}