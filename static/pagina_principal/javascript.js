document.addEventListener('DOMContentLoaded', carregarDados);

async function carregarDados() {
  try {
    const response = await fetch('../static/pagina_principal/dados.json');
    const dados = await response.json();

    inserirDados(dados);
    precarregarImagem(dados.mundo_imagens);
  } catch (error) {
    console.error("Erro ao carregar ou processar o JSON:", error);
  }
}

function precarregarImagem(url) {
  url.forEach(caminho => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `../static/pagina_principal/imagens/body/Mundo/${caminho.caminho}`;
    document.head.appendChild(link);
  })
}

function inserirDados(dados) {

  const mundo_imagens = dados.mundo_imagens;
  const indice_individual = dados.indices;
  const nusariya_individual = dados.nusariyas;

  /// WIKI IMAGEM///

  img_logo_wiki.addEventListener('mouseenter', () => {
      const img_logo_wiki = document.getElementById('img_logo_wiki');
      img_logo_wiki.src = "../static/pagina_principal/imagens/header/wiki_hover.png";
      img_logo_wiki.style.width = '3.5em'
  }
  );

  img_logo_wiki.addEventListener('mouseleave', () => {
      const img_logo_wiki = document.getElementById('img_logo_wiki');
      img_logo_wiki.src = "../static/pagina_principal/imagens/header/wiki.png";
      img_logo_wiki.style.width = '3.5em'
  }
  );

  /// mundo ///

  const imagem_mundo = document.querySelector('#imagens_mundo')
  const titulo_imagem = document.querySelector('#imagem_mundo_h1')

  const seguir = document.querySelector('#seguir')
  let index_imagens = 0

  seguir.addEventListener('click', () => {
  if (index_imagens >= (mundo_imagens.length - 1)) {
    index_imagens = mundo_imagens.length - 1
    imagem_mundo.style.backgroundImage = `url(../static/pagina_principal/imagens/body/Mundo/${mundo_imagens[index_imagens].caminho})`;
    titulo_imagem.innerHTML = `${mundo_imagens[index_imagens].titulo}`
  } else {
    index_imagens++;
    imagem_mundo.style.backgroundImage = `url(../static/pagina_principal/imagens/body/Mundo/${mundo_imagens[index_imagens].caminho})`;
    titulo_imagem.innerHTML = `${mundo_imagens[index_imagens].titulo}`
  }
  })

  const voltar = document.querySelector('#voltar')

  voltar.addEventListener('click', () => {
    if (index_imagens <= 0) {
      index_imagens = 0
      imagem_mundo.style.backgroundImage = `url(../static/pagina_principal/imagens/body/Mundo/${mundo_imagens[index_imagens].caminho})`;
      titulo_imagem.innerHTML = `${mundo_imagens[index_imagens].titulo}`
    } else {
      index_imagens--;
      imagem_mundo.style.backgroundImage = `url(../static/pagina_principal/imagens/body/Mundo/${mundo_imagens[index_imagens].caminho})`;
      titulo_imagem.innerHTML = `${mundo_imagens[index_imagens].titulo}`
  }
  })

  /// icone campanhas / indice ///

  const icones_campanha = document.querySelectorAll('.icone_campanha');
  const imagens_hover = [
    'Mahabharata_hover.png',
    'Refregas_hover.png',
    'Volupia_hover.png',
    'Invasao_hover.png',
    'Reuno_hover.png'
  ]

  icones_campanha.forEach((icone, index) => {
    const imagem_original = icone.style.backgroundImage;
    const imagem_hover = `url(../static/pagina_principal/imagens/body/indice/${imagens_hover[index]})`

    icone.addEventListener('mouseenter', () => {
      icone.style.backgroundImage = imagem_hover
    })

    icone.addEventListener('mouseleave', () => {
      icone.style.backgroundImage = imagem_original
    })

    icone.addEventListener('click', () => {
      criarMosaico()
      imagem_mosaico.classList.add('indice')
      texto_h1_p.classList.add('indice')

      const stylesByIndex = [
          { tTexto: '7%'},
          { tTexto: '14%'},
          { tTexto: '10%'},
          { tTexto: '7%'},
          { tTexto: '20%'}
      ];

      if (indice_individual && index >= 0 && index < indice_individual.length) {
        const currentItem = indice_individual[index];
        const currentStyles = stylesByIndex[index];

        imagem_mosaico.style.backgroundImage = `url(../static/pagina_principal/imagens/body/indice/${currentItem.imagem})`;
        t_conte_tela.innerHTML = `${currentItem.titulo}`;
        p_conte_tela.innerHTML = `${currentItem.paragrafo}`;

        texto_h1_p.style.top = `${currentStyles.tTexto}`
      }

      const larguraDaTela = window.innerWidth
      if (larguraDaTela <= 700) {
        topOriginal = getComputedStyle(texto_h1_p).top
        texto_h1_p.style.top = ''
        texto_h1_p.classList.add('tela_pequena')
      } else {
        texto_h1_p.classList.remove('tela_pequena')
        texto_h1_p.style.top = `${topOriginal}`
      }
    })
  })

  /// COROAS E ESTANDARTES clicavel ///

  const icones = document.querySelectorAll('.icone_mais');

  icones.forEach((icone,index) => {
    icone.addEventListener('mouseenter', () => {
      icone.style.backgroundImage = "url(../static/pagina_principal/imagens/body/reinos/chevron_hover.png)";
    });

    icone.addEventListener('mouseleave', () => {
      icone.style.backgroundImage = "url(../static/pagina_principal/imagens/body/reinos/chevron.png)";
    });

    icone.addEventListener('click', () => {
      let lista_reinos = document.querySelectorAll('.lista_reinos')
      lista_reinos[index].classList.toggle('mostrar');
    });
  });

  /// Nusariyas ///

  const nusariyas = document.querySelectorAll('.fotos')

  nusariyas.forEach((nusariya, index) => {
    nusariya.style.backgroundImage = `url(../static/pagina_principal/imagens/body/nusariyas/${nusariya_individual[index].imagem})`
    nusariya.addEventListener('mouseenter', () => {
      nusariya.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.45)), url(../static/pagina_principal/imagens/body/nusariyas/${nusariya_individual[index].imagem})`
    })

    nusariya.addEventListener('mouseleave', () => {
      nusariya.style.backgroundImage = `url(../static/pagina_principal/imagens/body/nusariyas/${nusariya_individual[index].imagem})`
    })

    nusariya.addEventListener('click', () => {
      criarMosaico()
      imagem_mosaico.classList.add('nusariya')
      texto_h1_p.classList.add('nusariya')

      if (nusariya_individual && index >= 0 && index < nusariya_individual.length) {
        imagem_mosaico.style.backgroundImage = `url(../static/pagina_principal/imagens/body/nusariyas/${nusariya_individual[index].imagem_int})`;
        t_conte_tela.innerHTML = `${nusariya_individual[index].nome}`;
        p_conte_tela.innerHTML = `${nusariya_individual[index].descricao}`
        conteudo_mosaico.classList.add('nusariya')
        const info = document.createElement('p');
        info.id = 'info'
        conteudo_mosaico.appendChild(info)
        info.innerHTML = `${nusariya_individual[index].informacao}`;
        texto_h1_p.style.top = `${currentStyles.tTexto}`
      }
    })
  })
}

/// Funções ///
function criarMosaico() {
  const tela_blur = document.createElement('div')
  tela_blur.id = 'tela_blur'
  document.body.appendChild(tela_blur)
  setTimeout(() => {
    tela_blur.classList.add('visivel');
  })

  const mosaico = document.createElement('div')
  mosaico.id = 'mosaico'
  tela_blur.appendChild(mosaico)

  const conteudo_mosaico = document.createElement('div')
  conteudo_mosaico.id = 'conteudo_mosaico'
  mosaico.appendChild(conteudo_mosaico)
  
  const imagem_mosaico = document.createElement('div');
  imagem_mosaico.id = 'imagem_mosaico'
  conteudo_mosaico.appendChild(imagem_mosaico)

  const texto_h1_p = document.createElement('div');
  texto_h1_p.id = 'texto_h1_p'
  conteudo_mosaico.appendChild(texto_h1_p)

  const t_conte_tela = document.createElement('h1');
  t_conte_tela.id = 't_conte_tela'
  texto_h1_p.appendChild(t_conte_tela)

  const p_conte_tela = document.createElement('p');
  p_conte_tela.id = 'p_conte_tela'
  texto_h1_p.appendChild(p_conte_tela)

  const x = document.createElement('span');
  x.id = 'x'
  x.textContent = 'X'
  conteudo_mosaico.appendChild(x)

  x.addEventListener('click', () => {
    const tela_blur = document.querySelector('#tela_blur');
    tela_blur.classList.remove('visivel');
    setTimeout(() => {
      tela_blur.parentNode.removeChild(tela_blur);
    },400)
});
}

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