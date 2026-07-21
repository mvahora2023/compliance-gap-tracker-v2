# gap-tracker-v2-design-spec.md

# Compliance Gap Tracker v2 — Power BI Dashboard Design Specification

**Fictional Utility:** Keystone Gas & Electric
**Prepared By:** Mahmadarsh Vahora
**Purpose:** Functional specification for a Power BI compliance operations dashboard, upgrading the Phase 1 Excel-based TSA/PUC Compliance Tracker into a live operational reporting tool

---

## Dashboard Purpose and Audience

**Primary Audience:** IT Senior Leadership and the Global Cybersecurity Risk Manager — require a fast, executive-level view of overall compliance posture, trend direction, and anything currently overdue, without needing to interpret raw control-level detail.

**Secondary Audience:** GRC Analyst (operational user) — requires the detailed, drillable view needed to manage day-to-day requirement tracking, evidence collection, and exception remediation.

The dashboard is explicitly designed to serve the job description's requirement to "establish and track metrics for cybersecurity regulatory governance programs" and to "deliver regular risk and compliance metrics to IT senior leadership."

---

## Data Model Design

### Table List

| Table | Description |
|---|---|
| **Requirements** | One row per TSA and PUC regulatory requirement, with control domain, current status, owner, and evidence link |
| **Evidence** | Log of evidence artifacts produced against each requirement, with version, date, and location |
| **Exceptions** | Open cybersecurity exceptions (deviations from policy/standard), with risk rating and remediation status |
| **Remediations** | Gap-to-closure tracking records, linking findings (from audits, assessments, or exercises) to remediation owners and due dates |
| **Calendar** | Standard date dimension table supporting all time-based trend analysis |

### Key Relationships

- `Requirements[RequirementID]` → `Evidence[RequirementID]` (one-to-many: one requirement can have multiple evidence artifacts over time)
- `Requirements[RequirementID]` → `Remediations[RequirementID]` (one-to-many: a requirement can have multiple open or historical findings)
- `Exceptions[ControlDomain]` → `Requirements[ControlDomain]` (many-to-one: exceptions are grouped by the control domain they deviate from)
- `Calendar[Date]` → all fact tables' relevant date fields (one-to-many, standard star-schema date relationships)

### DAX Measure Definitions (Plain English)

1. **Overall Compliance % ** — Count of requirements marked "Compliant" divided by the total count of requirements excluding those marked "Not Applicable."
2. **Open Exceptions Count** — Count of all rows in the Exceptions table where Status equals "Open."
3. **Overdue Exceptions** — Count of open exceptions where the Due Date is earlier than today's date.
4. **Average Days to Remediate** — For closed exceptions only, the average number of days between the Open Date and the Closure Date.
5. **TSA Requirements Compliance %** — Same calculation as Overall Compliance %, filtered to only requirements where Regulatory Source equals "TSA."
6. **PUC Requirements Compliance %** — Same calculation as Overall Compliance %, filtered to only requirements where Regulatory Source equals "PUC."
7. **Requirements Reviewed in Last 90 Days** — Count of requirements where Last Review Date falls within the last 90 days of today.
8. **Stale Requirements** — Count of requirements where Last Review Date is more than 365 days ago, flagging items at risk of being audit-stale.
9. **Exceptions by Control Domain** — Count of open exceptions grouped by their associated Control Domain, used to drive the domain breakdown bar chart.
10. **Remediation Owner Workload** — Count of open remediation items grouped by assigned Owner, used to identify overloaded individuals ahead of the audit window.
11. **Findings Closure Rate (Rolling 6 Months)** — Count of remediation items closed in the last 6 months divided by the total count of remediation items opened in the same period.
12. **Audit-Readiness Score** — A weighted composite measure combining Overall Compliance %, inverse of Overdue Exceptions count, and inverse of Stale Requirements count, scaled to a 0-100 index for executive trend tracking.
13. **Evidence Freshness Ratio** — Count of evidence artifacts with a Version/Date within the last 12 months, divided by total evidence artifacts on file.
14. **New Exceptions Opened (Month-to-Date)** — Count of exceptions with an Open Date within the current calendar month.
15. **Critical/High Exceptions Open** — Count of open exceptions where Risk Level equals "Critical" or "High," surfaced separately for executive attention.
16. **Average Exception Age (Open Items)** — For currently open exceptions, the average number of days since the Open Date through today.
17. **Requirement Status Distribution** — Count of requirements grouped by Status (Compliant, Partial, Non-Compliant, N/A), used to drive the status donut/bar visuals.
18. **Month-over-Month Compliance Trend** — Overall Compliance % calculated independently for each of the last 6 calendar months, used to drive the trend line chart.
19. **Remediation On-Time Rate** — Percentage of closed remediation items that were closed on or before their originally assigned Due Date.
20. **TTX Findings Integration Count** — Count of open remediation items whose Source field indicates they originated from a Tabletop Exercise After-Action Report (linking to the companion [[utility-tabletop-exercise-program]] project).

---

## Report Pages

### Page 1 — Executive Summary
- KPI cards: Overall Compliance %, Open Exceptions Count, Overdue Exceptions, Audit-Readiness Score
- Trend sparkline: Month-over-Month Compliance Trend (last 6 months)
- "Last Updated" timestamp and data refresh indicator
- Callout tile: Critical/High Exceptions Open (highlighted in red if greater than zero)

### Page 2 — TSA Requirements Detail
- Matrix table of all 18 TSA SD requirements: Requirement ID, Description, Status, Evidence Artifact link, Owner, Days Since Last Review
- Conditional formatting: green (Compliant), amber (Partial), red (Non-Compliant), grey (N/A)
- Slicer: Control Domain

### Page 3 — PUC Requirements Detail
- Same structure as Page 2, scoped to the 12 PUC requirements
- Slicer: Control Domain

### Page 4 — Exception and Gap Tracker
- Stacked bar chart: Open exceptions by Control Domain
- Age histogram: Distribution of open exceptions by age bucket (0-30, 31-60, 61-90, 90+ days)
- Remediation Owner Workload bar chart
- Overdue heat map: Control Domain (rows) × Age Bucket (columns), shaded by count

### Page 5 — Trend and Metrics
- Line chart: 6-month rolling Overall Compliance % trend
- Bar chart: Monthly exception closure rate
- Line chart: Audit-Readiness Score over time
- KPI card: Remediation On-Time Rate

---

## Visual Design Guidance

**Color Scheme:**
- Compliant / Closed / On-Time → Green (#2E7D32)
- Partial / At-Risk → Amber (#F9A825)
- Non-Compliant / Overdue / Critical → Red (#C62828)
- N/A / Not Applicable → Grey (#9E9E9E)

**Visual Types:**
- KPI cards for top-line executive metrics (Page 1)
- Bar / stacked bar charts for control-domain breakdowns (Pages 2, 4)
- Line charts for all trend-over-time visuals (Page 5)
- Matrix tables for detailed requirement-level views (Pages 2, 3)
- Heat map matrix for the overdue-by-domain-and-age view (Page 4)

**Slicers (available globally where applicable):**
- Regulatory Body: TSA / PUC / All
- Control Domain
- Status: Compliant / Partial / Non-Compliant / N/A
- Owner
