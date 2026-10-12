---
layout: page
title: "SteelRAG: Hybrid Sparse-Dense Retrieval over a Crawled Local Knowledge Corpus"
description: Hybrid BM25 + dense retrieval over a curated local corpus
importance: 2
category: projects
github: 
related_publications: false
---

## Overview

SteelRAG is a **CMU** project that builds a hybrid sparse-dense retrieval system over a crawled knowledge corpus, aimed squarely at answering the questions an existing system kept getting wrong.

## Highlights

- **Built the corpus around the gaps.** Scraped a 5,334-document corpus from 20+ sources across three targeted rounds, guided by an analysis of about 117 question clusters the system could not answer. Expanding the corpus alone improved the combined F1 and LLM-judge score by 6.8 points.
- **Hybrid retrieval beat dense-only.** Implemented BM25 (bm25s), FAISS with all-MiniLM-L6-v2 (384-dim), and Reciprocal Rank Fusion from scratch; the hybrid setup outperformed dense-only retrieval by 4.46% across F1, Recall, ROUGE-L, and LLM Judge.
- **Made indexing cheap enough to iterate.** Running Qwen2-7B-Instruct on a Modal A10G GPU with batched embedding cut index build time from 3 hours to under 15 minutes, and halving the chunk size from 200 to 100 words added 1.40% F1 with no loss in recall.

## Why it matters

Most of the gains came from fixing the data and the retrieval rather than reaching for a bigger model, and the faster index build turned each experiment from an afternoon into a coffee break. That speed is what made the gap-driven approach practical to run.

## Technical Stack

- **Retrieval:** BM25 (bm25s), FAISS, Reciprocal Rank Fusion
- **Models:** all-MiniLM-L6-v2, Qwen2-7B-Instruct
- **Infra:** Modal A10G GPU, Python
