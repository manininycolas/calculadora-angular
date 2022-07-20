import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private num1: string;
  private num2: string;
  private resultado: number;
  private operacao: string;
  
  constructor(private calculadoraService: CalculadoraService) {}

  ngOnInit(): void {
    this.limpar();
  }

  /**
   * Inicializa todos os operadores para os valores padrão.
   * 
   * @return void
   */
  limpar(): void {
    this.num1 = '0';
    this.num2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Adiciona o número selecionado para o cálculo posteriormente
   * 
   * @param string num
   * @return void
   */
  adicionarNumero(num: string): void {
    if (this.operacao === null) {
      this.num1 = this.concatenarNumero(this.num1, num);
    } else {
      this.num2 = this.concatenarNumero(this.num2, num);
    }
  }

  /**
   * Torna o valor concatenado. Trata o separador decimal.
   * 
   * @param string numAtual
   * @param string numConcatenado
   * @return string
   */
  concatenarNumero(numAtual: string, numConcatenado: string): string {
    
    //caso contenha apenas'0' ou null, reinicia o valor
    if (numAtual === '0' || numAtual === null) {
      numAtual = '';
    }

    //primeiro dígito é '.', concatena '0' antes do ponto
    if (numConcatenado === '.' && numAtual === '') {
      return '0.';
    }

    //caso '.' digito e já contenha um '.', apenas retorna
    if(numConcatenado === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }
    return numAtual + numConcatenado;
  }

  /**
   * Executa lógica quando um oprador for selecionado.
   * Caso já possua uma operação selecionada, executa a
   * operação anterior, e define a nova operação.
   * 
   * @param string operacao
   * @return void
   */
  definirOperacao(operacao: string): void {
    
    //define a operação caso não exista uma
    if (this.operacao === null) {
      this.operacao = operacao;
      return;
    }
    
    /* caso operação definida e num2 selecionado,
       efetua o cálculo da operação */
    if (this.num2 !== null) {
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.num1),
        parseFloat(this.num2),
        this.operacao);
      this.operacao = operacao;
      this.num1 = this.resultado.toString();
      this.num2 = null;
      this.resultado = null;
    }
  }

  /**
   * Efetua o cálculo de uma operação.
   * 
   * @return void
   */
  calcular(): void {
    if (this.num2 === null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.num1),
      parseFloat(this.num2),
      this.operacao);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   * 
   * @return string
   */
  get display(): string {
    if (this.resultado !== null) {
      return this.resultado.toString();
    }
    if (this.num2 !== null) {
      return this.num2;
    }
    return this.num1;
  }
}
