# Module 1- Prompting Foundations - 1

## Lab Guide

This guide contains the Lab walkthroughs and the activity instructions for Module 1. Follow each lab task alongside the instructor in VS Code. Refer to this document during the session whenever you need to revisit a prompt, a tab list, or a check.

> *LLM outputs are non-deterministic - your outputs may differ from what the instructor or this guide shows. Treat the references here as expected behavior, not as exact matches.*

> **Note for learners**: 
This lab uses the branch 'module-1-demo’

This lab covers two practical ideas:

- curating open tabs so that Copilot sees the right context
- choosing a prompt style that matches the coding task

The work is split into three live demos followed by one exercise.

---

# Lab 1 - Workspace Context and Schema Awareness

## Overview

- In this demo, you will show how Copilot changes its output when the workspace includes the correct schema file.
- Clone the repo 

- we will work with the following files:

| Item | Purpose |
|---|---|
| `module1-demo` | The VS Code workspace for the demo |
| `db.js` | The file where Copilot generates code |
| `schema.sql` | The source of truth for the user table columns |

- Keep all other files like `legacy_v1_backup.sql` and `scratchpad.txt` outside the workspace

## Tab Hygiene

   
1. Open `db.js`.
2. Keep `schema.sql` outside the workspace for the first run.

## Step 1: Generate code without schema context

Ask Copilot to generate the insert function with the following prompt:

```text
Write a Node.js function using pg to insert a new user.
```

## Review Criteria

Check whether Copilot guessed generic fields such as:

- `name`
- `email`
- `age`

Reject the output if it does not align with the real schema.

## Expected Outcome

The code should look reasonable but rely on guessed column names because the schema file was not available.

## Step 2: Add the schema file to the workspace

1. Add `schema.sql` to the `module1-demo` workspace.
2. Open `schema.sql` in VS Code.
3. Keep `db.js` open in VS Code.
4. Remove the previous generated output from `db.js`.

## Step 3: Generate the function again with schema context

Run Copilot again with the following prompt:

```text
Write a Node.js function using pg to insert a new user using #file:schema.sql.
```

## Review Criteria

Check whether Copilot now uses the real schema fields:

- `full_name`
- `email_address`
- `account_status`
- `internal_clearance_level`

Accept the output only if the generated code clearly follows the schema.

## Why This Tab Setup Matters

- Open, relevant files create signal.
- Missing schema context forces Copilot to guess.
- The same task produces different output when the visible workspace changes.

---

# Lab 2 - Signal, Noise, and Curated Tabs

## Overview

In this demo, we will show how a broad prompt can drift towards the wrong files when the workspace contains noisy context.

## Tab Hygiene

For the first run:

1. Add back `legacy_v1_backup.sql` and `scratchpad.txt` into `module1-demo`.
2. Move `schema.sql` outside the workspace.
3. Open `db.js`, `legacy_v1_backup.sql`, and `scratchpad.txt` in VS Code.

## Step 1: Run a broad prompt with noisy context

Clear any previous generated code from `db.js`, then run the following prompt:

```text
Write a function to save a user based on table definition.
```

## Review Criteria

Check whether the generated output uses older or mixed fields such as:

- `user_id`
- `login_name`
- `pwd_hash`

- Also check for generic fields or inconsistent assumptions that do not match the current schema.

## Expected Outcome

- Copilot may anchor on the wrong file because the prompt is broad and the workspace includes competing signals.
- Following can be noticed in the generated output
  - older schema fields such as user_id, login_name, or pwd_hash
  - generic user fields
  - mixed assumptions that do not match the current schema

- Vague prompts result in Copilot relying on entire workspace context. Since LLMs are non-deterministic, always validate the output—even if it correctly leverages schema.sql to ensure accuracy

## Step 2: Curate the open tabs

1. Close unrelated files.
2. Open only `db.js` and `schema.sql`.
3. Remove the previous generated output from `db.js`.

## Step 3: Ask again with a more specific prompt

Run:

```text
Write a production-ready Node.js function to insert a user based on schema.sql.
```

## Review Criteria

Check whether the new suggestion uses:

- `full_name`
- `email_address`
- `account_status`
- `internal_clearance_level`

Accept the output only if it is easier to review against the current schema and avoids the legacy fields.

## Expected Outcome

- The suggestion should align more closely with the current schema because the prompt is more specific and the open tabs are cleaner.

- Note: The generated output may slightly vary due non deterministic nature of LLM and less informative prompt
---

# Lab 3 - Prompting Techniques

## Overview

This demo shows three prompt styles:

- few-shot prompting
- Chain-of-Thought prompting
- constrained prompting

Keep `db.js` active and `schema.sql` open unless the step says otherwise.

## Part A: Few-shot prompting

### Step 1: Provide examples

Paste these examples into `db.js`:

```text
// Example 1: class DatabaseError extends Error { constructor(msg) { super(msg); this.code = 'DB_ERR'; } }
// Example 2: class ValidationError extends Error { constructor(msg) { super(msg); this.code = 'VALID_ERR'; } }
```

