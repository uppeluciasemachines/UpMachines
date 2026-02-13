import { Check } from "lucide-react";

const planosMaquinas = [
  {
    titulo: "máquina",
    preco: "R$1200",
    itens: [
      "4 horas de evento",
      "Assistente técnico",
      "Jogadas ilimitadas e sem custo",
      "Taxa de entrega gratuita",
    ],
  },
  {
    titulo: "máquina+ 30 prêmios",
    preco: "R$1700",
    itens: [
      "4 horas de evento",
      "Assistente técnico",
      "Jogadas ilimitadas e sem custo",
      "Taxa de entrega gratuita",
      "30 brindes nacionais, com selo inmetro",
    ],
  },
  {
    titulo: "máquina+ 50 prêmios",
    preco: "R$2700",
    itens: [
      "4 horas de evento",
      "Assistente técnico",
      "Jogadas ilimitadas e sem custo",
      "Taxa de entrega gratuita",
      "50 brindes nacionais, com selo inmetro",
    ],
  },
];

const planosTotem = [
  {
    titulo: "Totens de 6 a 8 compartimentos de carregamento",
    preco: "R$550",
    itens: ["4 horas de evento", "Taxa de entrega gratuita"],
  },
  {
    titulo: "Totens com compartimentos de carregamento e tela de led",
    preco: "R$700",
    itens: ["4 horas de evento", "Taxa de entrega gratuita"],
  },
];

const PlanosInformativos = () => {
  return (
    <section className="bg-background py-16" id="planos">
      <div className="container mx-auto px-4 space-y-16">
        {/* Planos de máquinas */}
        <div className="space-y-8">
          <div className="max-w-4xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Conheça nossos planos com máquinas de prêmios
            </h2>
            <p className="text-muted-foreground text-lg">
              Escolha a melhor forma de surpreender seus convidados com uma experiência divertida,
              personalizada e inesquecível. Temos opções com a identidade visual da sua marca, com
              investimentos que se ajustam ao seu evento. É impacto, encantamento e interação com propósito!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planosMaquinas.map((plano) => (
              <div
                key={plano.titulo}
                className="bg-card rounded-2xl border border-primary/20 shadow-lg overflow-hidden flex flex-col"
              >
                <div className="bg-primary text-primary-foreground text-center py-4 uppercase font-bold tracking-wide">
                  {plano.titulo}
                </div>
                <div className="p-6 flex-1 space-y-4">
                  <ul className="space-y-3 text-foreground">
                    {plano.itens.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-primary">
                          <Check size={16} />
                        </span>
                        <span className="text-sm md:text-base text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center py-4 bg-muted text-2xl font-bold text-foreground">
                  {plano.preco}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-2">Adicionais de brindes</h3>
            <p className="text-muted-foreground">
              Brinde nacional R$ 20,00 (unidade) • Brinde premium R$ 30,00 (unidade)
            </p>
          </div>
        </div>

        {/* Planos de Totem */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Explore nossos formatos de totem de carregamento
            </h2>
            <p className="text-muted-foreground text-lg">
              Com design moderno, tela para exibição de imagem ou vídeo e personalização completa,
              nossos totems transformam uma necessidade em oportunidade de marca. Escolha o plano
              ideal e conecte seu público com estilo!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planosTotem.map((plano) => (
              <div
                key={plano.titulo}
                className="bg-card rounded-2xl border border-primary/20 shadow-lg overflow-hidden flex flex-col"
              >
                <div className="bg-primary text-primary-foreground text-center py-4 font-bold tracking-wide">
                  {plano.titulo}
                </div>
                <div className="p-6 flex-1 space-y-3">
                  <ul className="space-y-3 text-foreground">
                    {plano.itens.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-primary">
                          <Check size={16} />
                        </span>
                        <span className="text-sm md:text-base text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center py-4 bg-muted text-2xl font-bold text-foreground">
                  {plano.preco}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanosInformativos;
