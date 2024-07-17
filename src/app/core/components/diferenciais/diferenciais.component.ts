import { Component } from '@angular/core';
import { BoxComponent } from './box/box.component';

@Component({
  selector: 'app-diferenciais',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './diferenciais.component.html',
  styleUrl: './diferenciais.component.scss'
})
export class DiferenciaisComponent {

  public h1: string = 'Vantagens de ser um Corretor SL91';
}
