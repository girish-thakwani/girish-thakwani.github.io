---
layout: page
title: "ZulipGPT: LLM Integration for Chat Summarization in Open-Source Messaging"
description: Privacy-safe chat and inbox summarization for the Zulip open-source messaging platform
importance: 3
category: projects
github: 
related_publications: false
---

## Overview

ZulipGPT adds chat and inbox summarization to **Zulip**, an open-source messaging platform, with privacy and latency treated as first-class constraints rather than afterthoughts. The work was shipped into the actual Zulip codebase.

## Highlights

- **Shipped summarization into a real product.** Added chat and inbox summaries with topic-drift detection and citation-backed prompts, so summaries stay grounded in real messages and resist prompt injection.
- **Privacy before inference, not after.** Built a deterministic identity-masking pipeline that swaps real identities for keyed pseudonyms before anything reaches the model. Because the model never sees real identities, this is a stronger guarantee than scrubbing PII out of the output after the fact.
- **Fast enough to actually use.** Brought summarization latency under 15 seconds with trigger-based invocation, rolling context windows, and message batching.

## Why it matters

It shows a workable path to LLM features inside a live messaging system without sending raw user data to the model and without latency that breaks the flow of a conversation. Those two constraints are usually what block this kind of feature, and the project addresses both directly.

## Technical Stack

- **Platform:** Zulip (open-source)
- **Techniques:** LLM integration, privacy-preserving pre-processing, inference optimization
- **Tools:** Python, HuggingFace, structured prompting
