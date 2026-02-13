"use client";

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
import Bolas from "@/assets/bolas-transparentes.webp";
import peluciasnacionais from "@/assets/pelucias nacionais.webp";
import peluciaspersona from "@/assets/pelucias personalizadas.webp";
import peluciaspremium from "@/assets/pelucias premium.webp";
import totemtv from "@/assets/totem tv fundo branco.png";
import totempoket from "@/assets/totem poket.png";

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
  {
    id: 5,
    nome: "Totem Tv",
    imagem: totemtv,
    descricao: "Totem de carregamento de aparelhos celulares.",
    categoria: "totem",
  },
  {
    id: 6,
    nome: "Totem Poket",
    imagem: totempoket,
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
    imagem: peluciasnacionais,
    descricao: "Modelos variados de pelúcias nacionais",
  },
  {
    id: 2,
    nome: "Pelúcias Premium",
    imagem: peluciaspremium,
    descricao: "Modelos variados de pelúcias Premium",
  },
  {
    id: 3,
    nome: "Pelúcias Personalizadas",
    imagem: peluciaspersona,
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
  imagem: string | import("next/image").StaticImageData;
  descricao: string;
  categoria: string;
}

// Tipo para o brinde selecionado
interface Brinde {
  id: number;
  nome: string;
  imagem: string | import("next/image").StaticImageData;
  descricao: string;
}

const MonteSeuEvento = () => {
  // ===== ESTADOS DO COMPONENTE =====
  const [passoAtual, setPassoAtual] = useState(1); // Controla qual passo está ativo (1: máquinas, 2: brindes, 3: orçamento)
  const [maquinasSelecionadas, setMaquinasSelecionadas] = useState<Maquina[]>([]); // Array de máquinas selecionadas
  const [brindesSelecionados, setBrindesSelecionados] = useState<Brinde[]>([]);
  const [maquinaEspiando, setMaquinaEspiando] = useState<Maquina | null>(null); // Para o Quick View
  const [dataEvento, setDataEvento] = useState(""); // Data do evento
  const [horasAluguel, setHorasAluguel] = useState(""); // Quantidade de horas

  // Funções auxiliares para verificar tipos de seleções
  const temMaquina = () => maquinasSelecionadas.some(m => m.categoria === "maquina");
  const temTotem = () => maquinasSelecionadas.some(m => m.categoria === "totem");

  // ===== FUNÇÃO PARA ENVIAR PEDIDO VIA WHATSAPP =====
  const enviarParaWhatsApp = () => {
    if (maquinasSelecionadas.length === 0) return;

    // Validar se data e horas foram preenchidas
    if (!dataEvento || !horasAluguel) {
      alert("Por favor, preencha a data do evento e a quantidade de horas.");
      return;
    }

    // Monta a mensagem baseada nas seleções
    let mensagem = "Olá! Gostaria de solicitar um orçamento para:\n\n";
    
    // Adiciona data e horas
    const dataFormatada = new Date(dataEvento + "T00:00:00").toLocaleDateString("pt-BR");
    mensagem += `📅 *Data do Evento:* ${dataFormatada}\n`;
    mensagem += `⏰ *Duração:* ${horasAluguel} hora(s)\n\n`;
    
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
                        <img src={typeof maquina.imagem === "string"
                          ? maquina.imagem
                          : maquina.imagem.src
                        }
                            alt={maquina.nome}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded object-contain" />
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

                    <img src={typeof maquina.imagem === "string"
                        ? maquina.imagem
                        : maquina.imagem.src
                      }
                      alt={maquina.nome}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg object-contain bg-background p-1" />

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
                   <img src={typeof brinde.imagem === "string"
                    ? brinde.imagem
                    : brinde.imagem.src
                   }
                      alt={brinde.nome}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover" />
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

                              <img src={typeof maquina.imagem === "string"
                                ? maquina.imagem
                                : maquina.imagem.src
                              }
                                alt={maquina.nome}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded object-contain" />

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

                              <img src={typeof maquina.imagem === "string"
                                ? maquina.imagem
                                : maquina.imagem.src
                              }
                                alt={maquina.nome}
                                width={48}
                                height={48}
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
                              <img src={typeof brinde.imagem === "string"
                                ? brinde.imagem
                                : brinde.imagem.src
                              }
                                alt={brinde.nome}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded object-cover" />
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

                {/* Campos de Data e Horas */}
                <div className="mt-8 mb-6 space-y-4">
                  <div className="border-t border-muted pt-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
                      Informações do Evento
                    </h4>
                    
                    {/* Campo de Data */}
                    <div className="mb-4">
                      <label htmlFor="dataEvento" className="block text-sm font-medium text-foreground mb-2">
                        📅 Data do Evento *
                      </label>
                      <input
                        type="date"
                        id="dataEvento"
                        value={dataEvento}
                        onChange={(e) => setDataEvento(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    {/* Campo de Horas */}
                    <div>
                      <label htmlFor="horasAluguel" className="block text-sm font-medium text-foreground mb-2">
                        ⏰ Quantidade de Horas *
                      </label>
                      <input
                        type="number"
                        id="horasAluguel"
                        value={horasAluguel}
                        onChange={(e) => setHorasAluguel(e.target.value)}
                        placeholder="Ex: 4"
                        min="1"
                        max="24"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Informe quantas horas você deseja alugar
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botão de enviar para WhatsApp */}
                <button
                  onClick={enviarParaWhatsApp}
                  className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#22c55e] transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <svg
        className="w-12 h-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
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
            <img src={typeof maquinaEspiando.imagem === "string"
              ? maquinaEspiando.imagem
              : maquinaEspiando.imagem.src
            }
              alt={maquinaEspiando.nome}
              width={600}
              height={450}
              className="w-full aspect-[4/3] object-contain bg-muted p-4"/>

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
        <img src={typeof maquina.imagem === "string"
          ? maquina.imagem
          : maquina.imagem.src
        }
          alt={maquina.nome}
          width={600}
          height={450}
          className="w-full aspect-[4/3] object-contain bg-muted p-2 group-hover:scale-105 transition-transform duration-300" />
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
