---
layout: page
title: "Outcome-Aware Web Agents: Does Predicting Page Transitions Help VLM Action Selection?"
description: Controlled SFT study of outcome-aware supervision on Qwen3-VL for Multimodal Mind2Web
importance: 1
category: research
img: /assets/img/idl_images/architecture.png
github: 
related_publications: false
---

## Overview

This was a **CMU** team project (Team 16) built around one narrow question: if you teach a vision-language web agent **what changes on the page after each action**, does it actually pick better actions? Prior outcome-aware methods bundle that signal with costly inference-time simulation or with several other training objectives, so it is hard to tell whether the outcome signal itself is doing any of the work. We isolated it.

We fine-tuned **Qwen3-VL-8B-Thinking** with **LoRA** on **Multimodal Mind2Web** under two conditions that differ in exactly one thing: the training target. The action-only condition learns to predict the next action; the outcome-aware condition predicts the action plus a structured transition label (transition type, changed region, change magnitude, confidence). Architecture, the 6,445 matched training examples, and every hyperparameter are held constant, so any difference traces back to the outcome supervision alone.

{% include figure.liquid path="assets/img/idl_images/architecture.png" class="img-fluid rounded z-depth-1" caption="The setup. Multimodal input (screenshot, cleaned HTML, instruction, candidate actions) feeds a frozen Qwen3-VL-8B-Thinking with LoRA adapters. The only thing that changes between the two conditions is the supervision target: an action index, or that same index plus the transition label." %}

## Highlights

**Fine-tuning helps, the extra signal does not.** Both conditions nearly doubled Step Success Rate over the zero-shot baseline on the unseen-website split (31.99% to 62.32% for action-only, 59.76% for outcome-aware). The two conditions land within bootstrap variance of each other, so we report outcome supervision honestly as a **null result** rather than a win, and the pattern held across all three Mind2Web test splits.

{% include figure.liquid path="assets/img/idl_images/results_metrics_barchart.png" class="img-fluid rounded z-depth-1" caption="Element Accuracy, Operation F1, and Step Success Rate across all ten configurations on the unseen-website split. Both fine-tuned conditions tower over the zero-shot and prompting baselines, but the action-only and outcome-aware bars sit almost on top of each other." %}

To rule out the obvious objection that the outcome-aware model was simply undertrained, we checked the optimization itself.

{% include figure.liquid path="assets/img/idl_images/sft_loss_curves.png" class="img-fluid rounded z-depth-1" caption="Training and evaluation loss for both SFT conditions. Both converge cleanly, so the missing outcome-aware gain is a genuine null result rather than an artifact of poor training. The two eval-loss curves are not directly comparable, since the outcome-aware target carries extra tokens, which is exactly why we judge the conditions on the action metrics above and not on loss." %}

**Why it does not help.** Error analysis surfaced a clean failure mode we called a terminal-action bias: the outcome-aware model leans toward terminal-looking actions, for example clicking a child menu item instead of hovering the parent that reveals it. A hover-then-click and a direct click reach the same final page state, so a categorical outcome label cannot tell them apart.

**Baselines and ablations.** Confirmed that HTML and screenshot inputs are both necessary, and that few-shot and chain-of-thought prompting actually hurt under log-likelihood scoring (AXTree dropped 13.6pp, few-shot 4.6pp, CoT 10.7pp). Those gaps are what pushed the team toward fine-tuning in the first place.

## Why it matters

The clean negative result is the point. Under a controlled comparison, adding categorical outcome labels did not help, so anyone tempted to bolt this signal onto an agent can skip it and spend the effort on richer outcome representations instead. The terminal-action bias we found also explains how a coarse outcome label can quietly nudge an agent toward the wrong action.

## Technical Stack

- **Model:** Qwen3-VL-8B-Thinking, LoRA (r=64, alpha=128)
- **Data:** Multimodal Mind2Web, transition labels generated with Gemma 3 27B-IT
- **Training & eval:** HuggingFace Transformers, length-normalized log-likelihood scoring

## Keywords

Web agents, vision-language models, LoRA fine-tuning, outcome supervision, Multimodal Mind2Web, Qwen3-VL.
