# UGB Park API

## Visão Geral

A API do UGB Park é responsável pela autenticação de usuários, gerenciamento de veículos, processamento de OCR e registro das movimentações do estacionamento.

Base URL:

```txt
http://localhost:8000/api/
```

---

# Autenticação

## POST /login

Realiza autenticação de usuários.

### Request

```json
{
  "username": "admin",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login realizado com sucesso"
}
```

---

# Cadastro

## POST /cadastro

Cria um novo usuário.

### Request

```json
{
  "username": "pedro",
  "email": "pedro@email.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Usuário criado com sucesso"
}
```

---

# OCR

## POST /ocr

Processa uma imagem e retorna a placa identificada.

### Request

Multipart Form Data

```txt
image: arquivo.jpg
```

### Response

```json
{
  "plate": "DQE2H66"
}
```

---

# Entrada

## POST /entrada

Registra entrada de veículo.

### Request

```json
{
  "plate": "DQE2H66"
}
```

### Response

```json
{
  "message": "Entrada registrada com sucesso"
}
```

---

# Saída

## POST /saida

Registra saída de veículo.

### Request

```json
{
  "plate": "DQE2H66"
}
```

### Response

```json
{
  "message": "Saída registrada com sucesso"
}
```

---

# Histórico

## GET /historico

Retorna todas as movimentações registradas.

### Response

```json
[
  {
    "id": 1,
    "vehicle_plate": "DQE2H66",
    "entry_time": "2026-06-08T18:00:00Z",
    "exit_time": null,
    "is_active": true
  }
]
```

---

# Modelo de Dados

## User

```json
{
  "id": 1,
  "username": "pedro",
  "email": "pedro@email.com"
}
```

---

## Vehicle

```json
{
  "id": 1,
  "plate": "DQE2H66"
}
```

---

## ParkingAccess

```json
{
  "id": 1,
  "vehicle": 1,
  "entry_time": "2026-06-08T18:00:00Z",
  "exit_time": null,
  "is_active": true
}
```

---

# Códigos de Resposta

| Código | Descrição                |
| ------ | ------------------------ |
| 200    | Sucesso                  |
| 201    | Criado                   |
| 400    | Requisição inválida      |
| 401    | Não autorizado           |
| 404    | Não encontrado           |
| 500    | Erro interno do servidor |

---

# Arquitetura

```txt
React Native
      ↓
Expo Camera
      ↓
Django REST API
      ↓
OCR (EasyOCR)
      ↓
SQLite
```
