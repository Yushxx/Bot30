const TelegramBot = require('node-telegram-bot-api');
const token = 'TON_TOKEN_ICI';  // Remplace par ton token de bot
const bot = new TelegramBot(token, { polling: true });

const channelId = '@TomyTips'; // ID du canal où les prédictions seront envoyées

// Fonction pour générer des prédictions aléatoires
function generatePrediction() {
  const attempts = 4;
  let predictionMessage = `New Brawl Pirates\nCode: 1.44\nAttempts ${attempts}\nDans 5min\n`;

  for (let i = 1; i <= attempts; i++) {
    const cups = shuffleCups();
    predictionMessage += `${i} ${cups}\n`;
  }

  predictionMessage += `\n\n[s'inscrire et gagner](https://1wmnt.com/?open=register&p=j7rc)\n[how to play](https://t.me/TomyTips/29)`;

  return predictionMessage;
}

// Fonction pour mélanger les tasses (2 verts et 1 rouge)
function shuffleCups() {
  const cups = ['🔴', '🟢', '🟢'];
  for (let i = cups.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cups[i], cups[j]] = [cups[j], cups[i]];
  }
  return cups.join('');
}

// Fonction pour envoyer les prédictions toutes les 30 minutes de 10h à 22h
function schedulePredictions() {
  const startHour = 10;
  const endHour = 22;

  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= startHour && currentHour < endHour) {
    const predictionMessage = generatePrediction();
    bot.sendMessage(channelId, predictionMessage, { parse_mode: 'Markdown' });
  }

  // Replanifier la prochaine prédiction dans 30 minutes
  setTimeout(schedulePredictions, 30 * 60 * 1000);
}

// Lancement initial des prédictions
schedulePredictions();

bot.on('polling_error', (error) => {
  console.log(error);  // Gère les erreurs de polling
});
