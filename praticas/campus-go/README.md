# CampusGo

Aplicativo universitário desenvolvido em React Native e Expo para organizar tarefas, acompanhar avisos do campus e registrar despesas do semestre.

## Tecnologias

- Expo SDK 54, React 19.1 e React Native 0.81
- Expo Router para navegação e rotas por arquivo
- Context API e AsyncStorage
- Expo Image Picker, Location, Notifications e Haptics
- Fetch API, React Native Animated e Expo Vector Icons

## Funcionalidades

- Quatro abas: Início, Tarefas, Bolso e Perfil.
- Avisos remotos da API JSONPlaceholder, com carregamento, atualização por gesto e nova tentativa.
- Criação, conclusão e visualização de detalhes de tarefas.
- Registro da localização aproximada em que estudou e lembretes locais de tarefa.
- Registro e persistência local de despesas, total em reais e compartilhamento do resumo.
- Foto de perfil escolhida da galeria ou capturada pela câmera, persistida localmente.
- Animação de entrada nos cartões de avisos.

## Instalação e execução

Use Node.js LTS e npm:

```bash
npm install
npx expo install --check
npx expo start
```

No terminal, execute os comandos dentro de `praticas/capus-go`. Use `npx expo start --android` ou `npx expo start --ios` para iniciar diretamente em um emulador.

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste a URL, se necessário:

```env
EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

O Expo carrega as variáveis `EXPO_PUBLIC_` durante o desenvolvimento. `.env` é local e não deve ser enviado ao Git.

## Testes dos recursos do dispositivo

Abra o projeto no Expo Go por QR code ou use um emulador. Conceda as permissões quando solicitadas:

- **Câmera e galeria:** abra Perfil e escolha uma foto ou tire uma nova.
- **Localização:** em Tarefas, toque em **Estudei aqui**. O emulador pode exigir uma localização configurada.
- **Notificações:** toque em **Lembrar em 10 segundos** e deixe o app em segundo plano para verificar a notificação local.
- **Háptica:** conclua uma tarefa em um dispositivo com suporte. O app continua funcional quando a vibração não estiver disponível.
- **Persistência:** adicione despesas e uma foto, feche e reabra o app.

Os recursos nativos não foram validados em um dispositivo físico neste ambiente. No web, notificações locais não estão disponíveis.
