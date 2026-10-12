---
layout: page
title: "Multilingual Hallucination Probes: Do English Correctness Probes Transfer Across Languages?"
description: Zero-shot cross-lingual hallucination detection by probing Qwen2.5-7B hidden states
importance: 1
category: research
img: /assets/img/auc_best_by_method_stage_lang.png
github: 
related_publications: false
---

## Overview

This was a **CMU** team project on a safety gap that most hallucination research skips over: detection tools are built and tested almost entirely in English, while billions of people use LLMs in other languages with far fewer safeguards. We asked whether a **correctness probe** trained only on **English** hidden states of **Qwen2.5-7B-Instruct** can spot hallucinations in **Chinese, Thai, Vietnamese, and Indonesian** with no target-language supervision at all.

The idea sits at the intersection of two findings: correctness probes transfer across English tasks, and cross-lingual knowledge representations tend to converge in a model's deeper layers. If both hold at once, an English-trained probe should carry over to other languages. We trained linear (logistic regression) and nonlinear (MLP) probes on English MMLU hidden states and evaluated them fully zero-shot on the post-cutoff SeaExam and M3Exam benchmarks.

## Highlights

**Correctness is partly language-agnostic.** Every probe cleared its language-specific confidence baseline in all four target languages, which is the core evidence that the signal really lives in the representation rather than just echoing output probabilities. The best probe (a PyTorch MLP on post-answer features at layer 24) reached AUC-ROC of 0.704 on English, 0.677 Chinese, 0.663 Indonesian, 0.650 Vietnamese, and 0.641 Thai.

{% include figure.liquid path="assets/img/auc_best_by_method_stage_lang.png" class="img-fluid rounded z-depth-1" caption="Best-layer AUC for every probe across both feature stages (dark = post-answer, light = pre-answer) and all five languages. Bars clear the per-language confidence baseline (dashed line), and the post-answer, nonlinear probes lead throughout. This is the chart behind the headline numbers above." %}

**Where you read the hidden state matters more than which probe you use.** Probes taken after the model commits to an answer beat pre-answer probes for nearly every layer and language, which suggests that generating the answer consolidates the model's correctness state into something more universal. Swapping classifiers barely moved the needle by comparison: random forests landed within 0.01 AUC of the MLP, so the signal looks low-dimensional and the bottleneck is the representation, not the classifier.

{% include figure.liquid path="assets/img/pre_post_delta_heatmap.png" class="img-fluid rounded z-depth-1" caption="Post-answer minus pre-answer AUC per layer and language. Warm cells mark where reading the hidden state after the answer helps, which is almost everywhere, with the largest gains in the early-to-mid layers." %}

**The signal sharpens with depth, and transfer varies by language.** Reading the same probe at different layers shows the correctness signal is weak early and strengthens deeper in the network, with the target languages converging toward English after about layer 14. Chinese transfers best, since it shares a lot of Qwen2.5's pretraining, and Thai worst, and the gap tracks pretraining data volume more than language family. Across deeper layers the gap to English settles at a modest 0.03 to 0.08 AUC.

{% include figure.liquid path="assets/img/heatmap_auc_layer_lang.png" class="img-fluid rounded z-depth-1" caption="AUC by layer and language (logistic, post-answer); boxed cells mark each language's best layer. Deeper layers carry a stronger, more language-agnostic correctness signal, and Chinese stays closest to English." %}

**Data-light.** 30k English examples were enough for near-ceiling performance, and even 1.5k cleared 0.60 AUC across every language. Scaling to 45k gave no further gain and slightly overfit to English.

**Honest failure mode.** The probe's biggest blind spot is confident hallucinations: when the model is wrong but sure of itself (average confidence 0.87), its hidden state does not betray the error, so the probe misses it. It also confuses "the model does not know" with "the model is hallucinating," which points toward a three-way (correct, uncertain, hallucinating) labeling scheme for real deployment.

## Why it matters

If a single probe trained only on English can flag likely hallucinations in four other languages, you get a lightweight safety signal for languages that have no labeled data of their own, using one extra forward pass and no retrieval or per-language pipelines. That is most of the value for the many people who do not use these models in English.

## Method

- **Model:** Qwen2.5-7B-Instruct (4-bit quantized), hidden states read at the MLP input across all 28 layers
- **Probes:** logistic regression, MLP (sklearn and PyTorch, 3584 to 256 to 128 to 1), linear SVC, random forest
- **Labels:** stochastic resampling (10 samples, T=1.0) into correct, hallucination, and absence
- **Data:** train on English MMLU (fact-based subjects), evaluate zero-shot on SeaExam (Thai, Vietnamese, Indonesian) and M3Exam (Chinese)

## Keywords

Hallucination detection, multilingual LLMs, probing, cross-lingual transfer, interpretability, Qwen2.5, AI safety.
