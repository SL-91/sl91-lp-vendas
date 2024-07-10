import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-pessoas',
  standalone: true,
  imports: [],
  templateUrl: './box-pessoas.component.html',
  styleUrl: './box-pessoas.component.scss'
})
export class BoxPessoasComponent {
  // IMG
  @Input() public srcImg: string = '';
  @Input() public altImg: string = '';
  // TEXT
  @Input() public h1Text: string = '';
  @Input() public descriptionText: string = '';
}
