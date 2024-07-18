import { Component } from '@angular/core';
import { NavComponent } from "../../core/components/nav/nav.component";
import { HeaderComponent } from "../../core/components/header/header.component";
import { SobreComponent } from "../../core/components/sobre/sobre.component";
import { DiferenciaisComponent } from "../../core/components/diferenciais/diferenciais.component";
import { ProcessosComponent } from "../../core/components/processos/processos.component";
import { TreinamentosComponent } from "../../core/components/treinamentos/treinamentos.component";
import { DepoimentosComponent } from "../../core/components/depoimentos/depoimentos.component";
import { FooterComponent } from "../../core/components/footer/footer.component";
import { CallActionComponent } from '../../core/components/call-action/call-action.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [NavComponent, HeaderComponent, SobreComponent, DiferenciaisComponent, ProcessosComponent, TreinamentosComponent, DepoimentosComponent, FooterComponent, CallActionComponent]
})
export class HomeComponent {

}
