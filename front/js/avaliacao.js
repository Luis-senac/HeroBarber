const stars = document.querySelectorAll('#rating span');
let currentRating = 0;
const comentario = document.getElementById('comentario');
const mensagem = document.getElementById('mensagem');
let mensagemTimeout = null;

let palavrasOfensivas = [
  'filha da puta','pau no cu','vai tomar no cu','puta','vagabunda','lixo',
  'desgraça','nigga','niga','nigger','motherfucker','fuck you','bitch','whore','slut','trash','scum'
];

['desgrama','porra','gay','inferno','cu','bostinha','macaco','penis','cagado','aloprado','abusado',
 'retardo','energumeno','babaca','bicha','piranha','corno','otario','racista','nazista','fascista',
 'viado','prostituta','vagabunda','escroto','lixo','traveco','merda']
.forEach(adicionarXingamento);

function adicionarXingamento(palavra){
  palavrasOfensivas.push(palavra.toLowerCase());
}

function normalizeText(str){
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function textoContemOfensa(text){
  const norm = normalizeText(text);
  return palavrasOfensivas.some(p => norm.includes(normalizeText(p)));
}

function mostraMensagem(text, color='gold'){
  if(mensagemTimeout) clearTimeout(mensagemTimeout);
  mensagem.textContent = text;
  mensagem.style.color = color;
  mensagem.classList.add('show');

  mensagemTimeout = setTimeout(() => {
    mensagem.classList.remove('show');
    mensagemTimeout = null;
  }, 4000);
}

function highlightStars(count){
  stars.forEach((star, i) => star.classList.toggle('active', i < count));
}

function updateAria(){
  stars.forEach((s, i) => s.setAttribute('aria-checked', i < currentRating ? 'true' : 'false'));
}

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => highlightStars(index + 1));
  star.addEventListener('mouseout', () => highlightStars(currentRating));
  star.addEventListener('click', () => {
    currentRating = index + 1;
    highlightStars(currentRating);
    updateAria();
  });
});

comentario.addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    e.preventDefault();
    enviarAvaliacao();
  }
});

function enviarAvaliacao(){
  const texto = comentario.value.trim();

  if(texto && textoContemOfensa(texto)){
    mostraMensagem('Repense sua mensagem — xingamentos não são permitidos.', 'red');
    return;
  }

  if(currentRating === 0 && texto === ''){
    mostraMensagem('Por favor, selecione uma avaliação ou escreva algo.', 'red');
    return;
  }

  if(currentRating === 0 && texto !== ''){
    mostraMensagem('Ok, analisaremos seu feedback e melhoraremos.', '#d00000');
    comentario.value = '';
    return;
  }

  if(currentRating <= 2 && currentRating > 0){
    mostraMensagem('Obrigado pelo feedback, vamos analisar seu comentário.', 'orange');
  } else {
    mostraMensagem(`Obrigado! Sua avaliação de ${currentRating} estrela(s) foi enviada.`, 'gold');
  }

  comentario.value = '';
  currentRating = 0;
  highlightStars(0);
  updateAria();
}
