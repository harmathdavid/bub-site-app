import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bub-site-app';
  readonly endDate: Date = new Date(2024,7,8, 20, 0, 0 );
}
