// Iniciar.js - Script de Pop-up estilo WhatsApp
(function() {
    // 1. Verificação de segurança: Evita criar dois pop-ups se o agente clicar no link duas vezes
    if (document.getElementById('meu-wpp-popup')) return;

    // 2. Injetar o CSS (Visual do Pop-up)
    const style = document.createElement('style');
    style.innerHTML = `
        #meu-wpp-popup {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            background: #e5ddd5; /* Cor de fundo clássica do chat */
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 999999; /* Fica acima de tudo no Genesys */
            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .wpp-header {
            background: #075e54; /* Verde escuro do WhatsApp */
            color: white;
            padding: 12px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
        }
        .wpp-close {
            cursor: pointer;
            font-size: 20px;
            line-height: 1;
        }
        .wpp-body {
            padding: 15px;
            height: 250px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .wpp-msg-in {
            background: white;
            padding: 8px 12px;
            border-radius: 0px 8px 8px 8px;
            align-self: flex-start;
            max-width: 80%;
            box-shadow: 0 1px 1px rgba(0,0,0,0.1);
            color: #303030;
            font-size: 14px;
        }
        .wpp-msg-out {
            background: #dcf8c6; /* Verde claro dos balões de envio */
            padding: 8px 12px;
            border-radius: 8px 0px 8px 8px;
            align-self: flex-end;
            max-width: 80%;
            box-shadow: 0 1px 1px rgba(0,0,0,0.1);
            color: #303030;
            font-size: 14px;
        }
        .wpp-footer {
            padding: 10px;
            background: #f0f0f0;
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .wpp-input {
            flex: 1;
            padding: 10px 15px;
            border: none;
            border-radius: 20px;
            outline: none;
            font-size: 14px;
        }
        .wpp-btn {
            background: #128c7e;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .wpp-btn:active {
            background: #075e54;
        }
    `;
    document.head.appendChild(style);

    // 3. Injetar o HTML (A caixinha em si)
    const popup = document.createElement('div');
    popup.id = 'meu-wpp-popup';
    popup.innerHTML = `
        <div class="wpp-header">
            <span>Atendimento (Novo Cliente)</span>
            <span class="wpp-close" id="wpp-close-btn">&times;</span>
        </div>
        <div class="wpp-body" id="wpp-chat-body">
            <!-- Esta é uma mensagem de exemplo simulando a chegada do cliente -->
            <div class="wpp-msg-in">Olá! Preciso de ajuda com meu plano.</div>
        </div>
        <div class="wpp-footer">
            <input type="text" class="wpp-input" id="wpp-input-text" placeholder="Digite sua resposta...">
            <button class="wpp-btn" id="wpp-send-btn">&#10148;</button>
        </div>
    `;
    document.body.appendChild(popup);

    // 4. Lógica de Funcionamento (Cliques e Botões)
    const closeBtn = document.getElementById('wpp-close-btn');
    const sendBtn = document.getElementById('wpp-send-btn');
    const inputField = document.getElementById('wpp-input-text');
    const chatBody = document.getElementById('wpp-chat-body');

    // Função para fechar o pop-up
    closeBtn.onclick = function() {
        popup.remove();
        // Remove também o estilo para não acumular lixo no HTML
        style.remove(); 
    };

    // Função para enviar a mensagem
    function enviarMensagem() {
        const texto = inputField.value.trim();
        if (texto !== '') {
            // Cria o balão verde do agente
            const msgOut = document.createElement('div');
            msgOut.className = 'wpp-msg-out';
            msgOut.innerText = texto;
            
            // Coloca na tela
            chatBody.appendChild(msgOut);
            
            // Rola o chat para o final
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Limpa o campo de texto
            inputField.value = '';

            // -------------------------------------------------------------
            // AQUI ENTRA A SUA LÓGICA DE API (FETCH) PARA ENVIAR DE VERDADE
            // Exemplo:
            // fetch('SUA_URL_DA_API', { method: 'POST', body: ... })
            // -------------------------------------------------------------
        }
    }

    // Aciona o envio ao clicar no botão
    sendBtn.onclick = enviarMensagem;
    
    // Aciona o envio ao apertar "Enter" no teclado
    inputField.onkeypress = function(e) {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    };
})();
