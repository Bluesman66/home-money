import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../../../../shared/models/user.model';
import { AuthService } from './../../../../shared/services/auth.service';

@Component({
  selector: 'pai-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
