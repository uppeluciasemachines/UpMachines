/* ================================================================================
   COMPONENTE: Footer (Rodapé)
   ================================================================================
   Rodapé do site com logo, redes sociais e contato.
   
   INSTRUÇÕES PARA ADICIONAR SUA LOGO:
   1. Importe sua logo: import logo from "@/assets/sua-logo.png";
   2. Substitua o texto pela imagem: <img src={logo} alt="Up Machines" className="h-12" />
   
   INSTRUÇÕES PARA ALTERAR LINKS:
   1. Altere a variável LINK_INSTAGRAM para o perfil da empresa
   2. Altere NUMERO_WHATSAPP para o número de contato
   3. Altere EMAIL_CONTATO para o email da empresa
   ================================================================================ */

import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import logoup from "@/assets/LOGO UP MACHINES - LETRA BRANCA.png";

// ===== CONFIGURAÇÕES DE CONTATO =====
// Altere estas variáveis com as informações da empresa
const LINK_INSTAGRAM = "https://instagram.com/upmachines"; // Link do Instagram
const NUMERO_WHATSAPP = "5511999999999"; // Número do WhatsApp
const EMAIL_CONTATO = "contato@upmachines.com.br"; // Email de contato

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ===== COLUNA 1: LOGO E DESCRIÇÃO ===== */}
          <div>
            {/* Área da Logo - substitua pelo componente img quando tiver a logo */}
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">
                <img src={logoup} alt="Up Machines" className="h-20" />
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Transformando eventos em experiências inesquecíveis com nossas máquinas de entretenimento.
            </p>
          </div>

          {/* ===== COLUNA 2: REDES SOCIAIS ===== */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg mb-4">Siga-nos</h3>
            <div className="flex gap-4">
              <a
                href={LINK_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/20 hover:bg-primary p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* ===== COLUNA 3: CONTATO ===== */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${NUMERO_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary transition-colors"
              >
                <Phone size={18} />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${EMAIL_CONTATO}`}
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span>{EMAIL_CONTATO}</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin size={18} />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== LINHA DIVISÓRIA E COPYRIGHT ===== */}
        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Up Machines. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
