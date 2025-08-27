export default function getResponseFromAPI() {
    return new Promise((resolve, reject) => {
      try {
        // Simulation d'une opération qui pourrait échouer
        const operationReussie = true; // ou false pour simuler une erreur
        
        if (operationReussie) {
          resolve(true); // Succès
        } else {
          reject(new Error("L'opération a échoué")); // Échec
        }
      } catch (error) {
        reject(error); // Gestion des erreurs inattendues
      }
    });
}