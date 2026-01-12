/* ================================================================================
   PÁGINA PRINCIPAL - UP MACHINES
   ================================================================================
   Esta é a página principal do site. Ela importa e organiza todos os componentes.
   
   ESTRUTURA DA PÁGINA:
   1. Header - Menu de navegação fixo
   2. HeroCarousel - Banner rotativo com fotos de eventos
   3. MonteSeuEvento - Área interativa para montar o evento
   4. Footer - Rodapé com logo, redes sociais e contato
   5. WhatsAppButton - Botão flutuante do WhatsApp
   
   INSTRUÇÕES GERAIS:
   - Para alterar a logo: veja os arquivos Header.tsx e Footer.tsx
   - Para alterar imagens: veja HeroCarousel.tsx e MonteSeuEvento.tsx
   - Para alterar o número do WhatsApp: veja WhatsAppButton.tsx e MonteSeuEvento.tsx
   ================================================================================ */

// Importa os componentes da página
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import MonteSeuEvento from "@/components/MonteSeuEvento";
import PlanosInformativos from "@/components/PlanosInformativos";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* ===== CABEÇALHO (Menu de navegação) ===== */}
      <Header />

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <main>
        {/* Espaçamento para compensar o header fixo */}
        <div className="pt-16">
          {/* Banner rotativo com fotos de eventos */}
          <HeroCarousel />

          {/* Informativos de planos */}
          <PlanosInformativos />

          {/* Seção principal: Monte seu Evento */}
          <MonteSeuEvento />
        </div>
      </main>

      {/* ===== RODAPÉ ===== */}
      <Footer />

      {/* ===== BOTÃO FLUTUANTE DO WHATSAPP ===== */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
