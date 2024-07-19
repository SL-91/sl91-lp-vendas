import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { iTurmas } from '../interfaces/global';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpClient = inject(HttpClient);
  urlEstadosApi = signal(environment.apiEstadosUrl);
  private urlTurma = 'http://localhost:3000';

  // FAZENDO UMA REQUISIÇÃO GET PARA BUSCAR OS DADOS DOS ESTADOS
  public listEstados(): Observable<Array<{sigla: string}>> {
    return this.httpClient.get<[]>(this.urlEstadosApi());
  }

  // FAZENDO UMA REQUISIÇÃO GET PARA BUSCAR OS DADOS DAS CIDADES
  public listCidades(estado: string): Observable<Array<{nome: string}>> {
    return this.httpClient.get<[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
  }

  public listTurma(): Observable<iTurmas[]> {
    return this.httpClient.get<iTurmas[]>(`${this.urlTurma}/data`);
  }

}
