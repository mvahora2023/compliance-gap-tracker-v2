# executive-report-template.md

# Monthly Cybersecurity Compliance Executive Report — Template

---

**To:** IT Senior Leadership; Global Cybersecurity Risk Manager
**From:** GRC Analyst
**Date:** July 20, 2026
**Re:** Monthly Cybersecurity Regulatory Compliance Summary — June 2026
**Classification:** Internal Use — Portfolio Sample, No Real Utility Data

---

## 1. Compliance Posture Summary

Overall regulatory compliance across TSA and PUC requirements held steady at 84% this month, a two-point improvement over May driven primarily by closure of three overdue Access Control exceptions. The Audit-Readiness Score improved from 76 to 79 out of 100, reflecting both the compliance improvement and a reduction in stale (365+ day) requirement reviews following the completion of the Q2 Privileged Access Review.

- **Overall Compliance:** 84% (up from 82% in May)
- **Open Exceptions:** 11 (down from 14 in May)
- **Overdue Exceptions:** 2 (down from 5 in May)

## 2. Open Exceptions Summary — Top 5 by Risk Level

| Exception ID | Control Domain | Description | Risk Level | Days Open |
|---|---|---|---|---|
| EXC-0067 | Patch Management | OT asset unpatched pending vendor validation window | High | 110 |
| EXC-0071 | Network Segmentation | Level 1/Level 2 segmentation remediation in progress | High | 45 |
| EXC-0058 | Supply Chain | Third-party vendor risk assessment overdue for renewal | Medium | 62 |
| EXC-0074 | Access Control | MFA rollout incomplete for one remote access gateway | Medium | 28 |
| EXC-0066 | Awareness Training | OT-specific role-based training completion below 100% for one department | Low | 40 |

## 3. Remediation Progress

**Closed This Month:**
- REM-0219 — MFA enforced on primary VPN gateway (closed 12 days ahead of due date)
- REM-0224 — Vendor access revocation procedure formally documented (closed on time)
- REM-0227 — Q2 Privileged Access Review completed and evidence filed

**Currently Overdue:**
- REM-0231 — Manual/local control fallback procedure documentation (originating from Tabletop Exercise "Operation Lockout") — 15 days overdue, owner has requested a 30-day extension pending OT Engineering availability
- REM-0233 — SIEM integration for OT network switch logging — 8 days overdue, vendor licensing delay cited as root cause

## 4. Recommended Actions

- Approve the requested 30-day extension for REM-0231, conditioned on a documented interim manual-control briefing for compressor station operators within 2 weeks.
- Escalate the SIEM licensing delay behind REM-0233 to IT Operations leadership, as this remediation directly supports detection capability referenced in the most recent Tabletop Exercise After-Action Report.
- Schedule the Q3 Architecture Design Review cycle now, to ensure the Remote HMI Access Project's four Conditional Approval remediation items (MFA, session recording, SIEM integration, SL documentation) are validated well ahead of the next Biennial Cybersecurity Audit.

---

*This report is generated from the Compliance Gap Tracker v2 Power BI dashboard (Executive Summary and Exception and Gap Tracker pages) and reflects data as of the last refresh date shown on the dashboard.*
