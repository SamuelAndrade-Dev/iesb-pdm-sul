
ATIVIDADE PRÁTICA 05 — MetasSemestre
Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB

1. DESCRICAO DO PROJETO
--------------------------------------------------------------------------------
Aplicativo para cadastro e acompanhamento de metas academicas do semestre.
Desenvolvido com React Native (Expo), aplicando componentizacao, estados 
complexos (useState), manipulacao de eventos, e persistencia local com 
AsyncStorage.


2. PREPARACAO E EXECUCAO
--------------------------------------------------------------------------------
Comandos utilizados para a criacao do ambiente:

  npx create-expo-app@latest MetasSemestre --template blank
  cd MetasSemestre
  npx expo install @react-native-async-storage/async-storage react-native-safe-area-context

Para rodar a aplicacao:
  npx expo start -c


3. ESTRUTURA DO PROJETO
--------------------------------------------------------------------------------
/MetasSemestre
├── /components
│   ├── MetaInput.js     (Componente de entrada: TextInput e botao de adicionar)
│   └── MetaList.js      (Componente de renderizacao da FlatList e remocao)
├── App.js               (Gerenciamento de estado global e persistencia)
└── README.txt           (Documentacao do projeto)


4. REQUISITOS IMPLEMENTADOS E COMPONENTIZACAO
--------------------------------------------------------------------------------
- MetaInput.js: Recebe 'value', 'onChangeText' e 'onAdd' via props. Conta com
  feedback visual 'android_ripple' no Pressable de cadastro.
  
- MetaList.js: Utiliza FlatList com 'keyExtractor' atribuindo IDs unicos 
  gerados via Date.now().toString(). Suporta exclusao por id e alternancia
  de status (concluida).

- Validacao e UX: Nao permite cadastrar metas com texto em branco, disparando
  um 'Alert.alert' orientando o usuario.


5. LOGICA DE PERSISTENCIA (useEffect + AsyncStorage)
--------------------------------------------------------------------------------
A persistencia de dados foi organizada em dois hooks useEffect distintos no 
arquivo App.js para garantir a integridade dos dados e evitar sobrescritas 
indesejadas:

1) useEffect de CARREGAMENTO (Executado apenas na montagem []):
   Busca os dados armazenados no AsyncStorage sob a chave '@metas_semestre'.
   Caso existam registros, aplica JSON.parse para converter a string em array
   e atualiza o estado 'metas'. Ao finalizar, ativa uma flag de controle 
   (carregouInicial = true).

2) useEffect de SALVAMENTO (Monitora [metas, carregouInicial]):
   Disparado sempre que o array de metas sofre alteracoes (adicao, remocao ou
   toggle de conclusao). Converte a lista em formato string com JSON.stringify
   e salva no AsyncStorage. A flag 'carregouInicial' impede que o estado 
   vazio inicial limpe os dados antes do termino do carregamento.


6. DESAFIOS OPCIONAIS (NOTA EXTRA)
--------------------------------------------------------------------------------
- Marcar meta como concluida (campo 'concluida: boolean') com efeito visual de
  texto riscado (line-through) ao clicar na meta.
- Contador dinmico exibido no cabecalho: "X pendentes / Y concluidas".


7. Screenshots

![Tela 1](https://github.com/user-attachments/assets/92aac353-6296-405b-9a04-b4a11b5571c0)


![Tela 2](https://github.com/user-attachments/assets/93f8200b-3523-492d-a055-bba4eadac2ff)


![Tela 3](https://github.com/user-attachments/assets/ac2494b7-0b03-4568-94ba-790be4819b80)
