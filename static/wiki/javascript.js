/// WIKI IMAGEM///

img_logo_wiki.addEventListener('mouseenter', () => {
    const img_logo_wiki = document.getElementById('img_logo_wiki');
    img_logo_wiki.src = "../static/wiki/imagens/header/wiki_hover.png";
    img_logo_wiki.style.width = '3.5em'
}
);

img_logo_wiki.addEventListener('mouseleave', () => {
    const img_logo_wiki = document.getElementById('img_logo_wiki');
    img_logo_wiki.src = "../static/wiki/imagens/header/wiki.png";
    img_logo_wiki.style.width = '3.5em'
}
);

document.addEventListener('DOMContentLoaded', ajustarComBaseNaLargura);

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(ajustarComBaseNaLargura, 200);
});

function ajustarComBaseNaLargura() {
  const larguraDaTela = window.innerWidth;

  if (larguraDaTela < 725) {
    const nav_tela_p = document.querySelector('#nav_tela_p')
    nav_tela_p.classList.add('mostrar')

    const nav_normal = document.querySelector('#nav_normal')
    nav_normal.classList.add('esconder')

    const wiki = document.querySelector('#wiki')
    wiki.style.width = 'max-content'
  }
  else {
    nav_tela_p.classList.remove('mostrar')
    nav_normal.classList.remove('esconder')
    wiki.style.width = '228px'
  }

  if (tela_blur) {
    const texto_h1_p = document.querySelector('#texto_h1_p.indice')
    if (larguraDaTela <= 700) {
      topOriginal = getComputedStyle(texto_h1_p).top
      texto_h1_p.style.top = ''
      texto_h1_p.classList.add('tela_pequena')
    } else {
      texto_h1_p.classList.remove('tela_pequena')
      texto_h1_p.style.top = `${topOriginal}`
    }
  }
}

const carlos = document.querySelector('#carlos')

carlos.addEventListener('click', () =>{
  window.alert('SE CLICOU O CARLOS VAI COMER O CU DE CURISOSO EM KKKKKKKKK')
})