import { useState } from "react";
import "./App.css";

const JOGADORES = {
  neymar: {
    nome: "Neymar Jr.",
    posicao: "Atacante",
    nascimento: "05/02/1992",
    time: "Santos FC",
    altura: "1,75 m",
    numero: 10,
    foto: "https://upload.wikimedia.org/wikipedia/commons/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg?utm_source=pt.wikiquote.org&utm_campaign=index&utm_content=original",
  },
  "vinicius junior": {
    nome: "Vinícius Júnior",
    posicao: "Ponta-esquerda",
    nascimento: "12/07/2000",
    time: "Real Madrid",
    altura: "1,76 m",
    numero: 7,
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLoYZ2bonMVEjbRT6JpFuMQ_iJj2DqMCjIfIfp6AupPA&s=10",
  },
  rodrygo: {
    nome: "Rodrygo Goes",
    posicao: "Ponta-direita",
    nascimento: "09/01/2001",
    time: "Real Madrid",
    altura: "1,74 m",
    numero: 11,
    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Rodrygo_2023_%28cropped%29.jpg/250px-Rodrygo_2023_%28cropped%29.jpg",
  },
};

function App() {
  const [busca, setBusca] = useState("");
  const [jogador, setJogador] = useState(null);
  const [erro, setErro] = useState(null);

  function buscar() {
    const termo = busca.trim().toLowerCase();
    if (!termo) return;

    const encontrado = JOGADORES[termo];

    if (encontrado) {
      setJogador(encontrado);
      setErro(null);
    } else {
      setJogador(null);
      setErro(`Jogador "${busca}" não encontrado. Tente: Neymar, Vinicius Junior ou Rodrygo.`);
    }
  }

  function handleSugestao(nome) {
    setBusca(nome);
    setJogador(JOGADORES[nome.toLowerCase()]);
    setErro(null);
  }

  return (
    <div className="page">
      <header className="header">
        <img
          height = "400px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Brazilian_Football_Confederation_logo.svg/1920px-Brazilian_Football_Confederation_logo.svg.png"
          alt="Logo da CBF"
          className="logo"
        />
        <div>
          <h1>Seleção Brasileira</h1>
          <p className="subtitle">Pesquise por um jogador</p>
        </div>
      </header>

      <main className="content">
        <div className="busca-area">
          <input
            type="text"
            placeholder="Digite: Neymar, Vinicius Junior ou Rodrygo"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscar()}
          />
          <button onClick={buscar}>Buscar</button>
        </div>

        <div className="sugestoes">
          <span>Sugestões:</span>
          <button className="chip" onClick={() => handleSugestao("Neymar")}>Neymar</button>
          <button className="chip" onClick={() => handleSugestao("Vinicius Junior")}>Vinícius Júnior</button>
          <button className="chip" onClick={() => handleSugestao("Rodrygo")}>Rodrygo</button>
        </div>

        {erro && <p className="status erro">{erro}</p>}

        {jogador && (
          <div className="card">
            <img src={jogador.foto} alt={jogador.nome} className="foto" height= "400px"/>
            <h2>{jogador.nome}</h2>
            <p><span className="label">Posição:</span> {jogador.posicao}</p>
            <p><span className="label">Nascimento:</span> {jogador.nascimento}</p>
            <p><span className="label">Time atual:</span> {jogador.time}</p>
            <p><span className="label">Altura:</span> {jogador.altura}</p>
            <p><span className="label">Número:</span> {jogador.numero}</p>
          </div>
        )}
      </main>

      <footer className="footer">
        Css feito pelo Claude pq nós não fecha com quem faz css, tmj 
      </footer>
    </div>
  );
}

export default App;