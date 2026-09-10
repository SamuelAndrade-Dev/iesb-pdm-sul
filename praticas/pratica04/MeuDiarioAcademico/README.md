
ATIVIDADE 01 — Meu Diário Acadêmico
Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB
================================================================================

1. COMANDO UTILIZADO PARA CRIAR O PROJETO
--------------------------------------------------------------------------------
npx create-expo-app@latest MeuDiarioAcademico --template blank


2. TECNOLOGIAS E DEPENDÊNCIAS
--------------------------------------------------------------------------------
- React Native (Expo SDK)
- react-native-safe-area-context (Gerenciamento de áreas seguras da tela)

Comando de instalação da biblioteca de área segura:
npx expo install react-native-safe-area-context


3. ESTRUTURA DO PROJETO
--------------------------------------------------------------------------------
/MeuDiarioAcademico
├── App.js                  (Componente principal com lógica e StyleSheet)
├── labels.js               (Arquivo de centralização dos rótulos/textos)
└── README.md               (Documentação do projeto)


4. CONCEITOS DE UI E LAYOUT APLICADOS
--------------------------------------------------------------------------------
- Organização de Código: Centralização dos textos da interface no arquivo 
  labels.js e importação direta no App.js.

- Flexbox:
  * Estrutura geral vertical (flexDirection: 'column') com a lista expandindo 
    através de flex: 1.
  * Formulário de cadastro em linha (flexDirection: 'row') utilizando 
    justifyContent: 'space-between' e alignItems: 'center'.

- Dimensões Responsivas:
  * Uso de dimensões percentuais no input (width: '70%').
  * Dimensões percentuais nos botões de ação (~27% e 48%).

- Desafios Opcionais (Nota Extra):
  * Substituição do Button por Pressable com feedback visual dinâmico ao ser 
    pressionado (estilo buttonPressed).
  * Implementação de um Switch para filtragem interativa de disciplinas 
    obrigatórias.
  * Seletor de tipo de matéria (Obrigatória / Optativa) integrado.


5. INSTRUÇÕES PARA EXECUÇÃO
--------------------------------------------------------------------------------
1. Instalar as dependências:
   npm install

2. Iniciar o servidor do Expo:
   npx expo start -c

3. Pressionar a tecla 'a' para abrir no emulador Android ou escanear o QR Code 
   pelo aplicativo Expo Go no dispositivo móvel.
================================================================================

## 📱 Screenshots da Aplicação

<img width="1080" height="2312" alt="image" src="https://github.com/user-attachments/assets/fffb53e3-8de6-44e8-861f-666fe9e66b78" />
<img width="1080" height="2321" alt="image" src="https://github.com/user-attachments/assets/a36a633d-b34a-49fe-9f24-ccdb4a2e6256" />
 
