import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-call-action',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './call-action.component.html',
  styleUrl: './call-action.component.scss'
})
export class CallActionComponent implements AfterViewInit{

  // BOX CHAMADA
  public imgBox: string = 'assets/img/treinamento.webp';
  public altBox: string = 'imagem ilustrativa de uma equipe';

  @ViewChild('titleBox') public titleBox!: ElementRef;
  @ViewChild('descriptionBox') public descriptionBox!: ElementRef;
  @ViewChild('descriptionBox2') public descriptionBox2!: ElementRef;
  @ViewChild('btnBox') public btnBox!: ElementRef;

  ngAfterViewInit(): void {
      this.titleBox.nativeElement.innerHTML = 'Conquiste sua independência financeira!';
      this.descriptionBox.nativeElement.innerHTML = 'Seja um vendedor de planos de saúde parceiro da SL91 e ganhe até R$5.000,00 por mês <b>trabalhando de casa</b>.';
      this.descriptionBox2.nativeElement.innerHTML = 'Realize seus sonhos e aproveite os benefícios de ser um Corretor SL91.';
      this.btnBox.nativeElement.innerHTML = 'QUERO ME CADASTRAR NA SL91';
}
}
