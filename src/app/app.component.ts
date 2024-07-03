import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./features/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HomeComponent],
    template: `
    <app-home></app-home>
    `,
})
export class AppComponent {
  title = 'SL91';
}
