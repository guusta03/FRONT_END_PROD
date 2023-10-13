'use client';

export default function Tutorial() {
  return (
    <main className='m-auto mt-5 w-[60%]'>
      <div className='w-45 m-auto'>
        <h3>Resumo</h3>
        <p>
          Esse software foi projetado para indivíduos estudantes de inglês,
          altamente recomendado para quem faz cursos, seja online ou presencial.
          <br></br>
          <br></br>
          Nosso software é uma ferramenta baseada em uma técnica de estudo com
          imersão no idioma. Se você tem o básico do idioma, nossa ferramenta,
          se usada da maneira correta, vai te ajudar a acelerar sua capacidade
          auditiva e vocabulário no idioma.
        </p>
      </div>
      <div className='w-45 m-auto mt-10 flex h-auto flex-col align-middle'>
        <h3>Escolhendo um vídeo</h3>
        <p>
          Na página inicial, há alguns exemplos de playlists do YouTube
          recomendadas por mim (desenvolvedor do site).
        </p>
        <br></br>
        <p>
          Você também pode escolher qualquer vídeo de sua preferência, tais como
          entrevistas, trailers de filmes e cortes de cenas de um seriado.
        </p>
        <br></br>
        <p>
          Só precisa verificar se há legendas ativadas em seu vídeo escolhido,
          após confirmar, copie o link e cole no input na página inicial. Clique
          no ícone da lupa.
        </p>
        {/* <div className='flex'>
          <NextImage
            src={HomePrint}
            className='h-36 rounded-md'
            alt='Uma imagem da página inicial do site'
            height={900}
            width={500}
          />
        </div> */}
      </div>
      <div className='w-45 m-auto mt-10 flex h-auto flex-col align-middle'>
        <h3>Dicas de estudo</h3>
        <p>
          Para ter um melhor aproveitamento, é preciso seguir algumas dicas:
        </p>
        <br></br>
        <ul>
          <li>
            Assista o vídeo algumas vezes sem olhar para o texto. Ouça
            atentamente os sons e tente identificar o que você consegue
            entender.
          </li>
          <br></br>
          <li>
            Assista o vídeo novamente enquanto lê o texto no idioma original.
            Neste ponto, você provavelmente já entendeu parte do significado.
          </li>
          <br></br>
          <li>
            Caso não saiba alguma palavra, consulte a tradução clicando nela
            para obter o significado completo. Ouça o áudio novamente.
          </li>
        </ul>
      </div>
      <div className='w-45 m-auto mt-10 flex h-auto flex-col pb-10 align-middle'>
        <h3>Considerações finais</h3>
        <p>
          Este software está em desenvolvimento, contendo apenas recursos
          básicos. Mas não se preocupe, é possível começar os treinos com os
          recursos disponíveis. Ao longo do tempo, o nosso sistema receberá
          atualizações extras envolvendo IA e funcionalidades para treino de
          outros tópicos (leitura, escrita e fala).
        </p>
      </div>
    </main>
  );
}
