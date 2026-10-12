---
layout: page
title: "ScleraNext: Lightweight CNN Segmentation for Real-Time Biometric Identification"
description: Real-time iris/retinal segmentation optimized for edge deployment
importance: 2
category: research
github: 
related_publications: false
---

## Overview

ScleraNext is a collaboration with the **University of Ljubljana** to make iris and retinal segmentation fast enough to run on phones and IoT devices for biometric identification, where the segmentation step is usually what slows everything down.

## Highlights

- **Cut inference latency by 73%.** Replaced a cascaded two-stage segmentation CNN with a single compact model, which made real-time segmentation feasible on edge hardware instead of a server.
- **Picked the architecture on evidence, not defaults.** Benchmarked YOLO, U-Net, MobileNet, and DenseNet on the accuracy versus latency trade-off and settled on a streamlined U-Net-based model that held accuracy while being far cheaper to run.

## Why it matters

Running segmentation on-device removes the round trip to a server, which lowers latency and keeps biometric data local rather than shipping it off the phone. That combination is what makes the system usable for real-time identification on phones and embedded sensors.

## Keywords

Biometric identification, CNN segmentation, edge deployment, University of Ljubljana.
