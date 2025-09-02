import { promises as fs } from 'fs';

async function readDatabase(path) {
  try {
    // Lire le fichier en UTF-8
    const data = await fs.readFile(path, 'utf8');

    // Découper par ligne et retirer l'en-tête
    const lines = data.trim().split('\n').slice(1);

    // Préparer le rapport
    const report = {};

    for (const line of lines) {
      const [firstname, , , field] = line.split(',');
      // On ne garde que firstname (colonne 0) et field (colonne 3)

      if (firstname && field) {
        if (!report[field]) {
          report[field] = [];
        }
        report[field].push(firstname);
      }
    }

    return report;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

export default readDatabase;
