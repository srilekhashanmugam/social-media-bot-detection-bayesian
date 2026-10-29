# Social Media Bot Detection using Bayesian Inference

A web-based security analytics prototype that estimates whether a social media account is likely to be automated or human using Bayesian inference and observable account behaviour.

## Features

- Account behaviour analysis
- Bayesian probability calculation
- Bot probability percentage
- Human / suspicious classification
- Posting frequency analysis
- Follower-to-following ratio analysis
- Account age analysis
- Posting interval analysis
- Profile completeness analysis
- Evidence summary
- Responsive web interface

## How It Works

The system starts with a prior probability that an account is a bot and updates that probability using behavioural evidence.

The prototype considers:

- Account age
- Posts per day
- Followers
- Following
- Posting interval
- Profile completeness

The Bayesian-style calculation produces a posterior probability representing the estimated likelihood of automated activity.

## Bayesian Model

The prototype uses:

```text
Prior Odds = P(Bot) / P(Human)

Posterior Odds =
Prior Odds × Evidence Likelihood Ratio

Posterior Probability =
Posterior Odds / (1 + Posterior Odds)
```

The current prototype uses predefined likelihood ratios for different behavioural signals.

## Classification

| Probability | Classification |
|---|---|
| 0% – 39% | More Likely Human |
| 40% – 69% | Needs Further Review |
| 70% – 100% | Likely Automated / Suspicious |

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bayesian Inference
- Client-side computation

## Project Structure

```text
social-media-bot-detection-bayesian/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally

```bash
cd social-media-bot-detection-bayesian
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Live Demo

[**Open BotShield Live Demo →**](https://srilekhashanmugam.github.io/social-media-bot-detection-bayesian/)

## Future Enhancements

- Machine Learning based bot classification
- Real social media API integration
- NLP-based post analysis
- Network and follower graph analysis
- Behavioural anomaly detection
- Real-time monitoring dashboard
- Explainable AI based detection
- Large-scale dataset training

## Project Disclaimer

This is an educational prototype. It does not access or monitor real social media accounts and should not be considered a definitive bot detection system.

## Developer

**Srilekha S**  
BTech AI & Data Science  
Prathyusha Engineering College
