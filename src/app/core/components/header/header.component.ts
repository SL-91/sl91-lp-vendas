import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { finalize } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // CRIANDO UMA PROPRIEDADE PRIVADA DO FORMBUILDER
  #fb = inject(FormBuilder)

  // VARIÁVEIS FORMULÁRIO
  public formHome = this.#fb.group({
    nome: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.minLength(8)]],
    cidade: ['', [Validators.required, Validators.minLength(3)]],
  })

  httpClient = inject(HttpClient)

  // FUNÇÃO POST API
  public sendForm(){
    // VERIFICANDO SE O FORMULÁRIO É VALIDO, SE FOR...
    if (this.formHome.valid) {
      // SETANDO CABEÇALHO DA REQUISIÇÃO (IDENTIFICA PARA O CONTENT-TYPE QUE ESTÁ ENVIANDO UMA APLICAÇÃO JSON E DEPOIS CONFIRMA QUE É UMA APLICAÇÃO JSON)
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
                           //API URL            // BODY
      this.httpClient.post(environment.apiUrl, JSON.stringify({
       data: [
          {
            nome: this.formHome.value.nome,
            email: this.formHome.value.email,
            telefone: this.formHome.value.telefone,
            cidade: this.formHome.value.cidade,
          }
        ]
    }), {headers: headers})
    // CONFIGURAÇÃO 'FINALIZE()', ADICIONA UMA FUNÇÃO PARA LIMPAR O FORMULÁRIO APÓS O ENVIO DE DADOS.
    .pipe(finalize(() => {
      this.clearForm()
    }))
    .subscribe()
    } else {
      // SE O FORMULÁRIO NÃO ESTIVER VÁLIDO
      alert ('Preencha todas informações!')
    }
    }

  // FUNÇÃO PARA LIMPAR O FORMULÁRIO E ENVIAR UMA MENSAGEM DE CONCLUÍDO
  private clearForm() {
    this.formHome.patchValue({
      nome: '',
      email: '',
      telefone: '',
      cidade: ''
    })
    alert('Registro enviado com sucesso!')
  }
}
