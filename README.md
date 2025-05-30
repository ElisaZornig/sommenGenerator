# 🚀 Front-end Project – React + Tailwind

Welkom bij dit front-end project gebouwd met **React** en gestyled met **Tailwind CSS**. Deze gids helpt je stap voor stap om het project lokaal op te zetten.

---

## 📦 Vereisten

Zorg ervoor dat je onderstaande tools op je computer hebt geïnstalleerd voordat je begint:

- **Node.js** (versie 16 of hoger) – [Download hier](https://nodejs.org/)
- **npm** – komt automatisch mee met Node.js

---

## 🛠️ Installatie

Volg deze stappen om het project lokaal draaiend te krijgen.

### 1. Repository klonen

Kopieer de code van GitHub naar je eigen computer met het volgende commando:

```bash
git clone https://github.com/jouw-gebruikersnaam/naam-van-je-repo.git
```


### 2. Installeer je dependencies
npm install

### 3. Controleer of Tailwind correct is ingesteld

Als Tailwind CSS nog niet is ingesteld in het project, volg dan de onderstaande stappen om het correct in te stellen:

1. **Genereer de Tailwind-configuratiebestanden**  
   Voer het volgende commando uit om de configuratiebestanden voor Tailwind te genereren:

   ```bash
   npx tailwindcss init -p `
2. Pas de content-array aan

```bash 
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

3. Voeg de Tailwind-directives toe aan je CSS-bestand


```bash 
@tailwind base;
@tailwind components;
@tailwind utilities;
```

