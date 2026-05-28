# Prompting Foundations - 1

This lab covers two practical ideas:

- curating open tabs so that Copilot sees the right context
- choosing a prompt style that matches the coding task

The work is split into three live demos followed by one exercise.

---

# Live Demo 1 - Workspace Context and Schema Awareness

## Overview

- In this demo, you will show how Copilot changes its output when the workspace includes the correct schema file.

You will work with these files:

| Item | Purpose |
|---|---|
| `module1-demo` | The VS Code workspace for the demo |
| `db.js` | The file where Copilot generates code |
| `schema.sql` | The source of truth for the user table columns |

## Prep

   
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
3. Keep `db.js` open.
4. Remove the previous generated output from `db.js`.

## Step 3: Generate the function again with schema context

Run Copilot again with this prompt:

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

# Live Demo 2 - Signal, Noise, and Curated Tabs

## Overview

In this demo, you will show how a broad prompt can drift toward the wrong files when the workspace contains noisy context.

## Prep

For the first run:

1. Copy `legacy_v1_backup.sql` and `scratchpad.txt` into `module1-demo`.
2. Move `schema.sql` outside the current folder.
3. Open `db.js`, `legacy_v1_backup.sql`, and `scratchpad.txt`.

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

Also check for generic fields or inconsistent assumptions that do not match the current schema.

## Expected Outcome

Copilot may anchor on the wrong file because the prompt is broad and the workspace includes competing signals.

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

The suggestion should align more closely with the current schema because the prompt is more specific and the open tabs are cleaner.

---

# Live Demo 3 - Prompting Techniques

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

Run:

```text
Create a third class for 'UserNotFoundError' using the same pattern, but not as a comment
```

### Review Criteria

Check whether the generated class:

- extends `Error`
- uses the same constructor pattern
- assigns an error code
- follows the same style as the two examples

## Part B: Chain-of-Thought prompting

### Step 1: Reset the file

1. Clear `db.js`.
2. Keep `schema.sql` open.

### Step 2: Ask for a plan before code

Run:

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

## Part C: Constrained prompting

### Step 1: Add acceptance criteria

Paste this block into `db.js`:

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

Ask Copilot:

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

## Manual Verification

After each prompting technique:

1. Compare the result against the prompt or acceptance criteria.
2. Reject outputs that add fields, skip constraints, or use the wrong schema names.
3. Point out how the prompt style changed what was easy to review.

---

# Exercise - The Tale of Two Prompts

## Exercise Overview

This exercise compares a broad prompt with an acceptance-criteria-driven prompt for the same task: updating a user's clearance level.

You will use:

- `db.js`
- `schema.sql`
- `SecurityPolicy.ts`

## Part A: Run the broad prompt

### Step 1: Prepare the files

1. Open `db.js` and `schema.sql`.
2. Create `SecurityPolicy.ts` in `module1-demo`.
3. Add this code:

```typescript
export const ClearanceRules = {
  MIN_LEVEL: 1,
  MAX_LEVEL: 5,
  REQUIRES_AUDIT_LOG: true,
  ERROR_CODE: "INSUFFICIENT_PRIVILEGE"
};
```

### Step 2: Run Prompt A

Store the generated output so you can compare it with Prompt B later.

```text
Write a function to update a user's clearance level.
```

### Review Criteria

Check whether the result:

- updates `internal_clearance_level`
- uses a parameterized query
- handles user-not-found

Also note what is missing:

- min/max validation from `SecurityPolicy.ts`
- audit logging behavior
- explicit validation response behavior

## Part B: Run the acceptance-criteria prompt

### Step 1: Reset the file

Clear the previous output from `db.js`.

### Step 2: Add the AC block

Paste this block into `db.js`:

```javascript
/**
 * AC - Update Clearance:
 * 1. Use internal_clearance_level from #schema.sql.
 * 2. Follow #SecurityPolicy.ts Min/Max levels.
 * 3. Use parameterized queries for pg.
 * 4. Return a 400 status if validation fails.
 * 5. Log the change only if REQUIRES_AUDIT_LOG is true.
 */
```

### Step 3: Run Prompt B

Select the AC block and run:

```text
Reason through how #SecurityPolicy.ts changes validation for #schema.sql, then implement the function following all 5 AC points.
```

## What a Correct Answer Should Include

The stronger prompt should produce code that:

- uses `internal_clearance_level`
- enforces `MIN_LEVEL` and `MAX_LEVEL`
- uses parameterized queries
- returns a `400` status for validation failures
- logs the change only when `REQUIRES_AUDIT_LOG` is `true`

## Comparison Questions

Use these questions to review the two outputs:

1. Which requirements were only satisfied by Prompt B?
2. Did Prompt A produce reasonable code that still missed project rules?
3. Which output is easier to validate against explicit acceptance criteria?

## Expected Takeaway

Prompt A is broad and leaves requirements implied.

Prompt B encodes the contract up front, making the generated output easier to review for correctness.
