import { Component } from '@angular/core';
import { BoxPessoasComponent } from './box-pessoas/box-pessoas.component';


@Component({
  selector: 'app-depoimentos',
  standalone: true,
  imports: [BoxPessoasComponent],
  templateUrl: './depoimentos.component.html',
  styleUrl: './depoimentos.component.scss'
})
export class DepoimentosComponent {
  public titleDepoimentos: string = 'Confira alguns depoimentos de corretores parceiros';
}
