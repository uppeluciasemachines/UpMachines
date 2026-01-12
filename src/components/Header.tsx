/* ================================================================================
   COMPONENTE: Header (Cabeçalho)
   ================================================================================
   Menu de navegação fixo no topo da página.
   
   INSTRUÇÕES PARA ADICIONAR SUA LOGO:
   1. Coloque sua imagem de logo na pasta: src/assets/
   2. Descomente a linha de import abaixo
   3. Substitua o texto "UP MACHINES" pela tag <img>
   
   Exemplo:
   import logo from "@/assets/sua-logo.png";
   <img src={logo} alt="Up Machines" className="h-10" />
   ================================================================================ */

import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoup from "@/assets/LOGO UP MACHINES - LETRA BRANCA.png";

const Header = () => {
  // Estado para controlar o menu mobile (aberto/fechado)
  const [menuAberto, setMenuAberto] = useState(false);

  // Função para rolar suavemente até uma seção da página
  const rolarParaSecao = (idSecao: string) => {
    const elemento = document.getElementById(idSecao);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" });
    }
    setMenuAberto(false); // Fecha o menu mobile após clicar
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* ===== ÁREA DA LOGO ===== 
              Para adicionar sua logo:
              1. Importe a imagem no topo do arquivo
              2. Substitua o texto abaixo por: <img src={logoup} alt="Up Machines" className="h-10" />
          */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              <img src={logoup} alt="Up Machines" className="h-20" />
            </span>
          </div>

          {/* ===== MENU DE NAVEGAÇÃO (Desktop) ===== */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => rolarParaSecao("planos")}
              className="text-primary-foreground hover:text-primary transition-colors font-medium"
            >
              Nossos Planos
            </button>
            <button
              onClick={() => rolarParaSecao("maquinas")}
              className="text-primary-foreground hover:text-primary transition-colors font-medium"
            >
              Máquinas
            </button>
            <button
              onClick={() => rolarParaSecao("totems")}
              className="text-primary-foreground hover:text-primary transition-colors font-medium"
            >
              Totens de Carregamento
            </button>
          </nav>

          {/* ===== BOTÃO MENU MOBILE ===== */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden text-primary-foreground p-2"
            aria-label="Abrir menu"
          >
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ===== MENU MOBILE (aparece quando clica no ícone) ===== */}
        {menuAberto && (
          <nav className="md:hidden py-4 border-t border-primary/20 animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => rolarParaSecao("planos")}
                className="text-primary-foreground hover:text-primary transition-colors font-medium text-left"
              >
                Nossos Planos
              </button>
              <button
                onClick={() => rolarParaSecao("maquinas")}
                className="text-primary-foreground hover:text-primary transition-colors font-medium text-left"
              >
                Máquinas
              </button>
              <button
                onClick={() => rolarParaSecao("totems")}
                className="text-primary-foreground hover:text-primary transition-colors font-medium text-left"
              >
                Totens de Carregamento
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
