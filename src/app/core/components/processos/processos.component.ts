import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { BoxComponent } from './box/box.component';

@Component({
  selector: 'app-processos',
  standalone: true,
  imports: [NgOptimizedImage, BoxComponent],
  templateUrl: './processos.component.html',
  styleUrl: './processos.component.scss'
})
export class ProcessosComponent {

  public srcImg: string = 'assets/img/logoSubColor.webp'
  public altImg: string = 'Miniatura do logo colorida'
}
