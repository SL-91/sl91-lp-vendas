import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-treinamentos',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './treinamentos.component.html',
  styleUrl: './treinamentos.component.scss'
})
export class TreinamentosComponent{
  // TITLE
  public srcImg: string = 'assets/img/logoSub.webp';
  public altImg: string = 'Miniaturea do logo';
  public title: string = 'Acompanhe nosso calendário de treinamentos'

  // DATAS
  public cadeadoImg: string = 'assets/img/close.webp'
  public cadeadoAlt: string = 'icone de um cadeado'
  }

