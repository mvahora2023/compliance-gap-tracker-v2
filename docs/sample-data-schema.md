# sample-data-schema.md

# Compliance Gap Tracker v2 — Sample Data Schema

Column definitions for each table in the data model. All examples are illustrative placeholders for a fictional utility ("Keystone Gas & Electric") and contain no real compliance data.

---

## Table: Requirements

| Column Name | Data Type | Description | Example Value |
|---|---|---|---|
| RequirementID | Text (Primary Key) | Unique identifier for the regulatory requirement | TSA-014 |
| RegulatorySource | Text | Which regulator the requirement originates from | TSA |
| ControlDomain | Text | Governance category the requirement belongs to | Access Control and Credential Management |
| Description | Text | Full text description of the requirement | "MFA required for all remote privileged access" |
| Status | Text | Current compliance status | Partial |
| Owner | Text | Individual accountable for the requirement | J. Alvarez, IT Security Manager |
| LastReviewDate | Date | Date the requirement was last formally reviewed | 2026-05-12 |
| NextReviewDate | Date | Scheduled next review date | 2026-11-12 |
| EvidenceArtifactID | Text (Foreign Key) | Link to the primary evidence artifact for this requirement | EVD-0142 |

## Table: Evidence

| Column Name | Data Type | Description | Example Value |
|---|---|---|---|
| EvidenceArtifactID | Text (Primary Key) | Unique identifier for the evidence artifact | EVD-0142 |
| RequirementID | Text (Foreign Key) | Requirement this evidence supports | TSA-014 |
| ArtifactName | Text | Descriptive name of the artifact | "Privileged Access Review Q2 2026" |
| FileLocation | Text | Storage path/URL for the artifact | /grc/access/privileged-access-review-2026Q2.xlsx |
| Owner | Text | Individual who produced/maintains the artifact | J. Alvarez |
| VersionOrDate | Text | Version number or effective date of the artifact | 2026-Q2 |
| Status | Text | Readiness status of the artifact | Ready |

## Table: Exceptions

| Column Name | Data Type | Description | Example Value |
|---|---|---|---|
| ExceptionID | Text (Primary Key) | Unique identifier for the exception | EXC-0067 |
| ControlDomain | Text | Control domain the exception relates to | Patch Management |
| Description | Text | Description of the deviation from policy/standard | "OT asset CS-ALPHA-HMI-01 unpatched pending vendor validation window" |
| RiskLevel | Text | Assessed risk level of the exception | High |
| OpenDate | Date | Date the exception was opened | 2026-04-01 |
| DueDate | Date | Target closure date | 2026-06-30 |
| Status | Text | Current status | Open |
| Owner | Text | Individual accountable for closure | R. Chen, IT Operations Manager |

## Table: Remediations

| Column Name | Data Type | Description | Example Value |
|---|---|---|---|
| RemediationID | Text (Primary Key) | Unique identifier for the remediation item | REM-0231 |
| RequirementID | Text (Foreign Key) | Related requirement, if applicable | TSA-014 |
| Source | Text | Origin of the finding driving this remediation | Tabletop Exercise AAR |
| FindingDescription | Text | Description of the underlying finding | "No documented manual/local control fallback for HMI unavailability" |
| Owner | Text | Individual accountable for remediation | M. Torres, OT Engineering Lead |
| OpenDate | Date | Date the finding/remediation was logged | 2026-03-15 |
| DueDate | Date | Target closure date | 2026-06-15 |
| ClosureDate | Date (nullable) | Actual date closed, if applicable | (blank if still open) |
| Status | Text | Current status | Open |

## Table: Calendar

| Column Name | Data Type | Description | Example Value |
|---|---|---|---|
| Date | Date (Primary Key) | Calendar date | 2026-07-20 |
| Year | Whole Number | Calendar year | 2026 |
| MonthNumber | Whole Number | Numeric month | 7 |
| MonthName | Text | Month name | July |
| Quarter | Text | Fiscal/calendar quarter | Q3 |
| DayOfWeek | Text | Day of week name | Monday |
