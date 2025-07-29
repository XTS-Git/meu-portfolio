
var dataCompra = new Date(2024, 0, 5);
var diaFechamento = 3;
var parcelas = 5;
console.log(`Data Compra: ${formatarData(dataCompra)}`);
console.log(`DAta Ultima: ${formatarData(DataUltimaParcela(dataCompra, diaFechamento, parcelas))} `);



function DataUltimaParcela(dataCompra, diaFechamento, parcelas){
   var mesDaCompra = dataCompra.getMonth();
   var anoDaCompra = dataCompra.getFullYear();
   var dataUltimaParcela = new Date(anoDaCompra, mesDaCompra, diaFechamento);
   var d = DataProximaParcela(dataCompra, diaFechamento);
   dataUltimaParcela = DataProximaParcela(dataCompra, diaFechamento);
   dataUltimaParcela.setMonth(dataUltimaParcela.getMonth() + parcelas - 1);
   return dataUltimaParcela;
 }

 function formatarData(data) {
   const dia = String(data.getDate()).padStart(2, '0'); // Dia
   const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês (0-11, então adicionamos 1)
   const ano = data.getFullYear(); // Ano
   return `${dia}/${mes}/${ano}`; // Formato dd/mm/yyyy
 }

 function DataProximaParcela(dataCompra, diaFechamento){
   // dataCompra = new Date(dataCompra);
   var mesDaCompra = dataCompra.getMonth();
   var anoDaCompra = dataCompra.getFullYear();
   var dataProximaParcela = new Date(anoDaCompra, mesDaCompra, diaFechamento);
   if (dataCompra > dataProximaParcela)
     dataProximaParcela = dataProximaParcela.setMonth(dataProximaParcela.getMonth() + 1);
 
     return new Date(dataProximaParcela);
     
 }