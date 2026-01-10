/* ================================================================================
   COMPONENTE: WhatsAppButton (Botão Flutuante do WhatsApp)
   ================================================================================
   Botão fixo no canto inferior direito para contato rápido via WhatsApp.
   
   INSTRUÇÕES PARA ALTERAR O NÚMERO:
   1. Procure a variável NUMERO_WHATSAPP abaixo
   2. Substitua pelo número da empresa (código do país + DDD + número)
   ================================================================================ */

import { MessageCircle } from "lucide-react";

// ===== NÚMERO DO WHATSAPP =====
// Formato: código do país + DDD + número (sem espaços ou traços)
// Exemplo Brasil: 5511999999999
const NUMERO_WHATSAPP = "+5586994083920";

// Mensagem padrão que será enviada
const MENSAGEM_PADRAO = "Olá! Gostaria de mais informações sobre locação de máquinas para eventos.";

const WhatsAppButton = () => {
  // Função para abrir o WhatsApp
  const abrirWhatsApp = () => {
    const mensagemCodificada = encodeURIComponent(MENSAGEM_PADRAO);
    window.open(`https://wa.me/${+5586994083920}?text=${mensagemCodificada}`, "_blank");
  };

  return (
    <button
      onClick={abrirWhatsApp}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#22c55e] transition-all hover:scale-110 animate-pulse-glow"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </button>
  );
};

export default WhatsAppButton;
