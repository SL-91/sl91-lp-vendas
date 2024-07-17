import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {

  @Input() public title: string = '';
  @Input() public span: string = '';
  @Input() public btn: string | any = '';
  @Input() public useProperty: any | boolean = false;

}
