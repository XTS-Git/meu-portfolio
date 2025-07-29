Ar Condicionado	15/09/2024	NuBank	4.121,43	5	824,29
Variados	23/08/2024	NuBank	69,90	3	23,30
Filtro	23/08/2024	NuBank	793,43	1	793,43
Q Frango	14/09/2024	NuBank	173,64	1	173,64
Mercado Livre	12/04/2024	NuBank	285,30	3	95,10
Mercado Livre	12/04/2024	NuBank	142,65	1	142,65
Kabum	14/02/2024	NuBank	362,09	5	72,42
Netshoes	21/01/2024	NuBank	349,99	5	70,00


var _dataCompras = new Array('15/09/2024', '23/08/2024');  // _planilha.getRange('G2:G30').getValues();   // Data da Compra
var _numParcelas = new Array(1,5); // _planilha.getRange('J2:J30').getValues();   // Número de Parcelas
var _valorPrestacao = new Array();  // _planilha.getRange('K2:K30').getValues(); // Valor da Prestação
var _cartaoUsado = new Array() // _planilha.getRange('H2:H30').getValues();    // Cartão Usado na compra
var _diaFechamento = 3 // _planilha.getRange('C2:C30').getValues();  // Dia do Fechamento
var _cartoes = Array('Nubank') //_planilha.getRange('A2:A30').getValues();        // Nomes dos cartões
var _hoje = new Date();

// Percorrer cada cartão da coluna A (nomes dos cartões)
for (var linha = 0; linha < _cartoes.length; linha++) {
  var cartaoAtual = _cartoes[linha][0]; // Nome do cartão na coluna A
  
  if (!cartaoAtual) continue;

  var totalFatura = 0;
  var totalFuturo = 0;

  // Iterar pelas compras para verificar se foram feitas com o cartão atual
  for (var i = 0; i < _dataCompras.length; i++) {
    var cartaoCompra = _cartaoUsado[i][0]; // O cartão usado para a compra
    if (cartaoCompra != cartaoAtual)  continue;

    var dataCompra = new Date(_dataCompras[i]);
    var diaFechamento = parseInt(_diaFechamento[linha][0]); // Dia de fechamento do cartão
    var totalParcelas = parseInt(_numParcelas[i]); // Número de parcelas
    var valorPrestacao = parseFloat(_valorPrestacao[i]); // Valor da prestação
    
    var dataProximoFechamento = DataProximoVencimento(diaFechamento);
    var dataUltimaParcela = DataUltimaParcela(dataCompra, diaFechamento, totalParcelas);
    var dataVencimentoAnterior = DataVencimentoAnterior(diaFechamento);
    var dataFechamentoParcela = dataCompra;
    for(var parc = 1; parc <= totalParcelas; parc++){
      dataFechamentoParcela = DataProximaParcela(dataFechamentoParcela, diaFechamento);

      if (dataUltimaParcela < dataProximoFechamento) continue;

      if (dataFechamentoParcela > dataProximoFechamento){
        totalFuturo+= valorPrestacao;
      }
      else if (dataFechamentoParcela < dataProximoFechamento ){
        totalFatura += valorPrestacao;
      }
    }      
  }

  // Definir o total da próxima fatura na coluna D
  // var celulaTotalFatura = _planilha.getRange(linha + 2, 4); // Coluna D
  var celulaTotalFatura = _planilha.getRange(2, 4); // Coluna D
  celulaTotalFatura.setValue(totalFatura);
  celulaTotalFatura.setNumberFormat('R$ #,##0.00'); // Formato de moeda para real

  // Definir o total futuro na coluna E
  // var celulaTotalFuturo = _planilha.getRange(linha + 2, 5); // Coluna E
  var celulaTotalFuturo = _planilha.getRange(2, 5); // Coluna E
  celulaTotalFuturo.setValue(totalFuturo);
  celulaTotalFuturo.setNumberFormat('R$ #,##0.00'); // Formato de moeda para real
}
}

function DataProximaParcela(dataCompra, diaFechamento){
var mesDaCompra = dataCompra.getMonth();
var anoDaCompra = dataCompra.getFullYear();
var dataProximaParcela = new Date(anoDaCompra, mesDaCompra, diaFechamento);
if (dataCompra > dataProximaParcela)
  dataProximaParcela = dataProximaParcela.setMonth(dataProximaParcela.getMonth() + 1);

  return new Date(dataProximaParcela);
  
}

function DataVencimentoAnterior(diaFechamento){
var hoje = new Date();
var diaHoje = hoje.getDay();
var dataFechamento = DataProximoVencimento(diaFechamento);

if (diaHoje <= diaFechamento)
  dataFechamento.setMonth(dataFechamento.getMonth() - 1);  

return dataFechamento;

}

function DataUltimaParcela(dataCompra, diaFechamento, parcelas){
 var mesDaCompra = dataCompra.getMonth();
 var anoDaCompra = dataCompra.getFullYear();
 var dataUltimaParcela = new Date(anoDaCompra, mesDaCompra, diaFechamento);
 var d = DataProximaParcela(dataCompra, diaFechamento);
 dataUltimaParcela = DataProximaParcela(dataCompra, diaFechamento);
 dataUltimaParcela.setMonth(dataUltimaParcela.getMonth() + parcelas - 1);
 return dataUltimaParcela;
}

function DataProximoVencimento(dia){
  var hoje = new Date();
var dataProximoFechamento = new Date(hoje.getFullYear(), hoje.getMonth(), dia);
if (hoje > dataProximoFechamento) 
  dataProximoFechamento.setMonth(dataProximoFechamento.getMonth() + 1);  

return dataProximoFechamento;
}