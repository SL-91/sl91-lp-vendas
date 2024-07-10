import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  @Input()
  public srcImg: string = '';
  @Input()
  public altImg: string = '';
  @Input()
  public h1Box: string = '';
}
