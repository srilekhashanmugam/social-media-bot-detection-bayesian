const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", () => {

  const accountAge = document.getElementById("accountAge").value;
  const posts = Number(document.getElementById("posts").value);
  const followers = Number(document.getElementById("followers").value);
  const following = Number(document.getElementById("following").value);
  const interval = document.getElementById("interval").value;
  const profile = document.getElementById("profile").value;

  /*
    Bayesian-style model

    Prior:
    P(Bot) = 0.20
    P(Human) = 0.80

    Each behavioural feature contributes a likelihood ratio.
    Posterior odds = Prior odds × Evidence likelihood ratio.
    Posterior probability = Odds / (1 + Odds)
  */

  const priorBot = 0.20;
  const priorHuman = 0.80;

  let likelihoodRatio = 1;
  let evidence = [];

  if (accountAge === "new") {
    likelihoodRatio *= 1.8;
    evidence.push("Very new account increases bot likelihood.");
  } else if (accountAge === "old") {
    likelihoodRatio *= 0.7;
    evidence.push("Older account reduces bot likelihood.");
  } else {
    evidence.push("Account age provides moderate evidence.");
  }

  if (posts >= 50) {
    likelihoodRatio *= 2.4;
    evidence.push("Very high posting frequency is suspicious.");
  } else if (posts >= 20) {
    likelihoodRatio *= 1.5;
    evidence.push("High posting frequency increases suspicion.");
  } else if (posts <= 5) {
    likelihoodRatio *= 0.75;
    evidence.push("Low posting frequency is more consistent with normal activity.");
  }

  const ratio = followers > 0 ? following / followers : 10;

  if (ratio >= 5) {
    likelihoodRatio *= 1.8;
    evidence.push("Following-to-follower ratio is unusually high.");
  } else if (ratio >= 2) {
    likelihoodRatio *= 1.3;
    evidence.push("Following count is noticeably higher than followers.");
  } else {
    likelihoodRatio *= 0.85;
    evidence.push("Follower/following relationship appears relatively balanced.");
  }

  if (interval === "regular") {
    likelihoodRatio *= 1.7;
    evidence.push("Highly regular posting intervals can indicate automation.");
  } else if (interval === "human") {
    likelihoodRatio *= 0.7;
    evidence.push("Natural posting variation reduces bot likelihood.");
  }

  if (profile === "low") {
    likelihoodRatio *= 1.4;
    evidence.push("Low profile completeness adds suspicious evidence.");
  } else if (profile === "high") {
    likelihoodRatio *= 0.75;
    evidence.push("Complete profile information reduces suspicion.");
  }

  const priorOdds = priorBot / priorHuman;
  const posteriorOdds = priorOdds * likelihoodRatio;
  let probability = posteriorOdds / (1 + posteriorOdds);

  probability = Math.max(0.01, Math.min(0.99, probability));

  const percentage = Math.round(probability * 100);

  document.getElementById("probability").textContent = percentage + "%";
  document.getElementById("meterFill").style.width = percentage + "%";

  const classification = document.getElementById("classification");
  const explanation = document.getElementById("explanation");

  if (percentage >= 70) {
    classification.textContent = "Likely Automated / Suspicious";
    classification.style.background = "#fef2f2";
    classification.style.color = "#b91c1c";

    explanation.textContent =
      "The observed behaviour produces a high posterior probability of automated activity.";
  } else if (percentage >= 40) {
    classification.textContent = "Needs Further Review";
    classification.style.background = "#fffbeb";
    classification.style.color = "#b45309";

    explanation.textContent =
      "The evidence is mixed. Additional account-level signals would be useful before classification.";
  } else {
    classification.textContent = "More Likely Human";
    classification.style.background = "#ecfdf5";
    classification.style.color = "#047857";

    explanation.textContent =
      "The observed behaviour produces a relatively low posterior probability of bot activity.";
  }

  const evidenceList = document.getElementById("evidenceList");

  evidenceList.innerHTML = "";

  evidence.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    evidenceList.appendChild(li);
  });
});
