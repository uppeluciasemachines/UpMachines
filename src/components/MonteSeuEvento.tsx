/* ================================================================================
   COMPONENTE: MonteSeuEvento
   ================================================================================
   Área interativa principal onde o cliente monta seu evento:
   1. Escolhe um ou mais itens (Máquinas e/ou Totem)
   2. Se escolher máquina, escolhe os brindes (brindes ou bolinhas)
   3. Se escolher apenas totem, vai direto para o orçamento
   4. Envia o pedido via WhatsApp
   
   INSTRUÇÕES PARA ADICIONAR PRODUTOS:
   1. Importe suas imagens: import minhaMaquina from "@/assets/maquina1.jpg";
   2. Adicione no array correspondente (maquinas ou brindes)
   
   INSTRUÇÕES PARA ALTERAR O NÚMERO DO WHATSAPP:
   1. Procure a variável NUMERO_WHATSAPP abaixo
   2. Substitua pelo seu número no formato: 5511999999999
   ================================================================================ */

import { useState } from "react";
import { Eye, Check, MessageCircle, ArrowRight, ArrowLeft } from "lucide-react";
import GruaTvBox from "@/assets/grua tv box.jpg";
import GruaLedCompt from "@/assets/GRUA COMPACTA LED.jpg";
import GruaLed from "@/assets/grua led.jpg";
import Totem from "@/assets/Totem de carregamento.jpg";
import Peluciascomum from "@/assets/pelucias_comuns.png";
import Peluciaspersonagens from "@/assets/personagens_cinema_pelucia.png";
import PeluciasHerois from "@/assets/herois_pelucia.png";
import Bolas from "@/assets/bolas-transparentes.webp";

// ===== NÚMERO DO WHATSAPP =====
// Altere para o número da empresa (com código do país e DDD, sem espaços ou traços)
const NUMERO_WHATSAPP = "+5586994083920";

// ===== DADOS DAS MÁQUINAS =====
// Adicione suas máquinas aqui. Cada máquina precisa de: id, nome, imagem, descricao, categoria
const maquinas = [
  {
    id: 1,
    nome: "Máquina Tv Box",
    // Substitua pela sua imagem: import minhaImagem from "@/assets/maquina.jpg"
    imagem: GruaTvBox,
    descricao: "Maquina grande, com uma tela personalizavel.",
    categoria: "maquina",
  },
  {
    id: 2,
    nome: "Máquina Compacta Led",
    imagem: GruaLedCompt,
    descricao: "Maquina compacta com painel de led personalizavel.",
    categoria: "maquina",
  },
  {
    id: 3,
    nome: "Máquina Led",
    imagem: GruaLed,
    descricao: "Maquina toda envolvida por leds.",
    categoria: "maquina",
  },
  {
    id: 4,
    nome: "Totem de Carregamento",
    imagem: Totem,
    descricao: "Totem de carregamento de aparelhos celulares.",
    categoria: "totem",
  },
];

// ===== DADOS DOS BRINDES =====
// Adicione seus brindes aqui
const brindes = [
  {
    id: 1,
    nome: "Pelúcias Nacionais",
    imagem: Peluciaspersonagens,
    descricao: "Modelos variados de pelúcias nacionais",
  },
  {
    id: 2,
    nome: "Pelúcias Premium",
    imagem: Peluciascomum,
    descricao: "Modelos variados de pelúcias Premium",
  },
  {
    id: 3,
    nome: "Pelúcias Personalizadas",
    imagem: PeluciasHerois,
    descricao: "Escolha as Pelúcias do seu jeito",
  },
  {
    id: 4,
    nome: "Bolinhas Transparentes",
    imagem: Bolas,
    descricao: "Cápsulas de prêmios personalizáveis",
  },
];

// Tipo para a máquina selecionada
interface Maquina {
  id: number;
  nome: string;
  imagem: string;
  descricao: string;
  categoria: string;
}

