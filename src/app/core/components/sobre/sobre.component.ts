import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.scss'
})
export class SobreComponent implements AfterViewInit{

  // DEFININDO OS DADOS DA EMPRESA
  public diamantes: string = '+ DE X';
  public parceiros: string = '+ DE X';
  public mercado: string = '31 ANOS';

  // RECEBENDO O IDENTIFICADOR DOS ELEMENTOS
  @ViewChild('titleSobre') public title!: ElementRef;
  @ViewChild('description') public description!: ElementRef;
  @ViewChild('buttonSobre') public button!: ElementRef;

  // DEFININDO OS VALORES PARA OS ELEMENTOS DINÂMICAMENTE
  ngAfterViewInit(): void {
      this.title.nativeElement.innerHTML = 'Sobre nós';
      this.description.nativeElement.innerHTML = 'A Corretora SL91 é uma empresa brasileira com 31 anos de experiência no mercado de vendas de Planos de Saúde exclusivos Hapvida NDI. Com uma trajetória marcada pela excelência e qualidade de seus serviços, a empresa tornou-se referência na área de vendas e hoje é uma das maiores corretoras do Brasil.';
      this.button.nativeElement.innerHTML = 'Visite nosso Instagram';
  }

  // DEFININDO AS IMAGENS
  public srcLogo = 'assets/img/logoSub.webp';
  public altLogo = 'logo em miniatura de um titulo';

  public srcImg = 'assets/img/sobre.webp';
  public altImg = 'imagem ilustrativa de uma equipe';

}
