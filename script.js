// CONFIGURAÇÃO: Coloque aqui os seus jogos (6 números em cada array)
const meusJogos = [
    [3, 23, 27, 33, 47, 59], 
    [10, 13, 17, 25, 35, 58],
    [3, 8, 19, 24, 51, 55]
];

async function conferirSorteio() {
    try {
        // Busca o resultado da API (último concurso)
        const response = await fetch('https://loteriascaixa-api.herokuapp.com/api/megasena/latest');
        const data = await response.json();
        
        const dezenasSorteadas = data.dezenas; // Vem como ["01", "05"...]
        document.getElementById('concurso').innerText = data.concurso;
        document.getElementById('data-concurso').innerText = data.data;

        // Renderiza as bolas do resultado oficial
        const containerOficial = document.getElementById('dezenas-oficiais');
        containerOficial.innerHTML = '';
        dezenasSorteadas.forEach(num => {
            containerOficial.innerHTML += `<div class="bola">${num}</div>`;
        });

        // Compara com os meus jogos
        const listaJogosUI = document.getElementById('lista-jogos');
        listaJogosUI.innerHTML = '';

        meusJogos.forEach((jogo, index) => {
            let acertosContador = 0;
            let htmlBolas = '';

            // Ordena o jogo para ficar bonito
            jogo.sort((a, b) => a - b).forEach(num => {
                const numFormatado = num.toString().padStart(2, '0');
                const ehAcerto = dezenasSorteadas.includes(numFormatado);
                
                if(ehAcerto) acertosContador++;
                
                htmlBolas += `<div class="bola ${ehAcerto ? 'acerto' : ''}">${numFormatado}</div>`;
            });

            listaJogosUI.innerHTML += `
                <div class="jogo-item">
                    <strong>Aposta ${index + 1}:</strong> ${acertosContador} acertos
                    <div class="bolas-container">${htmlBolas}</div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Erro ao buscar resultado:", error);
        alert("Não foi possível carregar os resultados. Tente novamente mais tarde.");
    }
}

// Executa assim que abrir a página
conferirSorteio();