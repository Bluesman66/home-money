import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';
import { Title, Meta } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { AuthService } from './../../shared/services/auth.service';
import { User } from './../../shared/models/user.model';
import { Message } from './../../shared/models/message.model';
import { fadeStateTrigger } from './../../shared/animations/fade.animation';

@Component({
  selector: 'pai-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      { name: 'keywords', content: 'логин,вход,система' },
      { name: 'description', content: 'Страница для входа в систему' }
    ]);
  }

  ngOnDestroy(): void { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
      .takeUntil(componentDestroyed(this))
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage('Теперь вы можете зайти в систему', 'success');
        } else if (params['accessDenied']) {
          this.showMessage('Для работы с системой необходимо пройти авторизацию', 'warning');
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .takeUntil(componentDestroyed(this))
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('Пароль неверный');
          }
        } else {
          this.showMessage('Такого пользователя не существует');
        }
      });
  }
}
