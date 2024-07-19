import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { finalize} from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorForm } from '../../../shared/validators/formulario';
import { ApiService } from '../../../shared/services/api.service';
import { iTurmas } from '../../../shared/interfaces/global';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnInit{

  // DISPLAY
  public mobile = window.matchMedia("(max-width:960px)");

  // RECEBENDO O IDENTIFICADOR DOS ELEMENTOS
  @ViewChild('h1') public title!: ElementRef;
  @ViewChild('span') public subTitle!: ElementRef;
  @ViewChild('btn') public button!: ElementRef;

  // DEFININDO OS VALORES PARA OS ELEMENTOS DINÂMICAMENTE
  ngAfterViewInit(): void {
    this.title.nativeElement.innerHTML = 'Ganhe até <b>R$5.000,00</b> por mês tornando-se um parceiro da Corretora de Planos de Saúde, SL91, sem sair de casa.';
    this.subTitle.nativeElement.innerHTML = 'Alcance sua <b>independência financeira</b> e aproveite os privilégios de ser um corretor SL91.';
    this.button.nativeElement.innerHTML = 'Entre em contato com o nosso suporte';

    if(this.mobile.matches){
      this.title.nativeElement.innerHTML = "Ganhe até <b>R$5.000,00</b> por mês tornando-se um parceiro da Corretora de Planos de Saúde, SL91.";
    }
  }

  // INJETANDO AS DEPENDÊNCIAS DOS ARQUIVOS
  fb = inject(FormBuilder)
  ValidatorForm = inject(ValidatorForm);
  ApiService = inject(ApiService);

  // VARIÁVEIS FORMULÁRIO
  public selecioneTurma = '';
  public selecioneEstado = '';
  public selecioneCidade = '';
  public formHome = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3), this.ValidatorForm.stringValidator()]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/.+@.+\..+/)]],
    telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(15),this.ValidatorForm.numberValidator()]],
    turma: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    cidade: ['', [Validators.required, Validators.minLength(3)]],
  })

  // FUNÇÃO POST API
  public sendForm(){
    // VERIFICANDO SE O FORMULÁRIO É VALIDO, SE FOR...
    if (this.formHome.valid) {
      // SETANDO CABEÇALHO DA REQUISIÇÃO (IDENTIFICA PARA O CONTENT-TYPE QUE ESTÁ ENVIANDO UMA APLICAÇÃO JSON E DEPOIS CONFIRMA QUE É UMA APLICAÇÃO JSON)
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
                           //API URL            // BODY
      this.ApiService.httpClient.post(environment.apiUrl, JSON.stringify({
       data: [
          {
            nome: this.formHome.value.nome,
            email: this.formHome.value.email,
            telefone: this.formHome.value.telefone,
            estado: this.formHome.value.estado,
            cidade: this.formHome.value.cidade,
            turma: this.formHome.value.turma,
            data: this.getData(),
          }
        ]
    }), {headers: headers})
    // CONFIGURAÇÃO 'FINALIZE()', ADICIONA UMA FUNÇÃO PARA LIMPAR O FORMULÁRIO APÓS O ENVIO DE DADOS.
    .pipe(finalize(() => {
      this.clearForm()
    })).subscribe()
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
      turma: '',
      estado: '',
      cidade: ''
    })
    alert('Registro enviado com sucesso!')
  }
  // FUNÇÃO PARA FORMATAR DATA
  public getData(){
    let data = new Date().toLocaleDateString()
    let hours = new Date().toLocaleTimeString()
    return data + ' - ' + hours;
  }

  // VARIAVEL QUE SERÁ ARMAZENADA AS INFORMAÇÕES DA API GET
  public getEstados = signal<null | Array<{ sigla: string; }>>(null);
  public getCidades: string[] = [];
  public getTurmas: Array<string> = ['11 de Julho', '20 de Julho', '27 de Julho']
  // public getTurma: iTurmas[] = [];

  // TRATANDO OS DADOS DA API TURMA
  //public getTurmasApi() {
  //  this.ApiService.listTurma().subscribe(
  //   res => {
  //      this.getTurma = res;
  //      console.log(this.getTurma);
  //    }
  // );
  //}

  // TRATANDO OS DADOS DA API ESTADOS
  public getEstadosApi(){
    this.ApiService.listEstados().subscribe({
      next: (next) => {
        this.getEstados.set(next);
      },
      error: (error) => console.log(error),
    });
  }
  // TRATANDO OS DADOS DA API CIDADES
  public getCidadesApi(){
    this.formHome.get('estado')?.valueChanges.subscribe((value) => {
      const estado = value as string;
      this.ApiService.listCidades(estado).subscribe((cidades) => {
        this.getCidades = cidades.map((cidade)=>{
          return cidade.nome;
        })
      });
      if (this.formHome.get('cidade')?.valid) {
        this.formHome.get('cidade')?.patchValue('')
      }
    })
  }

  ngOnInit(): void {
    this.getEstadosApi();
    this.getCidadesApi();
    // this.getTurmasApi();
  }
}
