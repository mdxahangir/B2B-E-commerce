import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/login/user.model';
import { UserService } from './user.service';


@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent implements OnInit {
  sellers: User[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getSellers().subscribe({
      next: (data) => {
        this.sellers = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading sellers:', err);
        this.errorMessage = 'Failed to load sellers.';
        this.isLoading = false;
      }
    });
  }
}
