/* ================================================================================
   COMPONENTE: MonteSeuEvento
   ================================================================================
   Área interativa principal onde o cliente monta seu evento em 2 passos:
   1. Escolhe a máquina (Grua ou Totem)
   2. Escolhe o recheio (Pelúcias ou Bolinhas)
   
   Ao finalizar, envia o pedido via WhatsApp.
   
   INSTRUÇÕES PARA ADICIONAR PRODUTOS:
   1. Importe suas imagens: import minhaMaquina from "@/assets/maquina1.jpg";
   2. Adicione no array correspondente (maquinas ou recheios)
   
   INSTRUÇÕES PARA ALTERAR O NÚMERO DO WHATSAPP:
   1. Procure a variável NUMERO_WHATSAPP abaixo
   2. Substitua pelo seu número no formato: 5511999999999
   ================================================================================ */

import { useState } from "react";
import { Eye, Check, MessageCircle, ArrowRight, ArrowLeft } from "lucide-react";
import GruaTvBox from "@/assets/grua tv box.jpg";
import GruaLedCompt from "@/assets/GRUA COMPACTA LED.jpg"
import GruaLed from "@/assets/grua led.jpg";
import Totem from "@/assets/Totem de carregamento.jpg";
import Peluciascomum from "@/assets/pelucias_comuns.png";
import Peluciaspersonagens from "@/assets/personagens_cinema_pelucia.png";
import PeluciasHerois from "@/assets/herois_pelucia.png";
import Bolas from "@/assets/bolas-transparentes.webp";

// ===== NÚMERO DO WHATSAPP =====
// Altere para o número da empresa (com código do país e DDD, sem espaços ou traços)
const NUMERO_WHATSAPP = "5511999999999";

// ===== DADOS DAS MÁQUINAS =====
// Adicione suas máquinas aqui. Cada máquina precisa de: id, nome, imagem, descricao, categoria
const maquinas = [
  {
    id: 1,
    nome: "Grua Tv Box",
    // Substitua pela sua imagem: import minhaImagem from "@/assets/maquina.jpg"
    imagem: GruaTvBox,
    descricao: "Descrição da máquina - características e diferenciais",
    categoria: "grua",
  },
  {
    id: 2,
    nome: "Grua Compacta Led",
    imagem: GruaLedCompt,
    descricao: "Descrição da máquina - características e diferenciais",
    categoria: "grua",
  },
  {
    id: 3,
    nome: "Grua Led",
    imagem: GruaLed,
    descricao: "Descrição da máquina - características e diferenciais",
    categoria: "grua",
  },
  {
    id: 4,
    nome: "Totem de Carregamento",
    imagem: Totem,
    descricao: "Descrição da máquina - características e diferenciais",
    categoria: "totem",
  },
];