### Step 2: Ask Copilot to continue the pattern

- Open Ask in Chat with Cmd+I or Ctrl+I and use the following prompt

```text
Create a third class for 'UserNotFoundError' using the same pattern, but not as a comment
```

### Review Criteria

- Check whether the generated class:

- extends `Error`
- uses the same constructor pattern
- assigns an error code
- follows the same style as the two examples

## Expected Outcome

- Copilot creates `UserNotFoundError` function by following the two pattern examples.

- The generated class uses the same structure, extends Error, and assigns an error code.

- Note: The generated output may slightly vary due to non deterministic nature of LLM and less informative prompt

## Part B: Chain-of-Thought prompting

- Next, we will use Chain-of-Thought prompting for a small user-status lookup.

- The task is to find a user by email_address and return the user’s name, email, and account status.

### Step 1: Reset the file

1. Clear `db.js`.
2. Keep `schema.sql` open.

### Step 2: Ask for a plan before code

- Paste the prompt below into Copilot Chat:

```text
Before writing code, give a short 3-step plan.

Then write a Node.js `pg` function named `getUserStatus(pool, emailAddress)` using `#schema.sql`.

Find the user by `email_address`, return `null` if not found, and return the user’s name, email, and account status if found.

Use a parameterized query.
```

### Review Criteria

Check whether the response has two parts:

- a short 3-step plan
- the generated `getUserStatus` function

Also confirm that the code:

- filters by `email_address`
- returns `null` when no user is found
- returns the requested fields
- uses a parameterized query

## Expected Outcome

- Copilot first outlines a short lookup plan.

- The plan covers finding the user by `email_address`, handling the no-match case, and returning the requested status details.

- The generated `getUserStatus` function then follows the plan using a parameterized query and schema fields.

- Note: The generated output may slightly vary due to non deterministic nature of LLM and less informative prompt


## Part C: Constrained prompting

- Finally, we will use constrained prompting for a secure clearance-user lookup.

- The task is to retrieve a user by email_address, check internal_clearance_level, and return only the allowed fields.

### Step 1: Add acceptance criteria

- Paste the following block into `db.js`:

```javascript
/**
 * AC for getClearanceUser:
 * 1. Only select full_name and account_status.
 * 2. Must filter by email_address.
 * 3. CONSTRAINT: Throw Error if internal_clearance_level is not returned.
 * 4. SECURITY: Use parameterized queries.
 */
```

### Step 2: Run the constrained prompt

- Open Ask in Chat and paste the prompt below:

```text
Implement `getClearanceUser(pool, emailAddress)` using Node.js `pg` and `#schema.sql`.

Select `full_name`, `account_status`, and `internal_clearance_level` by `email_address`.

Return `null` if no user is found. Throw an Error if `internal_clearance_level` is missing.

Return only `full_name` and `account_status`.
```

### Review Criteria

Accept the output only if it:

- filters by `email_address`
- uses parameterized values
- does not use `SELECT *`
- checks `internal_clearance_level`
- returns only `full_name` and `account_status`

## Expected Outcome

- Copilot generates `getClearanceUser` from the selected acceptance criteria.

- The query filters by `email_address`, uses parameterized values, and avoids SELECT *.

- The function checks internal_clearance_level, then returns only full_name and account_status.

- Note: The generated output may slightly vary due to non deterministic nature of LLM and less informative prompt

---

# Exercise - The Tale of Two Prompts

- This exercise compares a broad prompt with an acceptance-criteria-driven prompt for the same task: updating a user's clearance level.
- Let's consider two prompts prompt A and Prompt B

## Task 1: Prompt A
- For the Prompt A, Start by opening db.js, schema.sql in VS Code.
- Create a new file `SecurityPolicy.ts` in module1-demo and add the following code:

```typescript
export const ClearanceRules = {
  MIN_LEVEL: 1,
  MAX_LEVEL: 5,
  REQUIRES_AUDIT_LOG: true,
  ERROR_CODE: "INSUFFICIENT_PRIVILEGE"
};
```
- Now run the following Prompt A in the chat and store the output in a .txt file to be able to compare it against Prompt B output
```text
Write a function to update a user's clearance level.
```
## Task 2: Prompt B
- For the Prompt B, Clear the previous output from db.js.

- Paste the following acceptance-criteria block below in db.js file:
```
/**
 * AC - Update Clearance:
 * 1. Use internal_clearance_level from #schema.sql.
 * 2. Follow #SecurityPolicy.ts Min/Max levels.
 * 3. Use parameterized queries for pg.
 * 4. Return a 400 status if validation fails.
 * 5. Log the change only if REQUIRES_AUDIT_LOG is true.

 */
 ```
- With the block set and selected, use the Ask in chat option to run Prompt B:
```
Reason through how #SecurityPolicy.ts changes validation for #schema.sql, then implement the function following all 5 AC points.

```

