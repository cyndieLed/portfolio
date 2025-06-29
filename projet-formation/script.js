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

function ajouterLigne() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td class="intitule-cell"><input type="text"></td>
    <td><input type="text"></td>
    <td><input type="date"></td>
    <td><input type="number" min="0" step="0.1" oninput="calculerTotal()"></td>
    <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
    <td><input type="number" min="1" step="1" oninput="calculerTotal()"></td>
    <td>
      <select onchange="calculerTotal()">
        <option value="Plan">Plan</option>
        <option value="CoFi">CoFi</option>
      </select>
    </td>
    <td><input type="text" readonly></td>         <!-- Rémunération estimée -->
    <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
    <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
    <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
    <td><input type="text" readonly></td>         <!-- Budget estimé -->
    <td><input type="text" readonly></td>         <!-- Répartition -->
    <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
    <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
    <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
    <td><input type="number" min="0" step="0.01" oninput="calculerTotal()"></td>
    <td><input type="text" readonly></td>         <!-- Budget réel -->
    <td><input type="text" readonly></td>         <!-- Écart -->
    <td><button onclick="supprimerLigne(this)">❌</button></td>
  `;
  document.getElementById("tableBody").appendChild(tr);
}

function supprimerLigne(btn) {
  btn.closest("tr").remove();
  calculerTotal();
}

function calculerTotal() {
  let totalDuree = 0;
  let totalBudget = 0;
  let totalCoFi = 0;
  let totalPlan = 0;
  let totalEcart = 0;

  const lignes = document.querySelectorAll("#tableBody tr");

  lignes.forEach(tr => {
    const val = idx => parseFloat(tr.cells[idx]?.querySelector("input")?.value.replace(",", ".") || 0);
    const getSelect = idx => tr.cells[idx].querySelector("select")?.value;

    const duree = val(3);
    const taux = val(4);
    const salaries = val(5);
    const financement = getSelect(6);
    const repas = val(8);
    const transport = val(9);
    const pedagogie = val(10);

    const remuneration = duree * taux * salaries;
    const coutEstime = remuneration + repas + transport + pedagogie;

    totalDuree += duree;
    totalBudget += coutEstime;

    let repartition = "";
    if (financement === "CoFi") {
      const cofi = coutEstime * 0.7;
      const plan = coutEstime * 0.3;
      totalCoFi += cofi;
      totalPlan += plan;
      repartition = `70 % CoFi (${cofi.toFixed(2)} €), 30 % Plan (${plan.toFixed(2)} €)`;
    } else {
      totalPlan += coutEstime;
      repartition = `100 % Plan (${coutEstime.toFixed(2)} €)`;
    }

    // Affichage estimé
    tr.cells[7].querySelector("input").value = remuneration.toFixed(2);
    tr.cells[11].querySelector("input").value = coutEstime.toFixed(2);
    tr.cells[12].querySelector("input").value = repartition;

    // Données réelles
    const remuReel = val(13);
    const repasReel = val(14);
    const transportReel = val(15);
    const pedagoReel = val(16);
    const coutReel = remuReel + repasReel + transportReel + pedagoReel;

    tr.cells[17].querySelector("input").value = coutReel.toFixed(2);

    const ecart = coutReel - coutEstime;
    tr.cells[18].querySelector("input").value = ecart.toFixed(2);

    totalEcart += ecart;
  });

  document.getElementById("totalDuree").textContent = totalDuree.toFixed(1) + " h";
  document.getElementById("totalBudget").textContent = totalBudget.toFixed(2) + " €";
  document.getElementById("totalCoFi").textContent = totalCoFi.toFixed(2) + " €";
  document.getElementById("totalPlan").textContent = totalPlan.toFixed(2) + " €";
  document.getElementById("totalEcart").textContent = totalEcart.toFixed(2) + " €";
}

// Initialisation
ajouterLigne();