// ===== DADOS DOS RECHEIOS =====
// Adicione seus recheios aqui
const recheios = [
  {
    id: 1,
    nome: "Pelúcias de Personagens",
    imagem: Peluciaspersonagens,
    descricao: "Personagens de cinema mais adoraveis!",
  },
  {
    id: 2,
    nome: "Pelúcias Normais",
    imagem: Peluciascomum,
    descricao: "Modelos variados de pelúcias fofinhas",
  },
  {
    id: 3,
    nome: "Pelúcias de super Herois",
    imagem: PeluciasHerois,
    descricao: "Os heróis mais amados em pelúcias",
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

// Tipo para o recheio selecionado
interface Recheio {
  id: number;
  nome: string;
  imagem: string;
  descricao: string;
}

const MonteSeuEvento = () => {
  // ===== ESTADOS DO COMPONENTE =====
  const [passoAtual, setPassoAtual] = useState(1); // Controla qual passo está ativo
  const [maquinaSelecionada, setMaquinaSelecionada] = useState<Maquina | null>(null);
  const [recheioSelecionado, setRecheioSelecionado] = useState<Recheio | null>(null);
  const [maquinaEspiando, setMaquinaEspiando] = useState<Maquina | null>(null); // Para o Quick View

  // ===== FUNÇÃO PARA ENVIAR PEDIDO VIA WHATSAPP =====
  const enviarParaWhatsApp = () => {
    if (!maquinaSelecionada || !recheioSelecionado) return;

    // Monta a mensagem que será enviada
    const mensagem = `Olá! Gostaria de alugar a máquina *${maquinaSelecionada.nome}* com recheio de *${recheioSelecionado.nome}*.`;
    
    // Codifica a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Abre o WhatsApp com a mensagem
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`, "_blank");
  };

  // ===== FUNÇÃO PARA SELECIONAR MÁQUINA E IR PARA PASSO 2 =====
  const selecionarMaquina = (maquina: Maquina) => {
    setMaquinaSelecionada(maquina);
    setPassoAtual(2);
    // Rola para o topo da seção
    document.getElementById("monte-seu-evento")?.scrollIntoView({ behavior: "smooth" });
  };

  // ===== FUNÇÃO PARA VOLTAR AO PASSO 1 =====
  const voltarPasso1 = () => {
    setPassoAtual(1);
    setRecheioSelecionado(null);
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
            Escolha a máquina e o recheio perfeitos para sua festa!
          </p>
        </div>

        {/* ===== INDICADOR DE PASSOS ===== */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              passoAtual === 1
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground"
            }`}
          >
            <span className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              {maquinaSelecionada ? <Check size={16} /> : "1"}
            </span>
            Escolha a Máquina
          </div>
          <ArrowRight className="text-muted-foreground" />
          <div
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              passoAtual === 2
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground"
            }`}
          >
            <span className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              {recheioSelecionado ? <Check size={16} /> : "2"}
            </span>
            Escolha o Recheio
          </div>
        </div>

        {/* ===== PASSO 1: ESCOLHER MÁQUINA ===== */}
        {passoAtual === 1 && (
          <div className="animate-fade-in">
            {/* Seção Gruas */}
            <div id="gruas" className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Gruas de Pelúcia
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maquinas
                  .filter((m) => m.categoria === "grua")
                  .map((maquina) => (
                    <CardMaquina
                      key={maquina.id}
                      maquina={maquina}
                      onEspiar={() => setMaquinaEspiando(maquina)}
                      onSelecionar={() => selecionarMaquina(maquina)}
                    />
                  ))}
              </div>
            </div>

            {/* Seção Totems */}
            <div id="totems">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Totems de Carregamento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maquinas
                  .filter((m) => m.categoria === "totem")
                  .map((maquina) => (
                    <CardMaquina
                      key={maquina.id}
                      maquina={maquina}
                      onEspiar={() => setMaquinaEspiando(maquina)}
                      onSelecionar={() => selecionarMaquina(maquina)}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== PASSO 2: ESCOLHER RECHEIO ===== */}
        {passoAtual === 2 && (
          <div className="animate-fade-in">
            {/* Botão Voltar */}
            <button
              onClick={voltarPasso1}
              className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
            >
              <ArrowLeft size={20} />
              Voltar para máquinas
            </button>

            {/* Máquina selecionada */}
            <div className="bg-card rounded-xl p-4 mb-8 flex items-center gap-4">
              <img
                src={maquinaSelecionada?.imagem}
                alt={maquinaSelecionada?.nome}
                className="w-20 aspect -[4/3] rounded-lg object-contain bg-muted p-1"
              />
              <div>
                <p className="text-sm text-muted-foreground">Máquina selecionada:</p>
                <p className="font-bold text-foreground">{maquinaSelecionada?.nome}</p>
              </div>
            </div>

            {/* Grid de recheios */}
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Agora escolha o recheio:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recheios.map((recheio) => (
                <div
                  key={recheio.id}
                  onClick={() => setRecheioSelecionado(recheio)}
                  className={`bg-card rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                    recheioSelecionado?.id === recheio.id
                      ? "ring-4 ring-primary"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={recheio.imagem}
                      alt={recheio.nome}
                      className="w-full h-48 object-cover"
                    />
                    {recheioSelecionado?.id === recheio.id && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
                        <Check size={20} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-foreground mb-1">{recheio.nome}</h4>
                    <p className="text-sm text-muted-foreground">{recheio.descricao}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão de enviar para WhatsApp */}
            {recheioSelecionado && (
              <div className="mt-12 text-center animate-slide-up">
                <div className="bg-card rounded-xl p-8 max-w-xl mx-auto">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Seu evento está montado!
                  </h3>
                  <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                    <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                      <img
                        src={maquinaSelecionada?.imagem}
                        alt={maquinaSelecionada?.nome}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span className="font-medium text-foreground text-sm">
                        {maquinaSelecionada?.nome}
                      </span>
                    </div>
                    <span className="text-primary font-bold">+</span>
                    <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                      <img
                        src={recheioSelecionado.imagem}
                        alt={recheioSelecionado.nome}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span className="font-medium text-foreground text-sm">
                        {recheioSelecionado.nome}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={enviarParaWhatsApp}
                    className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#22c55e] transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                  >
                    <MessageCircle size={24} />
                    Enviar Orçamento via WhatsApp
                  </button>
                </div>
              </div>
            )}
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
                    selecionarMaquina(maquinaEspiando);
                    setMaquinaEspiando(null);
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Selecionar
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
  onEspiar: () => void;
  onSelecionar: () => void;
}

const CardMaquina = ({ maquina, onEspiar, onSelecionar }: CardMaquinaProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden transition-all hover:-translate-y-1 group
        shadow-[0_-6px_12px_-6px_rgba(0,0,0,0.25)] hover:shadow-[0_-8px_20px_-8px_rgba(0,0,0,0.35)]">
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
      </div>
      
      {/* Conteúdo */}
      <div className="p-4">
        <h4 className="font-bold text-foreground text-lg mb-3">{maquina.nome}</h4>
        <button
          onClick={onSelecionar}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Selecionar
        </button>
      </div>
    </div>
  );
};

export default MonteSeuEvento;
