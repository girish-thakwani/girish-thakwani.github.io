---
layout: page
title: Real-Time Movie Recommendation Platform
description: Low-latency movie recommender with automated retraining, monitoring, and A/B testing
importance: 1
category: projects
github: 
related_publications: false
---

## Overview

A production-style movie recommendation service built at **CMU** that serves recommendations over a live stream of user interactions, with retraining, evaluation, and monitoring automated end to end. The project was less about a single model and more about everything around it that keeps a recommender healthy once it is live.

## Highlights

- **Low-latency serving.** Trained an SVD collaborative-filtering model on roughly 200K Kafka interactions and served it behind a Flask API under 50 ms, containerized with Docker and retrained automatically every 3 days.
- **Handled cold start, and proved it.** Combined interaction and content signals into a hybrid cold-start strategy that reached 85%+ coverage on new users, and an A/B test showed it lifted NDCG@10 by 8%.
- **Measured what shipped.** Built a pipeline with schema validation, drift detection, and offline and online evaluation (NDCG@10 = 0.52, HR@10 = 0.68), wired into CI/CD at about 82% test coverage.
- **Watched it in production.** Set up a dashboard tracking availability above 99%, model accuracy, infrastructure cost, and data drift.

## Why it matters

The system is built the way a real recommender has to be: it keeps serving under load, retrains on fresh data on its own, and surfaces problems through monitoring and experiments before users feel them. The cold-start win is backed by an A/B test rather than an assumption, which is the difference between a demo and something you can trust in production.

## Technical Stack

- **Data & serving:** Kafka, Flask, Docker
- **Modeling:** SVD collaborative filtering, hybrid cold-start design
- **Tooling:** Python, Pandas, CI/CD, monitoring dashboards
