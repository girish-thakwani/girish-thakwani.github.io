---
layout: page
title: "GraphAct: Graph-Structured Action Prediction for Web Agents"
description: A DOM graph transformer fused into Qwen3-VL with LoRA to fix element grounding on Multimodal Mind2Web
importance: 5
category: research
img: /assets/img/multimodal_images/modelarch.png
github: 
related_publications: false
---

## Overview

GraphAct is a **CMU** team project that started from a simple question: why do multimodal web agents still click the wrong button? Our failure analysis on **Multimodal Mind2Web** showed the bottleneck is not action prediction but **element grounding**. The model usually knows it should click, it just picks the wrong one of several near-identical candidates. The root cause is that most systems flatten the page DOM into text and hope a large model infers the structure. We make that structure explicit by treating the DOM as a graph.

We represent each page as a directed graph of DOM elements and fuse it into a frozen **Qwen3-VL-8B** backbone through a graph attention network and a lightweight gated cross-attention adapter, training only a small set of LoRA weights. The whole pipeline trains and runs inside a single 24GB GPU.

{% include figure.liquid path="assets/img/multimodal_images/modelarch.png" class="img-fluid rounded z-depth-1" caption="How it fits together. The page DOM is parsed into a graph and encoded by a 3-layer graph attention network, where each node is a 523-dim vector (a MiniLM text embedding plus a tag one-hot and a handful of structural features). A gated cross-attention adapter injects those node embeddings into the frozen Qwen3-VL-8B at an early decoder layer, and only the LoRA weights are trained to predict the action index." %}

## Highlights

**Grounding is the real bottleneck.** Across every baseline, action-type accuracy sat around 74 to 80% while element accuracy lagged far behind, so step success tracks element accuracy almost one to one. Fixing grounding is what moves the needle.

{% include figure.liquid path="assets/img/multimodal_images/plots23.png" class="img-fluid rounded z-depth-1" caption="Intrinsic metrics across ablations. Action accuracy (orange) barely moves whether or not the graph is present, while element and step accuracy collapse without it and jump back once the DOM graph is added. That contrast is the whole argument that grounding, not action choice, is the bottleneck." %}

**Explicit structure helps a lot.** Adding the DOM graph lifted element accuracy from 12.7% (fine-tuned Qwen with no graph) to 49.5%, and beat the strongest multimodal baseline (37.4%) by about 12 points, with step accuracy reaching roughly 41%. The graph variants stayed stable across hyperparameters once the structural signal was in.

{% include figure.liquid path="assets/img/multimodal_images/plots.png" class="img-fluid rounded z-depth-1" caption="Per-metric breakdown against the text-only baseline (dashed line). The DOM graph lifts element accuracy by about 37 points and step accuracy by about 30, while action accuracy was already near its ceiling. The task-accuracy panel sets up the catch that the next point picks up on." %}

**Step gains do not fully reach task success.** As the task-accuracy panel above shows, the best variant tops out at only 7.75%, because errors compound across long multi-step trajectories. Better per-step grounding is necessary but not sufficient for long-horizon reliability.

**Honest failure analysis.** A static graph snapshot at every step causes an anchor and fixation bias (the model re-selects a previously correct index), and cosine-similarity node pruning sometimes drops structurally critical but text-sparse nodes such as a hover-trigger menu item. We documented these with concrete step traces and proposed fixes like dynamic node masking and topology-aware retention.

## Why it matters

Treating the DOM as a graph instead of flat text goes straight at the part of web navigation that actually fails, which is grounding an action to the right element. It nearly quadrupled element accuracy over the no-graph model and beat strong multimodal baselines, while the capped task success is an honest reminder that fixing per-step grounding is necessary but not sufficient for reliable long-horizon agents.

## Technical Stack

- **Backbone:** Qwen3-VL-8B (frozen, 4-bit NF4 quantized), LoRA (r=8, alpha=16) on layers 7 to 9, 15 to 17, and 23 to 25
- **Graph:** 3-layer Graph Attention Network over DOM nodes, 523-dim node features (all-MiniLM-L6-v2 embedding + tag one-hot + structural cues)
- **Fusion:** tanh-gated cross-attention adapter projecting graph nodes into Qwen's hidden space, injected at decoder layer 8
- **Data & infra:** Multimodal Mind2Web, precomputed graph cache, single 24GB GPU

## Keywords

Web agents, graph attention networks, DOM graphs, vision-language models, LoRA, Multimodal Mind2Web, Qwen3-VL.
