# UGB Park

## Visão Geral

O UGB Park é um sistema inteligente de controle de estacionamento desenvolvido para a UGB (Centro Universitário Geraldo Di Biase).

O objetivo da aplicação é simplificar o gerenciamento de entrada e saída de veículos através de uma solução moderna baseada em visão computacional e reconhecimento automático de placas veiculares.

O sistema utiliza câmeras de dispositivos móveis para capturar imagens das placas dos veículos, processando-as através de OCR (Optical Character Recognition) e registrando automaticamente as movimentações no estacionamento.

---

## Problema

O controle manual de veículos em estacionamentos institucionais pode gerar:

- Filas em horários de pico;
- Erros de registro;
- Dificuldade na consulta de históricos;
- Falta de rastreabilidade das movimentações;
- Baixa eficiência operacional.

O UGB Park busca resolver esses problemas por meio da automação do processo de identificação veicular.

---

## Objetivos

- Automatizar o registro de entrada de veículos;
- Automatizar o registro de saída de veículos;
- Manter histórico completo das movimentações;
- Facilitar consultas administrativas;
- Reduzir erros humanos;
- Melhorar a experiência dos usuários do estacionamento.

---

## Regras de Negócio

### Cadastro de Usuários

- Usuários devem possuir conta para acessar o sistema.
- Cada usuário deve possuir:
  - Nome de usuário;
  - E-mail;
  - Senha.

---

### Registro de Veículos

- Veículos são identificados pela placa.
- Uma placa deve ser única dentro do sistema.
- O sistema deve permitir múltiplas entradas e saídas para o mesmo veículo.

---

### Entrada de Veículos

Ao registrar uma entrada:

- O sistema identifica a placa através de OCR.
- Caso o veículo não exista, ele é criado automaticamente.
- Uma movimentação é registrada contendo:
  - Placa;
  - Data e hora de entrada.

---

### Saída de Veículos

Ao registrar uma saída:

- O sistema identifica a placa através de OCR.
- O sistema localiza a última entrada em aberto.
- A movimentação é atualizada com:
  - Data e hora de saída.

---

### Histórico

O sistema deve manter registro permanente das movimentações.

Cada registro contém:

- Placa;
- Horário de entrada;
- Horário de saída;
- Status da movimentação.

---

### OCR

O sistema utiliza OCR para identificar placas veiculares brasileiras.

Fluxo:

1. Captura da imagem;
2. Processamento da imagem;
3. Extração do texto;
4. Validação do padrão da placa;
5. Registro da movimentação.

---

## Tecnologias Utilizadas

### Frontend

- React Native
- Expo Router
- Axios
- Expo Camera

### Backend

- Python
- Django
- Django Rest Framework
- SQLite

### Inteligência Artificial

- EasyOCR
- OpenCV

---

## Fluxo Geral

Login
→ Dashboard
→ Capturar Placa
→ OCR
→ Entrada ou Saída
→ Histórico

---

## Projeto Acadêmico

Este projeto foi desenvolvido para fins acadêmicos como parte das atividades do curso de Engenharia de Software da UGB.
