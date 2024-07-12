import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, DoCheck, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { finalize, map, Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

// VALIDANDO O CAMPO 'TELEFONE' PARA RECEBER APENAS NÚMERO
function numberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isNumber = /[0-9]/.test(control.value)
    const isText = /[a-z]/.test(control.value)
    if (isNumber && !isText) {
      return null;
    }
    return { numberValidator: true}
  }
}

// VALIDANDO O CAMPO 'CIDADE' E 'NOME' PARA RECEBER APENAS STRING
function stringValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isNumber = /[0-9]/.test(control.value)
    const isText = /[a-z]/.test(control.value)
    if (!isNumber && isText) {
      return null;
    }
    return { stringValidator: true}
  }
}

// INTERFACE PADRÃO DA API GET
interface listEstadosApi {
  sigla: string,
}

interface listaCidadesApi {
  nome: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnInit{

  // RECEBENDO O IDENTIFICADOR DOS ELEMENTOS
  @ViewChild('h1') public title!: ElementRef;
  @ViewChild('span') public subTitle!: ElementRef;
  @ViewChild('btn') public button!: ElementRef;

  // DEFININDO OS VALORES PARA OS ELEMENTOS DINÂMICAMENTE
  ngAfterViewInit(): void {
      this.title.nativeElement.innerHTML = 'A <b>Corretora SL91</b> é a corretora exclusiva Hapvida NDI que mais cresce e inova no país.';
      this.subTitle.nativeElement.innerHTML = 'Junte-se a nós e usufrua do <b>melhor comissionamento</b> do mercado';
      this.button.nativeElement.innerHTML = 'Entre em contato com nosso suporte';
  }

  // CRIANDO UMA PROPRIEDADE PRIVADA DO FORMBUILDER
  #fb = inject(FormBuilder)

  // VARIÁVEIS FORMULÁRIO
  public selecioneEstado = '';
  public selecioneCidade = '';
  public formHome = this.#fb.group({
    nome: ['', [Validators.required, Validators.minLength(3), stringValidator()]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/.+@.+\..+/)]],
    telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(15),numberValidator()]],
    estado: ['', [Validators.required]],
    cidade: ['', [Validators.required, Validators.minLength(3), stringValidator()]],
  })

  // INJETANDO AS DEPENDÊNCIAS DO HTPPCLIENT (POST, GET...)
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
            estado: this.formHome.value.estado,
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
      estado: '',
      cidade: ''
    })
    alert('Registro enviado com sucesso!')
  }

  // PEGANDO A API DO FORMULÁRIO ESTADO
  #urlEstadosApi = signal(environment.apiEstadosUrl);

  // VARIAVEL QUE SERÁ ARMAZENADA AS INFORMAÇÕES DA API GET
  public getEstados = signal<null | Array<{
    sigla: string;
  }>>(null);

  public cidadesAtivas: string[] = [];

  // FAZENDO UMA REQUISIÇÃO GET PARA BUSCAR OS DADOS
  public listEstados(): Observable<Array<listEstadosApi>> {
    return this.httpClient.get<listEstadosApi[]>(this.#urlEstadosApi());
  }

  public listCidades(estado: string): Observable<Array<listaCidadesApi>> {
    return this.httpClient.get<listaCidadesApi[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
  }

  ngOnInit(): void {
      this.getEstadosApi();
      this.getCidadesApi();
  }

  // TRATANDO OS DADOS DA API ESTADOS
  public getEstadosApi(){
    this.listEstados().subscribe({
      next: (next) => {
        this.getEstados.set(next);
      },
      error: (error) => console.log(error),
      complete: () => console.log('Complete'),
    });
  }
  // TRATANDO OS DADOS DA API CIDADES
  public getCidadesApi(){
    this.formHome.get('estado')?.valueChanges.subscribe((value) => {
      const estado = value as string;
      this.listCidades(estado).subscribe((cidades) => {
        this.cidadesAtivas = cidades.map((cidade)=>{
          return cidade.nome;
        })
      });
    })
  }

}
