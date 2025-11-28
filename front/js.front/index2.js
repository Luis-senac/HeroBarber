// atividade nos botões de horario
const botoes = document.querySelectorAll('.botoes-horario button');
  
    botoes.forEach(botao => {
      botao.addEventListener('click', () => {
        // Remove a classe "ativo" de todos os botões
        botoes.forEach(b => b.classList.remove('ativo'));
  
        // Adiciona a classe "ativo" apenas ao botão clicado
        botao.classList.add('ativo');
      });
    });

    // botão ver mais 
    document.addEventListener('DOMContentLoaded', function() {
    // 1. Obter referências aos elementos
    const btnVerMais = document.getElementById('btnVerMais');
    const horariosAdicionais = document.getElementById('horariosAdicionais');

    // 2. Adicionar o "ouvinte" de evento de clique ao botão
    btnVerMais.addEventListener('click', function() {
        // 3. Verifica se a div está escondida (ela começa com display: none pelo CSS)
        if (horariosAdicionais.style.display === 'none' || horariosAdicionais.style.display === '') {
            // Se estiver escondida, mostre-a (usando 'flex' para manter o estilo do .botoes-horario)
            horariosAdicionais.style.display = 'flex'; 
            
            // Opcional: Altere o texto do botão para "ver menos"
            btnVerMais.textContent = 'ver menos';
        } else {
            // Se estiver visível, esconda-a
            horariosAdicionais.style.display = 'none';
            
            // Opcional: Altere o texto do botão de volta para "ver mais"
            btnVerMais.textContent = 'ver mais';
        }
    });
});

