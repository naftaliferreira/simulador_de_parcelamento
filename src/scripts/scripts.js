// Obter referências para os elementos do DOM
const valorProdutoInput = document.getElementById('valor-produto');
const taxaJurosInput = document.getElementById('taxa-juros');
const numeroParcelasInput = document.getElementById('numero-parcelas');
const calcularButton = document.getElementById('calcular-button');
const resultadoDiv = document.getElementById('resultado');

// Adicionar um evento de clique no botão de cálculo
calcularButton.addEventListener('click', () => {
    // 1. Obter os valores dos inputs e converter para números
    const valorProduto = parseFloat(valorProdutoInput.value);
    const taxaJuros = parseFloat(taxaJurosInput.value);
    const numeroParcelas = parseInt(numeroParcelasInput.value);

    // 2. Validação básica dos inputs
    if (isNaN(valorProduto) || isNaN(taxaJuros) || isNaN(numeroParcelas) || valorProduto <= 0 || taxaJuros < 0 || numeroParcelas <= 0) {
        resultadoDiv.innerHTML = '<p style="color: red;">Por favor, preencha todos os campos com valores válidos.</p>';
        return; // Interrompe a execução da função
    }

    // 3. Converter a taxa de juros de porcentagem para decimal
    const i = taxaJuros / 100;

    // 4. Aplicar a fórmula de cálculo da parcela
    // Usamos Math.pow() para elevar (1 + i) à potência n
    const potencia = Math.pow(1 + i, numeroParcelas);
    const valorParcela = valorProduto * (i * potencia) / (potencia - 1);

    // 5. Calcular o valor total a ser pago
    const valorTotal = valorParcela * numeroParcelas;
    const jurosTotais = valorTotal - valorProduto;

    // 6. Formatar os valores para exibição como moeda
    const valorParcelaFormatado = valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const valorTotalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const jurosTotaisFormatado = jurosTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // 7. Exibir o resultado na tela
    resultadoDiv.innerHTML = `
        <p><strong>Valor da Parcela:</strong> ${valorParcelaFormatado}</p>
        <p><strong>Valor Total a Pagar:</strong> ${valorTotalFormatado}</p>
        <p><strong>Total de Juros:</strong> ${jurosTotaisFormatado}</p>
    `;
});