    window.onload = function () {
      iniciar() //inicializa as variaveis
      setInterval(principal, 1000 / 60) //roda o codigo a '60 fps'
    }

    function iniciar() {

      folhaDesenho = document.getElementById('draw')
      areaDesenho = folhaDesenho.getContext('2d')
      larguraCampo = 600
      alturaCampo = 500
      espessuraRede = espessuraRaquete = 5
      alturaRaquete = 100
      diametroBola = 10
      efeitoRaquete = 0.3
      velocidadeJogador2 = 5
      posicaoBolaX = posicaoBolaY = 10
      velocidadeBolaX = velocidadeBolaY = 2
      posicaoJogador1 = posicaoJogador2 = 40
      pontuacaoJogador1 = pontuacaoJogador2 = 0
      folhaDesenho.addEventListener('mousemove', function (e) {
        posicaoJogador1 = e.clientY - alturaRaquete / 2
      })
    }

    function desenhar() {
      areaDesenho.fillStyle = '#286047'
      areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo)
      areaDesenho.fillStyle = '#ffffff'
      areaDesenho.fillRect(larguraCampo / 2 - espessuraRede / 2, 0, espessuraRede, alturaCampo)


      //Desenha bola
      areaDesenho.fillRect(posicaoBolaX - diametroBola / 2, posicaoBolaY - diametroBola / 2, diametroBola, diametroBola)
      //Desenha as Raquetes
      areaDesenho.fillRect(1.5, posicaoJogador1, espessuraRaquete, alturaRaquete)
      areaDesenho.fillRect(larguraCampo - espessuraRaquete - 1.5, posicaoJogador2, espessuraRaquete, alturaRaquete)

      areaDesenho.fillStyle = '#d0d0a9'
      areaDesenho.fillText("Jogador 1:" + pontuacaoJogador1 + " pontos", 100, 100)
      areaDesenho.fillText('Jogador 2: ' + pontuacaoJogador2 + ' pontos', larguraCampo - 200, 100)
    }

    function principal() {
      desenhar()
      calcular()
    }

    function calcular() {
      var contador = 0

      posicaoBolaX = posicaoBolaX + velocidadeBolaX
      posicaoBolaY = posicaoBolaY + velocidadeBolaY

      if (posicaoBolaY < 0 && velocidadeBolaY < 0) { //lateral superior
        velocidadeBolaY = -velocidadeBolaY
      }
      if (posicaoBolaY > alturaCampo && velocidadeBolaY > 0) { //lateral inferior
        velocidadeBolaY = -velocidadeBolaY
      }
      //verifica se jogador 2 fez ponto
      if (posicaoBolaX < 0) {
        if (posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete) {
          //rebater bola
          velocidadeBolaX = -velocidadeBolaX
          var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2)
          velocidadeBolaY = diferencaY * efeitoRaquete
        } else {
          //ponto jogador 2
          pontuacaoJogador2++
          //centralizar bola
          continuar()
        }
      }
      //verifica se jogador 1 fez ponto
      if (posicaoBolaX > larguraCampo) {
        if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete) {
          //rebater bola
          velocidadeBolaX = -velocidadeBolaX
          var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2)
          velocidadeBolaY = diferencaY * efeitoRaquete
        } else {
          //ponto jogador 1
          pontuacaoJogador1++
          //centralizar bola
          continuar()
        }
      }
      //atualiza  a posicao do jogador 2
      if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2
      } else {
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2
      }
    }

    function continuar() {
      posicaoBolaX = larguraCampo / 2
      posicaoBolaY = alturaCampo / 2
      velocidadeBolaX = -velocidadeBolaX
      velocidadeBolaY = 3
    }