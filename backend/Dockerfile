# Usar imagem mais recente e segura
FROM node:24-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência e instalar
COPY package*.json ./
RUN npm install

# Copiar o restante da aplicação
COPY . .

# Criar usuário não root para rodar o app com segurança
RUN addgroup -S app && adduser -S app -G app
USER app

# Expor a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]