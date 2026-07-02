# SHIELD-RCA — Self‑Healing Cyber Networks with Multi‑Agent AI

**Detection → Root‑Cause Analysis → Safe Autonomy (Cloud–Edge)**

This repository contains code and configs for SHIELD‑RCA, a framework that fuses cross‑layer telemetry into a dynamic dependency‑graph, detects anomalies, localizes root‑causes, and executes **constrained** remediation plans with policy/compliance guards and full audit logs.

> **Paper:** Ibitoye, J. *Self‑Healing Cyber Networks with Multi‑Agent AI: End‑to‑End Root‑Cause Analysis and Autonomous Recovery in Cloud–Edge Environments* (submission under review).  
> **Author:** Joshua Seyi Ibitoye (ORCID: 0009-0006-2355-5166)

## Quick start
```bash
# 1) Create and activate an environment (conda recommended)
conda env create -f environment.yml
conda activate shield-rca.

# 2) Run a smoke test (no datasets required)
python scripts/run_pipeline.py --config configs/default.yaml --mode smoke

# 3) Run example IDS benchmark (update paths in configs/default.yaml)
python scripts/run_pipeline.py --config configs/default.yaml --mode eval_ids
```

## Datasets
We use public datasets: **UNSW‑NB15**, **CSE‑CIC‑IDS2018**, **BoT‑IoT**, **TON_IoT**.  
Update the paths in `configs/default.yaml`. Links are listed in `docs/datasets.md`.

## Architecture
- **Sentinel** — hybrid anomaly detection (change‑point + representation learning)
- **Causor** — root‑cause analysis on the dynamic graph (temporal + graph‑based)
- **Planner** — constrained remediation (quarantine/rollback/reroute/autoscale)
- **Guardian** — safety, policy & compliance (blast‑radius checks)
- **Scribe** — audit logging and evidence bundle.

![Graphical abstract](docs/Graphical_Abstract_SHIELD_RCA.png)

## Reproducibility
- Fixed seeds and version‑pinned deps (see `environment.yml`).
- All configs live in `configs/`.
- Results + logs are stored under `outputs/` with run IDs.

## How to cite
```
Ibitoye, J. SHIELD‑RCA: Self‑Healing Cyber Networks with Multi‑Agent AI (2025). 
Repository: https://github.com/jsibitoye/SHIELD-RCA
```
(Replace with journal citation and Zenodo DOI after acceptance.)

## License
MIT (see `LICENSE`).
