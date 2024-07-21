import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public srcLogo: string = 'assets/img/logoColor.webp';
  public altLogo: string = 'imagem do logo colorido';
  public titleRedes: string = 'Siga nossas redes sociais'

  public instaCorretora: string = 'Corretora SL91';
  public instaJeito: string = 'Jeito SL91';
  public instCast: string = 'SL Cast';
}