// bloqueador de campo branco, profissional
document.addEventListener('DOMContentLoaded', function() {
    const inputProfissional = document.getElementById('profissional');
    const listaProfissionais = document.getElementById('listaProfissionaisDropdown');
    const botoesNomes = listaProfissionais.querySelectorAll('.nome-clicavel');

    // 1. Lógica para mostrar a lista quando o INPUT receber foco
    inputProfissional.addEventListener('focus', function() {
        listaProfissionais.style.display = 'block';
    });
    
    // Opcional: Lógica para esconder a lista quando o usuário clicar fora
    document.addEventListener('click', function(event) {
        // Verifica se o clique NÃO foi no input e NÃO foi na lista suspensa
        if (event.target !== inputProfissional && !listaProfissionais.contains(event.target)) {
            listaProfissionais.style.display = 'none';
        }
    });

    // 2. Lógica para preencher o input e esconder a lista ao clicar no nome
    botoesNomes.forEach(button => {
        button.addEventListener('click', function() {
            const nomeEscolhido = button.getAttribute('data-nome');
            
            // Preenche o campo de input com o nome
            inputProfissional.value = nomeEscolhido;
            
            // Esconde a lista de nomes
            listaProfissionais.style.display = 'none';
            
            // Opcional: Simular que o campo foi validado ou avançar para o próximo passo.
            inputProfissional.focus(); // Coloca o foco de volta no input (opcional)
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtenha a referência ao botão pelo ID
    const botaoFinalizar = document.getElementById('finalizarBtn');
    
    // 2. Adicione o "ouvinte" de evento de clique
    botaoFinalizar.addEventListener('click', function() {
        // 3. Redirecionamento usando window.location.href
        window.location.href = "agen.html"; 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioLogin');
    const inputHorario = document.getElementById('horarioSelecionado');
    const botoesHorario = document.querySelectorAll('.horario-btn');
    const mensagemErro = document.getElementById('erroHorario');

    // Função para lidar com o clique em um botão de horário
    botoesHorario.forEach(botao => {
        botao.addEventListener('click', function() {
            // 1. Limpa a seleção visual em todos os botões
            botoesHorario.forEach(btn => btn.classList.remove('selecionado'));

            // 2. Marca o botão clicado visualmente (você precisará de CSS para a classe 'selecionado')
            this.classList.add('selecionado');

            // 3. Atualiza o valor do campo oculto com o horário
            const horario = this.getAttribute('data-horario');
            inputHorario.value = horario;

            // 4. Esconde a mensagem de erro, se estiver visível
            mensagemErro.style.display = 'none';

            console.log("Horário selecionado:", horario);
        });
    });
    
    // Opcional: Implementação do "ver mais" (se já não estiver feita)
    // Exemplo básico:
    const btnVerMais = document.getElementById('btnVerMais');
    const horariosAdicionais = document.getElementById('horariosAdicionais');
    if (btnVerMais) {
        btnVerMais.addEventListener('click', function() {
            // Alterna a visibilidade dos horários adicionais
            horariosAdicionais.classList.toggle('horarios-escondidos');
            // Altera o texto do botão
            if (horariosAdicionais.classList.contains('horarios-escondidos')) {
                this.textContent = 'ver mais';
            } else {
                this.textContent = 'ver menos';
            }
        });
    }


    // FUNÇÃO PRINCIPAL: Bloquear o envio do formulário
    formulario.addEventListener('submit', function(event) {
        // Verifica se o campo oculto 'horarioSelecionado' está vazio
        if (inputHorario.value.trim() === "") {
            // 1. Impede o envio do formulário
            event.preventDefault(); 
            
            // 2. Mostra a mensagem de erro
            mensagemErro.style.display = 'block';

            console.error("Tentativa de login bloqueada: Horário não selecionado.");
        } 
        // Se o valor NÃO estiver vazio, o formulário será enviado normalmente.
    });
});

function validarSelecao(input) {
    var valorDigitado = input.value;
    var listaDeOpcoes = document.getElementById(input.getAttribute('list'));
    var opcoes = listaDeOpcoes.options;
    var valorValido = false;

    // Verifica se o valor digitado existe nas opções
    for (var i = 0; i < opcoes.length; i++) {
        if (valorDigitado === opcoes[i].value) {
            valorValido = true;
            break;
        }
    }

    // Se o valor não for válido
    if (!valorValido && valorDigitado !== "") {
        // Limpa o campo e mostra um erro
        input.value = "";
        
        // Exibe a mensagem de erro se você tiver o elemento <small>
        var erroElement = document.getElementById('erroProfissional');
        if (erroElement) {
            erroElement.style.display = 'block';
        }
        
        // Opcional: Adiciona um foco para forçar a seleção
        input.focus();
    } else {
        // Esconde o erro se o valor for válido ou o campo estiver vazio
        var erroElement = document.getElementById('erroProfissional');
        if (erroElement) {
            erroElement.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formAgendamento');
    const inputProfissional = document.getElementById('profissional');
    const inputHorario = document.getElementById('horarioSelecionado');
    const todosBotoesHorario = document.querySelectorAll('.hora .botoes-horario button[type="button"]');

    // ==========================================================
    // Lógica 1: Gerenciamento de Seleção de Horário (Preenche o campo escondido)
    // Isso deve ser mantido, pois preenche o campo que será validado.
    // ==========================================================
    todosBotoesHorario.forEach(button => {
        button.addEventListener('click', function() {
            todosBotoesHorario.forEach(btn => {
                btn.classList.remove('selecionado');
            });
            this.classList.add('selecionado');
            inputHorario.value = this.textContent.trim();
        });
    });

    // ==========================================================
    // Lógica 2: Validação Personalizada do Profissional
    // Mantida a função no evento 'change' para feedback em tempo real
    // ==========================================================
    window.validarSelecao = function(input) {
        // ... (Mantenha o código da função validarSelecao que limpa o input se for inválido)
        var valorDigitado = input.value;
        var listaDeOpcoes = document.getElementById(input.getAttribute('list'));
        var opcoes = listaDeOpcoes.options;
        var valorValido = false;

        for (var i = 0; i < opcoes.length; i++) {
            if (valorDigitado === opcoes[i].value) {
                valorValido = true;
                break;
            }
        }

        var erroElement = document.getElementById('erroProfissional');

        if (!valorValido && valorDigitado !== "") {
            input.value = "";
            if (erroElement) {
                erroElement.style.display = 'block';
            }
        } else {
            if (erroElement) {
                erroElement.style.display = 'none';
            }
        }
        return valorValido; // Retorna o status da validação
    };

    // ==========================================================
    // Lógica 3: Controle do Envio com preventDefault()
    // ==========================================================
    form.addEventListener('submit', function(event) {
        
        // 1. IMPEDE o envio padrão do formulário
        event.preventDefault(); 

        // 2. Executa a validação nativa do HTML5 (required, type="email", etc.)
        const nativamenteValido = form.checkValidity();

        // 3. Executa a validação PERSONALIZADA do Profissional (para garantir que o campo não foi preenchido manualmente com erro)
        const profissionalValido = validarSelecao(inputProfissional);

        // 4. Se a validação nativa ou a personalizada falhar:
        if (!nativamenteValido || !profissionalValido) {
            
            // Força o navegador a mostrar a mensagem de erro nativa do primeiro campo inválido
            form.reportValidity(); 
            
            // Se a validação do profissional falhar, force o foco nele
            if (!profissionalValido && inputProfissional.value !== "") {
                inputProfissional.focus();
            }
            
            // NÃO envia o formulário
            return; 
        }

        // 5. Se todas as validações (nativas e personalizadas) passarem:
        
        // Exemplo: Você pode adicionar aqui uma animação de carregamento ou uma confirmação
        console.log("Formulário validado com sucesso! Enviando...");
        
        // Envia o formulário programaticamente
        form.submit();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formAgendamento');
    const inputProfissional = document.getElementById('profissional');
    const inputHorario = document.getElementById('horarioSelecionado');
    const todosBotoesHorario = document.querySelectorAll('.hora .botoes-horario button[type="button"]');

    // ==========================================================
    // A. Função de Validação do Profissional
    // ==========================================================
    window.validarSelecao = function(input) {
        var valorDigitado = input.value;
        var listaDeOpcoes = document.getElementById(input.getAttribute('list'));
        var opcoes = listaDeOpcoes.options;
        var valorValido = false;

        for (var i = 0; i < opcoes.length; i++) {
            if (valorDigitado === opcoes[i].value) {
                valorValido = true;
                break;
            }
        }

        var erroElement = document.getElementById('erroProfissional');

        if (!valorValido && valorDigitado !== "") {
            input.value = ""; // Limpa o campo se for inválido, forçando a falha do 'required'
            if (erroElement) {
                erroElement.style.display = 'block';
            }
        } else {
            if (erroElement) {
                erroElement.style.display = 'none';
            }
        }
        return valorValido; 
    };

    // ==========================================================
    // B. Lógica de Seleção de Horário
    // ==========================================================
    todosBotoesHorario.forEach(button => {
        button.addEventListener('click', function() {
            // Remove destaque de todos
            todosBotoesHorario.forEach(btn => {
                btn.classList.remove('selecionado');
            });
            // Adiciona destaque ao selecionado
            this.classList.add('selecionado');
            // Preenche o campo escondido, SATISFAZENDO O 'REQUIRED'
            inputHorario.value = this.textContent.trim();
        });
    });

    // Lógica para o botão "ver mais" (opcional)
    const btnVerMais = document.getElementById('btnVerMais');
    const horariosAdicionais = document.getElementById('horariosAdicionais');
    if (btnVerMais && horariosAdicionais) {
        btnVerMais.addEventListener('click', function() {
            horariosAdicionais.classList.toggle('horarios-escondidos'); 
            this.textContent = horariosAdicionais.classList.contains('horarios-escondidos') ? 'ver mais' : 'ver menos';
        });
    }


    // ==========================================================
    // C. BLOQUEIO E VALIDAÇÃO DO ENVIO com preventDefault()
    // ==========================================================
    form.addEventListener('submit', function(event) {
        
        // 1. BLOQUEIA O ENVIO PADRÃO DO NAVEGADOR
        event.preventDefault(); 

        // 2. Verifica a validade nativa (campos 'required' vazios, email inválido, etc.)
        const nativamenteValido = form.checkValidity();

        // 3. Verifica a validade personalizada do profissional
        const profissionalValido = window.validarSelecao(inputProfissional);

        // 4. SE A VALIDAÇÃO FALHAR (nativa OU personalizada):
        if (!nativamenteValido || !profissionalValido) {
            
            // Força o navegador a mostrar a mensagem de erro no primeiro campo inválido
            form.reportValidity(); 
            
            // O formulário para aqui, sem enviar.
            return; 
        }

        // 5. SE TUDO ESTIVER VÁLIDO:
        console.log("Validação OK. Formulário será enviado.");
        // Envia o formulário programaticamente
        this.submit(); 
    });
});

// bloqueio de campo de resposta

// A função que você já está chamando no onchange, melhorada:
function validarSelecao(input) {
    const valor = input.value;
    const datalist = document.getElementById(input.getAttribute('list'));
    const options = datalist.querySelectorAll('option');
    const erroElement = document.getElementById('erroProfissional');
    let valorValido = false;

    // Verifica se o valor digitado corresponde a alguma opção na datalist
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === valor) {
            valorValido = true;
            break;
        }
    }

    if (valorValido) {
        erroElement.style.display = 'none';
        input.setCustomValidity(''); // Limpa qualquer erro de validação do HTML5
    } else {
        erroElement.style.display = 'block';
        // Define uma mensagem de erro personalizada no HTML5, impedindo o envio
        input.setCustomValidity('Profissional inválido. Selecione um da lista.');
    }
}


// Script para bloquear o envio do formulário se houver erros de validação
document.getElementById('formAgendamento').addEventListener('submit', function(event) {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const profissional = document.getElementById('profissional');

    // Executa a validação personalizada do Profissional
    validarSelecao(profissional);

    // Validação de campos vazios e email (@):
    // Se o HTML5 detectar um erro (devido ao 'required' ou 'type="email"'), 
    // a propriedade 'checkValidity()' será false.

    if (!nome.checkValidity()) {
        // O campo nome está vazio
        // A validação do HTML5 já irá mostrar a mensagem padrão.
        // Se quiser uma mensagem personalizada, use 'nome.setCustomValidity("...")'
    }

    if (!email.checkValidity()) {
        // O campo email está vazio OU não tem o formato de email
        document.getElementById('emailError').textContent = 'Por favor, insira um email válido (com @).';
        event.preventDefault(); // Bloqueia o envio
        
    } else {
         document.getElementById('emailError').textContent = ''; // Limpa a mensagem se estiver ok
    }

    if (!profissional.checkValidity()) {
        // O campo profissional está vazio OU o setCustomValidity no validarSelecao() foi chamado
        event.preventDefault(); // Bloqueia o envio
    }
    
    // Se algum campo inválido for encontrado, o event.preventDefault() precisa ser chamado.
    // As validações nativas do HTML5 farão o resto (mostrar a mensagem de balão e focar no campo),
    // a menos que você as bloqueie com o preventDefault() e use apenas o JS.
    
    // A melhor prática é deixar as validações do HTML5 agirem e complementar com JS
    // para mensagens específicas (como o erro de Profissional fora da lista).
    
    // Se o checkValidity() de qualquer campo for falso, o navegador já bloqueará
    // a submissão, a menos que você tenha chamado event.preventDefault() no topo.
});

// A função que você já está chamando no onchange, melhorada:
function validarSelecao(input) {
    const valor = input.value;
    const datalist = document.getElementById(input.getAttribute('list'));
    const options = datalist.querySelectorAll('option');
    const erroElement = document.getElementById('erroProfissional');
    let valorValido = false;

    // Verifica se o valor digitado corresponde a alguma opção na datalist
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === valor) {
            valorValido = true;
            break;
        }
    }

    if (valorValido) {
        erroElement.style.display = 'none';
        input.setCustomValidity(''); // Limpa qualquer erro de validação do HTML5
    } else {
        erroElement.style.display = 'block';
        // Define uma mensagem de erro personalizada no HTML5, impedindo o envio
        input.setCustomValidity('Profissional inválido. Selecione um da lista.');
    }
}


























function validarSelecao(input) {
    const valor = input.value;
    const datalist = document.getElementById(input.getAttribute('list'));
    const options = datalist.querySelectorAll('option');
    const erroElement = document.getElementById('erroremail');
    let valorValido = false;

    // Verifica se o valor digitado corresponde a alguma opção na datalist
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === valor) {
            valorValido = true;
            break;
        }
    }

    if (valorValido) {
        erroElement.style.display = 'none';
        input.setCustomValidity(''); // Limpa qualquer erro de validação do HTML5
    } else {
        erroElement.style.display = 'block';
        // Define uma mensagem de erro personalizada no HTML5, impedindo o envio
        input.setCustomValidity('Profissional inválido. Selecione um da lista.');
    }
}


// Script para bloquear o envio do formulário se houver erros de validação
document.getElementById('formAgendamento').addEventListener('submit', function(event) {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const profissional = document.getElementById('profissional');

    // Executa a validação personalizada do Profissional
    validarSelecao(profissional);

    // Validação de campos vazios e email (@):
    // Se o HTML5 detectar um erro (devido ao 'required' ou 'type="email"'), 
    // a propriedade 'checkValidity()' será false.

    if (!nome.checkValidity()) {
        // O campo nome está vazio
        // A validação do HTML5 já irá mostrar a mensagem padrão.
        // Se quiser uma mensagem personalizada, use 'nome.setCustomValidity("...")'
    }

    if (!email.checkValidity()) {
        // O campo email está vazio OU não tem o formato de email
        document.getElementById('emailError').textContent = 'Por favor, insira um email válido (com @).';
        event.preventDefault(); // Bloqueia o envio
        
    } else {
         document.getElementById('emailError').textContent = ''; // Limpa a mensagem se estiver ok
    }

    if (!profissional.checkValidity()) {
        // O campo profissional está vazio OU o setCustomValidity no validarSelecao() foi chamado
        event.preventDefault(); // Bloqueia o envio
    }
    
    // Se algum campo inválido for encontrado, o event.preventDefault() precisa ser chamado.
    // As validações nativas do HTML5 farão o resto (mostrar a mensagem de balão e focar no campo),
    // a menos que você as bloqueie com o preventDefault() e use apenas o JS.
    
    // A melhor prática é deixar as validações do HTML5 agirem e complementar com JS
    // para mensagens específicas (como o erro de Profissional fora da lista).
    
    // Se o checkValidity() de qualquer campo for falso, o navegador já bloqueará
    // a submissão, a menos que você tenha chamado event.preventDefault() no topo.
});












































// A função que valida se o profissional selecionado está na lista (sua função original)
function validarSelecao(input) {
    const valor = input.value;
    const datalist = document.getElementById(input.getAttribute('list'));
    const options = datalist.querySelectorAll('option');
    
    // CORREÇÃO: Usamos o ID 'erroProfissional' do seu HTML
    const erroElement = document.getElementById('erroProfissional'); 
    
    let valorValido = false;

    // Verifica se o valor digitado corresponde a alguma opção na datalist
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === valor) {
            valorValido = true;
            break;
        }
    }

    if (valorValido) {
        erroElement.style.display = 'none';
        input.setCustomValidity(''); // Limpa qualquer erro de validação do HTML5
    } else {
        // CORREÇÃO: Exibe a mensagem de erro do Profissional
        erroElement.style.display = 'block';
        
        // Define uma mensagem de erro personalizada, impedindo o envio via HTML5
        input.setCustomValidity('Profissional inválido. Selecione um da lista.');
    }
}


// Script para bloquear o envio do formulário se houver erros de validação
document.getElementById('formAgendamento').addEventListener('submit', function(event) {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const profissional = document.getElementById('profissional');

    // Flag para saber se devemos bloquear o envio
    let deveBloquear = false;

    // =================================================================
    // 1. VALIDAÇÃO DO EMAIL (SEM @)
    // =================================================================
    // O 'checkValidity()' do HTML5 verifica: 
    // - Se está vazio (por causa do 'required')
    // - Se não tem o formato de email (por causa do 'type="email"', verifica o '@')
    if (!email.checkValidity()) {
        
        // Atribui sua mensagem de erro personalizada
        document.getElementById('emailError').textContent = 'Por favor, insira um email válido (com @).';
        
        // Marca o flag para bloquear o envio
        deveBloquear = true;
    } else {
        // Limpa a mensagem se estiver tudo OK
        document.getElementById('emailError').textContent = ''; 
    }
    
    // =================================================================
    // 2. VALIDAÇÃO DO PROFISSIONAL (Se está na lista)
    // =================================================================
    validarSelecao(profissional);

    // O 'checkValidity()' aqui vai ser falso se o campo estiver vazio (required) 
    // OU se a função validarSelecao() chamou 'setCustomValidity()'.
    if (!profissional.checkValidity()) {
        deveBloquear = true;
    }
    
    // =================================================================
    // 3. VALIDAÇÃO DO NOME (Apenas se está vazio)
    // =================================================================
    // Se o nome estiver vazio, o 'checkValidity()' do nome será falso, 
    // e o navegador já irá focar no campo e mostrar o balão de erro padrão.
    if (!nome.checkValidity()) {
        deveBloquear = true;
    }

    // =================================================================
    // 4. BLOQUEIO FINAL
    // =================================================================
    if (deveBloquear) {
        event.preventDefault(); // BLOQUEIA o envio do formulário!
        
        // Para uma melhor UX, se houver um erro, foca no primeiro campo com erro.
        if (!nome.checkValidity()) { nome.focus(); }
        else if (!email.checkValidity()) { email.focus(); }
        else if (!profissional.checkValidity()) { profissional.focus(); }
    }
    
});

