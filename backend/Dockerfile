# Escolher a imagem base do Node.js (a versão alpine é mais leve)
FROM node:24-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependência (package.json e package-lock.json)
COPY package*.json ./

# Instalar as dependências do Node.js
RUN npm install

# Copiar o restante do código da aplicação para dentro do container
COPY . .

# Expor a porta onde o backend vai rodar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
