export const TIPOS = {
  normal:   { nome: 'NORMAL',    cor: '#a8a878', forte: [], fraco: ['rock', 'steel'], imune: ['ghost'] },
  fire:     { nome: 'FOGO',      cor: '#f08030', forte: ['grass', 'ice', 'bug', 'steel'], fraco: ['fire', 'water', 'rock', 'dragon'], imune: [] },
  water:    { nome: 'ÁGUA',      cor: '#6890f0', forte: ['fire', 'ground', 'rock'], fraco: ['water', 'grass', 'dragon'], imune: [] },
  electric: { nome: 'ELÉTRICO',  cor: '#f8d030', forte: ['water', 'flying'], fraco: ['electric', 'grass', 'dragon'], imune: ['ground'] },
  grass:    { nome: 'PLANTA',    cor: '#78c850', forte: ['water', 'ground', 'rock'], fraco: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'], imune: [] },
  ice:      { nome: 'GELO',      cor: '#98d8d8', forte: ['grass', 'ground', 'flying', 'dragon'], fraco: ['fire', 'water', 'ice', 'steel'], imune: [] },
  fighting: { nome: 'LUTADOR',   cor: '#c03028', forte: ['normal', 'ice', 'rock', 'dark', 'steel'], fraco: ['poison', 'flying', 'psychic', 'bug', 'fairy'], imune: ['ghost'] },
  poison:   { nome: 'VENENOSO',    cor: '#a040a0', forte: ['grass', 'fairy'], fraco: ['poison', 'ground', 'rock', 'ghost'], imune: ['steel'] },
  ground:   { nome: 'TERRESTRE',     cor: '#e0c068', forte: ['fire', 'electric', 'poison', 'rock', 'steel'], fraco: ['grass', 'bug'], imune: ['flying'] },
  flying:   { nome: 'VOADOR',    cor: '#a890f0', forte: ['grass', 'fighting', 'bug'], fraco: ['electric', 'rock', 'steel'], imune: [] },
  psychic:  { nome: 'PSÍQUICO',  cor: '#f85888', forte: ['fighting', 'poison'], fraco: ['psychic', 'steel'], imune: ['dark'] },
  bug:      { nome: 'INSETO',    cor: '#a8b820', forte: ['grass', 'psychic', 'dark'], fraco: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'], imune: [] },
  rock:     { nome: 'PEDRA',     cor: '#b8a038', forte: ['fire', 'ice', 'flying', 'bug'], fraco: ['fighting', 'ground', 'steel'], imune: [] },
  ghost:    { nome: 'FANTASMA',  cor: '#705898', forte: ['psychic', 'ghost'], fraco: ['dark'], imune: ['normal'] },
  dragon:   { nome: 'DRAGÃO',    cor: '#7038f8', forte: ['dragon'], fraco: ['steel'], imune: ['fairy'] },
  dark:     { nome: 'SOMBRIO',   cor: '#705848', forte: ['psychic', 'ghost'], fraco: ['fighting', 'dark', 'fairy'], imune: [] },
  steel:    { nome: 'AÇO',       cor: '#b8b8d0', forte: ['ice', 'rock', 'fairy'], fraco: ['fire', 'water', 'electric', 'steel'], imune: [] },
  fairy:    { nome: 'FADA',      cor: '#ee99ac', forte: ['fighting', 'dragon', 'dark'], fraco: ['fire', 'poison', 'steel'], imune: [] },
};

export const LISTA_TIPOS = Object.keys(TIPOS);

export function multiplicador(atacante, defensores) {
  const a = TIPOS[atacante];
  return defensores.reduce((total, d) => {
    if (a.imune.includes(d)) return total * 0;
    if (a.forte.includes(d)) return total * 2;
    if (a.fraco.includes(d)) return total * 0.5;
    return total;
  }, 1);
}

export function corTexto(hex) {
  const n = parseInt(hex.slice(1), 16);
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum > 150 ? '#0f2a6b' : '#ffffff';
}

export function formatarMult(m) {
  if (m === 0) return 'x0';
  if (m === 0.25) return 'x1/4';
  if (m === 0.5) return 'x1/2';
  return `x${m}`;
}