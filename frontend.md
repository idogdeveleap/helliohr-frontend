# [1] Exercise 1 — Candidate Profile Viewer & Diff

## Context

This is the **first hands-on exercise** of the course and the first concrete capability of the *[Hellio HR](0_hellio_hr)* system.

HR professionals and interviewers regularly review candidate CVs in inconsistent formats (PDF, Word, email attachments). Comparing versions, understanding what changed, and extracting a clear picture of a candidate is time-consuming and error-prone.

This exercise establishes the **primary user interface** for Hellio HR and sets expectations for:

- clarity over cleverness
- traceability over automation
- humans in control

All later exercises will build on this interface and data model.

---

## Learning Objectives

By the end of this exercise, participants should be able to:

- Design a clean UI for reviewing technical candidate profiles
- Separate *normalized candidate data* from *original source documents*
- Build an interface that is ready to be extended by intelligent backends later

A key objective is for you to have command of key Claude Code abilities, which are central to any coding agent:

 - The honing of work rules through claude.md to achieve fast and exact results
 - The application of custom commands for repetitive tasks
 - The addition of key MCP tools to access external data and manipulate extenal resources
 - The utilization of sub agents to create fine grained control on task oriented context

Make sure you go over the learning materials BEFORE you start using Claude Code


---

## Scope & Constraints

**In scope:**

- Candidate profile viewer (structured view)
- Side-by-side comparison of two candidates
- Reference links to original CV documents

**Out of scope (for this exercise):**

- Automatic CV parsing or extraction - do it manually using an agent such as ChatGPT
- Databases or persistence - Hardcode data as json. In a later excercise you will implement the backend.
- Authentication / authorization
- Any LLM or agent usage

This exercise is centered about Agent **USE**, programming AI enabled system will come later.  The goal is to build a strong foundation.

---

## Inputs

Provided to participants:

- A set of **mock candidate profiles** in PDF/Word form 2-3 of which you are expected to semi-manually normalize to json
- A set of job description files which you are expected to semi-manually normalize to json

## Expected Outputs

At the end of the exercise, participants should have:

- A web UI that includes:
  - Candidate screen
    - Lists all "Active" candidates + search & filter by name/position
    - Displays a candidate profile in a uniform structure
    - Displays 2 candidates side by side for comparison
    - Allows adding/removing positions to the candidate
    - Links or previews for the original CV files
  - Positions screen
    - Lists all "Open" positions
    - Displays position description
    - Lists all current candidates

This should be fully demo-able.

---

## Functional Requirements

- The system must display candidate profiles using a consistent schema
- Original CV documents must remain accessible and unchanged

---

## Non-Functional Requirements

- The UI should prioritize readability over density
- The implementation should be easily extensible to support:
  - additional profile fields
  - backend APIs
  - future agent-generated content
  - future addition of a "contextual chat" in both position and candidate screens

---

## Suggested Architecture / Hints

- Treat the candidate profile as a **pure data model**, independent of UI
- Consider normalizing experience, skills, and education as lists with stable identifiers with clear sorting to allow for easy comparison

---

## Common Pitfalls

- Not using git. START with git init and make it a habit to commit every working step!
- Hard-coding assumptions about profile shape
- Mixing UI concerns with data transformation logic
- Over-designing for features that are explicitly out of scope

---

## Validation & Self-Check

You should be able to confidently answer **yes** to the following questions:

- Can I explain, in plain language, the differences between two candidate profiles shown side by side?
- Does the UI still make sense if a candidate has:
  - very little experience?
  - many short roles?
  - overlapping roles?
- If I add a new field to the profile schema (e.g. certifications, languages), can I display it without reworking the entire UI?
- Could a non-technical HR person use this interface without explanation?

**Manual test suggestions:**

- Compare two versions of the *same* candidate and describe the changes verbally.
- Compare two *different* candidates for the same position and explain who looks like a better fit *based only on what is shown*.
- Remove one profile field from the data and verify the UI degrades gracefully.

If any of these feel difficult or unclear, treat that as a design signal — not an implementation bug.

---

## How This Connects Forward

The profile schema and UI you build here will be reused throughout the course.

In the next exercise, this data will be persisted, queried, and enriched — and later, analyzed and augmented by intelligent agents.

