import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  nome = '';
  email = '';
  telefone = '';
  cidade = '';
  httpClient = inject(HttpClient)

  // FUNÇÃO POST API
  public sendForm(){

    // SETANDO CABEÇALHO DA REQUISIÇÃO (IDENTIFICA PARA O CONTENT-TYPE QUE ESTÁ ENVIANDO UMA APLICAÇÃO JSON E DEPOIS CONFIRMA QUE É UMA APLICAÇÃO JSON)
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
                         //API URL            // BODY
    this.httpClient.post(environment.apiUrl, JSON.stringify({
     data: [
        {
          nome: this.nome,
          email: this.email,
          telefone: this.telefone,
          cidade: this.cidade,
        }
      ]
  }), {headers: headers})
  // CONFIGURAÇÃO 'FINALIZE()', ADICIONA UMA FUNÇÃO PARA LIMPAR O FORMULÁRIO APÓS O ENVIO DE DADOS.
  .pipe(finalize(() => { this.clearForm() }))
  .subscribe()
  }

  // FUNÇÃO PARA LIMPAR O FORMULÁRIO E ENVIAR UMA MENSAGEM
  private clearForm() {
    this.nome = '';
    this.email = '';
    this.telefone = '';
    this.cidade = '';
    alert('Registro enviado com sucesso!')
  }
}
