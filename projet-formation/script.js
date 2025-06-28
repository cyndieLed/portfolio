<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Plan de formation</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- Barre de navigation -->
  <header class="nav-bar">
    <nav>
      <ul>
        <li><a href="index.html">🏠 Accueil</a></li>
        <li><a href="formations.html">📚 Formations</a></li>
        <li><a href="salaries.html">👥 Salariés</a></li>
        <li><a href="plan-formation.html">🗓️ Plan</a></li>
        <li><a href="groupes.html">👨‍👩‍👧‍👦 Groupes</a></li>
        <li><a href="convocation.html">✉️ Convocation</a></li>
      </ul>
    </nav>
  </header>

  <!-- Section du formulaire -->
  <section class="formulaire-section">
    <h1>🗓️ Créer un plan de formation</h1>
    <form class="formulaire" onsubmit="enregistrerPlan(); return false">
      <label>Intitulé du plan</label>
      <input type="text" id="intitulePlan" placeholder="Ex : Plan 2025" required>

      <label>Objectifs du plan</label>
      <textarea id="objectifPlan" rows="3" placeholder="Ex : développer les compétences numériques..." required></textarea>

      <h3>Formations prévues</h3>

      <table class="table-formations">
        <thead>
          <tr>
            <th>Intitulé</th>
            <th>Formateur</th>
            <th>Date</th>
            <th>Durée</th>
            <th>Budget (€)</th>
            <th>Financement</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tableBody">
          <tr>
            <td><input type="text" required></td>
            <td><input type="text" required></td>
            <td><input type="date" required></td>
            <td><input type="text" required oninput="calculerTotal()"></td>
            <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
            <td>
              <select onchange="calculerTotal()">
                <option>Plan</option>
                <option>CPF</option>
                <option>OPCO</option>
                <option>Autre</option>
              </select>
            </td>
            <td><button type="button" onclick="supprimerLigne(this)">❌</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>Total durée :</strong></td>
            <td id="totalDuree">0 jours</td>
            <td colspan="3" id="totalBudget">0 €</td>
          </tr>
        </tfoot>
      </table>

      <button type="button" onclick="ajouterLigne()">➕ Ajouter une ligne</button>
      <br><br>
      <button type="submit">💾 Enregistrer le plan</button>
    </form>
  </section>

  <!-- Script JavaScript -->
  <script>
    function ajouterLigne() {
      const tbody = document.getElementById("tableBody");
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" required></td>
        <td><input type="text" required></td>
        <td><input type="date" required></td>
        <td><input type="text" required oninput="calculerTotal()"></td>
        <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
        <td>
          <select onchange="calculerTotal()">
            <option>Plan</option>
            <option>CPF</option>
            <option>OPCO</option>
            <option>Autre</option>
          </select>
        </td>
        <td><button type="button" onclick="supprimerLigne(this)">❌</button></td>
      `;
      tbody.appendChild(tr);
    }

    function supprimerLigne(button) {
      const tr = button.closest("tr");
      tr.remove();
      calculerTotal();
    }

    function calculerTotal() {
      let totalDuree = 0;
      let totalBudget = 0;

      const lignes = document.querySelectorAll("#tableBody tr");
      lignes.forEach(ligne => {
        const duree = ligne.cells[3]?.querySelector("input")?.value;
        if (duree) {
          const match = duree.match(/(\d+(?:[\.,]\d+)?)/);
          if (match) totalDuree += parseFloat(match[1].replace(",", "."));
        }

        const budget = ligne.cells[4]?.querySelector("input")?.value;
        if (budget) totalBudget += parseFloat(budget.replace(",", "."));
      });

      document.getElementById("totalDuree").textContent = totalDuree.toFixed(1) + " jours";
      document.getElementById("totalBudget").textContent = totalBudget.toFixed(2) + " €";
    }

    function enregistrerPlan() {
      const intitule = document.getElementById("intitulePlan").value;
      const dateFormation = document.querySelector("#tableBody input[type='date']")?.value;
      const lieu = "À définir";
      const heure = "09:00";
      const formateur = document.querySelector("#tableBody tr td:nth-child(2) input")?.value;

      localStorage.setItem("formationActuelle", JSON.stringify({
        nom: intitule,
        date: dateFormation,
        heure: heure,
        lieu: lieu,
        formateur: formateur
      }));

      alert("✅ Plan de formation enregistré localement !");
    }
  </script>

</body>
</html>