// Tipo para o brinde selecionado
interface Brinde {
  id: number;
  nome: string;
  imagem: string;
  descricao: string;
}

const MonteSeuEvento = () => {
  // ===== ESTADOS DO COMPONENTE =====
  const [passoAtual, setPassoAtual] = useState(1); // Controla qual passo está ativo (1: máquinas, 2: brindes, 3: orçamento)
  const [maquinasSelecionadas, setMaquinasSelecionadas] = useState<Maquina[]>([]); // Array de máquinas selecionadas
  const [brindesSelecionados, setBrindesSelecionados] = useState<Brinde[]>([]);
  const [maquinaEspiando, setMaquinaEspiando] = useState<Maquina | null>(null); // Para o Quick View

  // Funções auxiliares para verificar tipos de seleções
  const temMaquina = () => maquinasSelecionadas.some(m => m.categoria === "maquina");
  const temTotem = () => maquinasSelecionadas.some(m => m.categoria === "totem");

  // ===== FUNÇÃO PARA ENVIAR PEDIDO VIA WHATSAPP =====
  const enviarParaWhatsApp = () => {
    if (maquinasSelecionadas.length === 0) return;

    // Monta a mensagem baseada nas seleções
    let mensagem = "Olá! Gostaria de solicitar um orçamento para:\n\n";
    
    // Adiciona máquinas selecionadas
    const maquinas = maquinasSelecionadas.filter(m => m.categoria === "maquina");
    if (maquinas.length > 0) {
      mensagem += "*Máquinas:*\n";
      maquinas.forEach(maquina => {
        mensagem += `• ${maquina.nome}\n`;
      });
      mensagem += "\n";
    }

    // Adiciona totem se houver
    const totems = maquinasSelecionadas.filter(m => m.categoria === "totem");
    if (totems.length > 0) {
      mensagem += "*Totens de Carregamento:*\n";
      totems.forEach(maquina => {
        mensagem += `• ${maquina.nome}\n`;
      });
      mensagem += "\n";
    }

    // Adiciona brindes se houver (só aparece se tem máquina)
    if (brindesSelecionados.length > 0 && temMaquina()) {
      mensagem += "*Brindes escolhidos:*\n";
      brindesSelecionados.forEach((brinde) => {
        mensagem += `• ${brinde.nome}\n`;
      });
    }
    
    // Codifica a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Abre o WhatsApp com a mensagem
    window.open(`https://wa.me/${NUMERO_WHATSAPP.replace(/\D/g, '')}?text=${mensagemCodificada}`, "_blank");
  };

  // ===== FUNÇÃO PARA TOGGLE DE SELEÇÃO DE MÁQUINA =====
  const toggleSelecaoMaquina = (maquina: Maquina) => {
    setMaquinasSelecionadas(prev => {
      const jaSelecionada = prev.some(m => m.id === maquina.id);
      const atualizado = jaSelecionada ? prev.filter(m => m.id !== maquina.id) : [...prev, maquina];
      if (atualizado.every((m) => m.categoria !== "maquina")) {
        setBrindesSelecionados([]);
      }
      return atualizado;
    });
  };

  // ===== FUNÇÃO PARA TOGGLE DE SELEÇÃO DE BRINDE =====
  const toggleSelecaoBrinde = (brinde: Brinde) => {
    setBrindesSelecionados((prev) => {
      const jaSelecionado = prev.some((b) => b.id === brinde.id);
      if (jaSelecionado) {
        return prev.filter((b) => b.id !== brinde.id);
      }
      return [...prev, brinde];
    });
  };

  // ===== FUNÇÃO PARA CONTINUAR =====
  const continuar = () => {
    if (maquinasSelecionadas.length === 0) return;

    // Se tem máquina (com ou sem totem), vai para escolha de brindes
    if (temMaquina()) {
      setPassoAtual(2);
    } 
    // Se tem apenas totem, vai direto para orçamento (passo 3)
    else if (temTotem() && !temMaquina()) {
      setPassoAtual(3);
    }

    // Rola para o topo da seção
    document.getElementById("monte-seu-evento")?.scrollIntoView({ behavior: "smooth" });
  };

  // ===== FUNÇÃO PARA AVANÇAR PARA ORÇAMENTO APÓS ESCOLHER BRINDES =====
  const avancarParaOrcamento = () => {
    if (brindesSelecionados.length > 0 || temTotem()) {
      setPassoAtual(3);
      document.getElementById("monte-seu-evento")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ===== FUNÇÃO PARA VOLTAR AO PASSO 1 =====
  const voltarPasso1 = () => {
    setPassoAtual(1);
    setBrindesSelecionados([]);
  };

  return (
    <section id="monte-seu-evento" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* ===== TÍTULO DA SEÇÃO ===== */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Monte seu <span className="text-primary">Evento</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha a máquina e os brindes perfeitos para sua festa!
          </p>
        </div>

        {/* ===== INDICADOR DE PASSOS ===== */}
        <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
          <div
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              passoAtual === 1
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground"
            }`}
          >
            <span className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              {maquinasSelecionadas.length > 0 ? <Check size={16} /> : "1"}
            </span>
            Escolha os Itens
          </div>
          {temMaquina() && (
            <>
              <ArrowRight className="text-muted-foreground" />
              <div
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  passoAtual === 2
                    ? "bg-primary text-primary-foreground"
                    : passoAtual > 2 && brindesSelecionados.length > 0
                    ? "bg-card text-muted-foreground"
                    : "bg-card text-muted-foreground"
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  {brindesSelecionados.length > 0 ? <Check size={16} /> : "2"}
                </span>
                Escolha os Brindes
              </div>
            </>
          )}
          {(passoAtual === 3 || (temTotem() && !temMaquina())) && (
            <>
              <ArrowRight className="text-muted-foreground" />
              <div className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-primary text-primary-foreground">
                <span className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  3
                </span>
                Enviar Orçamento
              </div>
            </>
          )}
        </div>

        {/* ===== PASSO 1: ESCOLHER MÁQUINAS/TOTEM ===== */}
        {passoAtual === 1 && (
          <div className="animate-fade-in">
            {/* Seção Máquinas */}
            <div id="maquinas" className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Máquinas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maquinas
                  .filter((m) => m.categoria === "maquina")
                  .map((maquina) => (
                    <CardMaquina
                      key={maquina.id}
                      maquina={maquina}
                      selecionada={maquinasSelecionadas.some(m => m.id === maquina.id)}
                      onEspiar={() => setMaquinaEspiando(maquina)}
                      onSelecionar={() => toggleSelecaoMaquina(maquina)}
                    />
                  ))}
              </div>
            </div>

            {/* Seção Totems */}
            <div id="totems">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Totens de Carregamento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maquinas
                  .filter((m) => m.categoria === "totem")
                  .map((maquina) => (
                    <CardMaquina
                      key={maquina.id}
                      maquina={maquina}
                      selecionada={maquinasSelecionadas.some(m => m.id === maquina.id)}
                      onEspiar={() => setMaquinaEspiando(maquina)}
                      onSelecionar={() => toggleSelecaoMaquina(maquina)}
                    />
                  ))}
              </div>
            </div>

            {/* Botão Continuar - aparece quando houver seleções */}
            {maquinasSelecionadas.length > 0 && (
              <div className="mt-12 text-center animate-slide-up">
                <div className="bg-card rounded-xl p-6 max-w-xl mx-auto">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {maquinasSelecionadas.length} {maquinasSelecionadas.length === 1 ? "item selecionado" : "itens selecionados"}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                    {maquinasSelecionadas.map((maquina, index) => (
                      <div key={maquina.id} className="bg-muted rounded-lg p-2 flex items-center gap-2">
                        <img
                          src={maquina.imagem}
                          alt={maquina.nome}
                          className="w-10 h-10 rounded object-contain"
                        />
                        <span className="font-medium text-foreground text-xs">
                          {maquina.nome}
                        </span>
                        {index < maquinasSelecionadas.length - 1 && (
                          <span className="text-primary font-bold mx-1">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={continuar}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                  >
                    Continuar
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== PASSO 2: ESCOLHER BRINDES ===== */}
        {passoAtual === 2 && temMaquina() && (
          <div className="animate-fade-in">
            {/* Botão Voltar */}
            <button
              onClick={voltarPasso1}
              className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
            >
              <ArrowLeft size={20} />
              Voltar para escolha de itens
            </button>

            {/* Máquinas selecionadas */}
            <div className="bg-card rounded-xl p-4 mb-8">
              <p className="text-sm text-muted-foreground mb-3">Itens selecionados:</p>
              <div className="flex flex-wrap gap-3">
                {maquinasSelecionadas.map((maquina) => (
                  <div key={maquina.id} className="flex items-center gap-2 bg-muted rounded-lg p-2">
                    <img
                      src={maquina.imagem}
                      alt={maquina.nome}
                      className="w-16 h-16 rounded-lg object-contain bg-background p-1"
                    />
                    <div>
                      <p className="font-bold text-foreground text-sm">{maquina.nome}</p>
                      <p className="text-xs text-muted-foreground capitalize">{maquina.categoria}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid de brindes */}
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Agora escolha os brindes da Máquina:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brindes.map((brinde) => (
                <div
                  key={brinde.id}
                  onClick={() => toggleSelecaoBrinde(brinde)}
                  className={`bg-card rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                    brindesSelecionados.some((b) => b.id === brinde.id)
                      ? "ring-4 ring-primary"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={brinde.imagem}
                      alt={brinde.nome}
                      className="w-full h-48 object-cover"
                    />
                    {brindesSelecionados.some((b) => b.id === brinde.id) && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
                        <Check size={20} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-foreground mb-1">{brinde.nome}</h4>
                    <p className="text-sm text-muted-foreground">{brinde.descricao}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão de continuar após escolher brindes */}
            {brindesSelecionados.length > 0 && (
              <div className="mt-12 text-center animate-slide-up">
                <button
                  onClick={avancarParaOrcamento}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  Continuar para Orçamento
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===== PASSO 3: ENVIAR ORÇAMENTO ===== */}
        {passoAtual === 3 && (
          <div className="animate-fade-in">
            {/* Botão Voltar */}
            {temMaquina() ? (
              <button
                onClick={() => setPassoAtual(2)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
              >
                <ArrowLeft size={20} />
                Voltar para escolha de brindes
              </button>
            ) : (
              <button
                onClick={voltarPasso1}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
              >
                <ArrowLeft size={20} />
                Voltar para escolha de itens
              </button>
            )}

            {/* Resumo do evento */}
            <div className="mt-12 text-center animate-slide-up">
              <div className="bg-card rounded-xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Seu evento está montado!
                </h3>
                
                {/* Itens selecionados */}
                <div className="mb-6 space-y-3">
                  {maquinasSelecionadas.filter(m => m.categoria === "maquina").length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 text-left">Máquinas:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {maquinasSelecionadas
                          .filter(m => m.categoria === "maquina")
                          .map((maquina) => (
                            <div key={maquina.id} className="bg-muted rounded-lg p-3 flex items-center gap-2">
                              <img
                                src={maquina.imagem}
                                alt={maquina.nome}
                                className="w-12 h-12 rounded object-contain"
                              />
                              <span className="font-medium text-foreground text-sm">
                                {maquina.nome}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {maquinasSelecionadas.filter(m => m.categoria === "totem").length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 text-left">Totens:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {maquinasSelecionadas
                          .filter(m => m.categoria === "totem")
                          .map((maquina) => (
                            <div key={maquina.id} className="bg-muted rounded-lg p-3 flex items-center gap-2">
                              <img
                                src={maquina.imagem}
                                alt={maquina.nome}
                                className="w-12 h-12 rounded object-contain"
                              />
                              <span className="font-medium text-foreground text-sm">
                                {maquina.nome}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {brindesSelecionados.length > 0 && temMaquina() && (
                    <>
                      <div className="flex items-center justify-center my-4">
                        <span className="text-primary font-bold text-xl">+</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2 text-left">Brindes:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {brindesSelecionados.map((brinde) => (
                            <div key={brinde.id} className="bg-muted rounded-lg p-3 flex items-center gap-2">
                              <img
                                src={brinde.imagem}
                                alt={brinde.nome}
                                className="w-12 h-12 rounded object-cover"
                              />
                              <span className="font-medium text-foreground text-sm">
                                {brinde.nome}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Botão de enviar para WhatsApp */}
                <button
                  onClick={enviarParaWhatsApp}
                  className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#22c55e] transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <MessageCircle size={24} />
                  Enviar Orçamento via WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== MODAL QUICK VIEW (ESPIAR) ===== */}
      {maquinaEspiando && (
        <div
          className="fixed inset-0 bg-secondary/80 flex items-center justify-center z-50 p-4"
          onClick={() => setMaquinaEspiando(null)}
        >
          <div
            className="bg-card rounded-2xl max-w-lg w-full overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={maquinaEspiando.imagem}
              alt={maquinaEspiando.nome}
              className="w-full aspect-[4/3] object-contain bg-muted p-4"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {maquinaEspiando.nome}
              </h3>
              <p className="text-muted-foreground mb-6">{maquinaEspiando.descricao}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setMaquinaEspiando(null)}
                  className="flex-1 border border-border text-foreground px-4 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    toggleSelecaoMaquina(maquinaEspiando);
                    setMaquinaEspiando(null);
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {maquinasSelecionadas.some(m => m.id === maquinaEspiando.id) ? "Desmarcar" : "Selecionar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* ================================================================================
   COMPONENTE: CardMaquina
   ================================================================================
   Card individual para cada máquina. Mostra imagem, nome e botões de ação.
   ================================================================================ */
interface CardMaquinaProps {
  maquina: Maquina;
  selecionada?: boolean;
  onEspiar: () => void;
  onSelecionar: () => void;
}

const CardMaquina = ({ maquina, selecionada = false, onEspiar, onSelecionar }: CardMaquinaProps) => {
  return (
    <div className={`bg-card rounded-xl overflow-hidden transition-all hover:-translate-y-1 group
        shadow-[0_-6px_12px_-6px_rgba(0,0,0,0.25)] hover:shadow-[0_-8px_20px_-8px_rgba(0,0,0,0.35)] ${
          selecionada ? "ring-4 ring-primary" : ""
        }`}>
      {/* Imagem */}
      <div className="relative overflow-hidden">
        <img
          src={maquina.imagem}
          alt={maquina.nome}
          className="w-full aspect-[4/3] object-contain bg-muted p-2 group-hover:scale-105 transition-transform duration-300"
        />
        {/* Botão Espiar (Quick View) */}
        <button
          onClick={onEspiar}
          className="absolute top-4 right-4 bg-card/90 text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
          aria-label="Espiar detalhes"
        >
          <Eye size={20} />
        </button>
        {/* Indicador de seleção */}
        {selecionada && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
            <Check size={20} />
          </div>
        )}
      </div>
      
      {/* Conteúdo */}
      <div className="p-4">
        <h4 className="font-bold text-foreground text-lg mb-3">{maquina.nome}</h4>
        <button
          onClick={onSelecionar}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            selecionada
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {selecionada ? "Desmarcar" : "Selecionar"}
        </button>
      </div>
    </div>
  );
};

export default MonteSeuEvento;
