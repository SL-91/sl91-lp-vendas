import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-treinamentos',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './treinamentos.component.html',
  styleUrl: './treinamentos.component.scss'
})
export class TreinamentosComponent implements AfterViewInit{
  // TITLE
  public srcImg: string = 'assets/img/logoSub.webp';
  public altImg: string = 'Miniaturea do logo';
  public title: string = 'Calendário de treinamentos'

  // DATAS
  public cadeadoImg: string = 'assets/img/close.webp'
  public cadeadoAlt: string = 'icone de um cadeado'

  // BOX CHAMADA
  public imgBox: string = 'assets/img/treinamento.webp';
  public altBox: string = 'imagem ilustrativa de uma equipe';

  @ViewChild('titleBox') public titleBox!: ElementRef;
  @ViewChild('descriptionBox') public descriptionBox!: ElementRef;
  @ViewChild('btnBox') public btnBox!: ElementRef;

  ngAfterViewInit(): void {
      this.titleBox.nativeElement.innerHTML = 'É a sua chance de mudar de vida!';
      this.descriptionBox.nativeElement.innerHTML = 'Além de contar com atendimento financeiro e comercial full-time, você conta com o maior comissionamento do mercado.Não perca tempo e cadastre-se agora mesmo.';
      this.btnBox.nativeElement.innerHTML = 'QUERO ME CADASTRAR NA SL91!';
  }
}
