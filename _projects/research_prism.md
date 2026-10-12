---
layout: page
title: "PRISM: Probing Routed Information Flow via Structured Multimodal Bottlenecks"
description: Hierarchical multimodal fusion study on CMU-MOSEI/MOSI
importance: 3
category: research
github: 
related_publications: false
---

## Overview

PRISM is a research project at **Carnegie Mellon University** that asks a practical question about multimodal models: where should audio, video, and text actually be combined, and how much fusion capacity is worth paying for? We studied how information moves through hierarchical fusion modules on the CMU-MOSEI and CMU-MOSI sentiment benchmarks.

## Highlights

- **A hierarchical fusion design beat the symmetric baseline by 2.7% (Acc2/F1).** Routing the modalities through a structured bottleneck, instead of fusing everything at once, made better use of the same budget.
- **Asymmetric fusion matched symmetric fusion with fewer parameters.** Fusing one modality into another reached the same accuracy as full symmetric fusion at lower cost, which is exactly the kind of trade-off that matters when a model has to ship.
- **More fusion capacity made things worse.** Scaling the bottleneck from 4 to 12 tokens dropped correlation by 6%, so the extra capacity was wasted rather than helpful.

## Why it matters

The findings give a concrete design rule for multimodal systems: spend parameters on where and how you fuse, not on how much. A small, well-placed bottleneck can match or beat a larger one, which keeps models cheaper to train and serve.

## Keywords

Multimodal fusion, routed information flow, CMU-MOSEI, CMU-MOSI.
