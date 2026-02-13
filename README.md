# UP Machines

Site institucional da UP Machines - Aluguel de máquinas para eventos.

## 🚀 Deploy na Vercel

Este projeto está pronto para deploy na Vercel.

### Passos para fazer deploy:

1. **Conecte seu repositório GitHub à Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório do GitHub
   - A Vercel detectará automaticamente que é um projeto Next.js

2. **Configure o projeto:**
   - Framework Preset: **Next.js** (detectado automaticamente)
   - Build Command: `npm run build` (já configurado)
   - Output Directory: `.next` (padrão Next.js)

3. **Deploy:**
   - Clique em "Deploy"
   - A Vercel fará o build e deploy automaticamente
   - Você receberá uma URL pública do seu site

### 🔄 Deploy Automático

Após o primeiro deploy, toda vez que você fizer push para a branch `main` do GitHub, a Vercel fará deploy automaticamente da nova versão.

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev
```

O site estará disponível em [http://localhost:3000](http://localhost:3000)

## 📦 Build de Produção

```bash
# Criar build de produção
npm run build

# Executar build de produção localmente
npm run start
```

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Query** - Gerenciamento de estado

## 📝 Estrutura do Projeto

```
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais
│   └── providers.tsx      # React Query Provider
├── components/            # Componentes React
├── hooks/                # Custom hooks
├── lib/                  # Utilitários
├── assets/               # Imagens
└── public/               # Arquivos estáticos
```

## 📧 Contato

- **Email:** upmachinesthe@gmail.com
- **Instagram:** [@upmachines](https://www.instagram.com/upmachines/)
- **WhatsApp:** +55 86 99408-3920
