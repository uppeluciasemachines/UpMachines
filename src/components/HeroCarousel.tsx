/* ================================================================================
   COMPONENTE: HeroCarousel (Banner Principal)
   ================================================================================
   Carrossel de imagens rotativo para destacar eventos realizados.
   
   INSTRUÇÕES PARA ADICIONAR SUAS FOTOS:
   1. Coloque suas imagens na pasta: src/assets/
   2. Importe cada imagem no topo do arquivo
   3. Adicione a imagem no array "slides" abaixo
   
   Exemplo:
   import evento1 from "@/assets/evento1.jpg";
   
   const slides = [
     { imagem: evento1, titulo: "Festa Corporativa", descricao: "Evento XYZ" },
   ];
   ================================================================================ */

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import fotobanner from "@/assets/foto banner.jpg"
import fotobanner2 from "@/assets/banner 02.jpg"
import fotobanner3 from "@/assets/banner 03.jpg"

// ===== DADOS DOS SLIDES =====
// Substitua os placeholders pelas suas imagens e textos
const slides = [
  {
    // Placeholder - substitua por sua imagem importada
    imagem: fotobanner,
    titulo: "Eventos Inesquecíveis",
    descricao: "Máquinas de prêmios que encantam crianças e adultos",
  },
  {
    imagem: fotobanner2,
    titulo: "Festas Corporativas",
    descricao: "Entretenimento de qualidade para sua empresa",
  },
  {
    imagem: fotobanner3,
    titulo: "Aniversários Especiais",
    descricao: "Transforme sua festa em uma experiência única",
  },
];

const HeroCarousel = () => {
  // Estado para controlar qual slide está ativo
  const [slideAtual, setSlideAtual] = useState(0);

  // ===== ROTAÇÃO AUTOMÁTICA DOS SLIDES =====
  // Muda de slide a cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideAtual((anterior) => (anterior + 1) % slides.length);
    }, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalo);
  }, []);

  // Funções para navegar entre slides
  const irParaAnterior = () => {
    setSlideAtual((anterior) => (anterior - 1 + slides.length) % slides.length);
  };

  const irParaProximo = () => {
    setSlideAtual((anterior) => (anterior + 1) % slides.length);
  };

  return (
    <section className="relative h-[300px] md:h-[600px] overflow-hidden">
      {/* ===== SLIDES ===== */}
      {slides.map((slide, indice) => (
        <div
          key={indice}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            indice === slideAtual ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Imagem de fundo */}
          <img
            src={slide.imagem}
            alt={slide.titulo}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay escuro para melhorar leitura do texto */}
          <div className="absolute inset-0 bg-secondary/60" />
          
          {/* Conteúdo do slide */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                {slide.titulo}
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8">
                {slide.descricao}
              </p>
              {/* CTA desativado conforme solicitado */}
            </div>
          </div>
        </div>
      ))}

      {/* ===== BOTÕES DE NAVEGAÇÃO ===== */}
      <button
        onClick={irParaAnterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/50 hover:bg-secondary/80 text-primary-foreground p-3 rounded-full transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={irParaProximo}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/50 hover:bg-secondary/80 text-primary-foreground p-3 rounded-full transition-colors"
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* ===== INDICADORES (bolinhas) ===== */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, indice) => (
          <button
            key={indice}
            onClick={() => setSlideAtual(indice)}
            className={`w-3 h-3 rounded-full transition-all ${
              indice === slideAtual
                ? "bg-primary w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/80"
            }`}
            aria-label={`Ir para slide ${indice + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
