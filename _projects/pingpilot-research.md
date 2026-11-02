---
layout: page
title: "PingPilot: Web Agents To Use DOM element As Graph Nodes For Action Prediction"
description: A DOM graph transformer fused into Qwen3-VL with LoRA to fix element grounding on Multimodal Mind2Web
importance: 5
category: research
img: /assets/img/multimodal_images/architecture_redesign.png
github: 
related_publications: false
---

## Overview

PingPilot investigates why multimodal web agents select the wrong page element even when they predict the appropriate action. Failure analysis on **Multimodal Mind2Web** identified **element grounding** — mapping an action to the correct DOM element—as the main bottleneck. Across baselines, action-type accuracy remained comparatively high, while element-selection errors limited successful execution. A likely contributing factor is that many systems serialize the Document Object Model (DOM) as text, obscuring the relationships between page elements.

To represent those relationships explicitly, PingPilot models each page as a directed graph whose nodes correspond to DOM elements. A three-layer Graph Attention Network (GAT) encodes the graph, and a gated cross-attention adapter injects the resulting node representations into a frozen **Qwen3-VL-8B** backbone. Low-Rank Adaptation (LoRA) weights are trained to predict the target action index while keeping the base model frozen. The training and inference pipeline fits on a single 24 GB GPU.

{% include figure.liquid path="assets/img/multimodal_images/architecture_redesign.png" class="img-fluid rounded z-depth-1" caption="System architecture: the page DOM is represented as a graph and encoded by a three-layer Graph Attention Network. Each node has a 523-dimensional feature vector composed of an all-MiniLM-L6-v2 text embedding, a tag one-hot encoding, and structural features. A gated cross-attention adapter projects node representations into Qwen3-VL-8B's hidden space at an early decoder layer. The base model remains frozen; LoRA weights are trained to predict the action index." %}

## Highlights

**Element grounding limits step-level performance.** Across the evaluated baselines, action-type accuracy was approximately 74–80%, but element accuracy was substantially lower. This gap indicates that models often identify what operation to perform but fail to identify the correct target element; step success therefore depends strongly on accurate grounding.

{% include figure.liquid path="assets/img/multimodal_images/plots23.png" class="img-fluid rounded z-depth-1" caption="Intrinsic metrics across ablations. Action-type accuracy changes relatively little when the graph is removed, whereas element accuracy and step accuracy fall substantially. Adding the DOM graph improves those grounding-dependent metrics, highlighting element selection as the primary bottleneck in these experiments." %}

**Explicit DOM structure improves element selection.** Adding graph representations increased element accuracy from 12.7% for fine-tuned Qwen without a graph to 49.5%. This result exceeded the strongest multimodal baseline (37.4%) by approximately 12 percentage points, while step accuracy reached about 41%. Graph-based variants also remained comparatively stable across the evaluated hyperparameter settings.

{% include figure.liquid path="assets/img/multimodal_images/plots.png" class="img-fluid rounded z-depth-1" caption="Per-metric comparison with the text-only baseline (dashed line). The DOM graph increases element accuracy by about 37 percentage points and step accuracy by about 30 points, while action-type accuracy changes comparatively little. Task-level accuracy remains lower, as discussed below." %}

**Improved step accuracy does not eliminate long-horizon failures.** Despite reaching approximately 41% step accuracy, the best variant achieved 7.75% task success. In multi-step tasks, errors at individual steps can accumulate and prevent completion. The results show that improved element grounding is valuable, but by itself does not ensure reliable end-to-end execution.

**Failure analysis identifies limitations in graph construction and pruning.** Reusing a static graph snapshot at every step was associated with anchor and fixation bias, in which the model reselected an index that had been correct earlier. Cosine-similarity-based node pruning could also remove structurally important but text-sparse elements, such as a menu item revealed by hovering. Step-level traces were used to analyze these failures and motivate potential improvements, including dynamic node masking and topology-aware node retention.

## Why it matters

Representing the DOM as a graph gives the model explicit access to relationships between page elements rather than requiring it to infer that structure from serialized text. In these experiments, graph representations nearly quadrupled element accuracy over the no-graph model and outperformed the strongest evaluated multimodal baseline. However, the lower task-success rate shows that better per-step grounding is only one part of building reliable agents for long-horizon tasks.

## Technical Stack

- **Backbone:** Qwen3-VL-8B (frozen, 4-bit NF4 quantized), LoRA (r=8, alpha=16) on layers 7 to 9, 15 to 17, and 23 to 25
- **Graph:** 3-layer Graph Attention Network over DOM nodes, 523-dim node features (all-MiniLM-L6-v2 embedding + tag one-hot + structural cues)
- **Fusion:** tanh-gated cross-attention adapter projecting graph nodes into Qwen's hidden space, injected at decoder layer 8
- **Data & infra:** Multimodal Mind2Web, precomputed graph cache, single 24GB GPU

## Keywords

Web agents, graph attention networks, DOM graphs, vision-language models, LoRA, Multimodal Mind2Web, Qwen3-VL.
