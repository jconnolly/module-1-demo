# Exercise Solution - Prompting Foundations - 1

This file summarizes what learners should observe from the exercise outputs.

---

# Part A - Prompt A Output

Prompt used:

```text
Write a function to update a user's clearance level.
```

## Expected Characteristics

A reasonable Prompt A solution will usually:

- update `internal_clearance_level`
- use a parameterized `pg` query
- handle a missing user in some form

## Likely Gaps

Because Prompt A does not reference `SecurityPolicy.ts`, the output will usually miss some or all of the following:

- validation against `MIN_LEVEL`
- validation against `MAX_LEVEL`
- use of `ERROR_CODE`
- a `400` status for validation failure
- conditional audit logging based on `REQUIRES_AUDIT_LOG`

## Instructor Comparison Point

Prompt A can still produce working-looking code. The issue is not that the code is useless. The issue is that important project rules remain unstated, so they are easy for Copilot to omit.

---

# Part B - Prompt B Output

Prompt used:

```text
Reason through how #SecurityPolicy.ts changes validation for #schema.sql, then implement the function following all 5 AC points.
```

Acceptance criteria block:

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

## Expected Characteristics

A strong Prompt B solution should:

- read or apply `MIN_LEVEL` and `MAX_LEVEL` from `SecurityPolicy.ts`
- validate the requested clearance value before updating
- use `internal_clearance_level` from `schema.sql`
- use parameterized queries for database updates
- return a `400` status when validation fails
- log the change only when `REQUIRES_AUDIT_LOG` is `true`

## What To Accept

Accept the Prompt B output if it clearly includes all five AC points and does not fall back to generic or legacy field names.

## What To Reject

Reject the output if it:

- skips min/max validation
- updates the wrong column
- uses string interpolation instead of parameterized queries
- ignores the required `400` validation response
- logs unconditionally without checking `REQUIRES_AUDIT_LOG`

---

# Comparison Summary

## Why Prompt B Is Stronger

Prompt B gives Copilot:

- the current schema reference
- the policy file reference
- the validation contract
- the expected behavior for errors and logging

That makes the result easier to review against concrete requirements.

## Final Teaching Point

The exercise is not about making Prompt A fail. It is about showing that a broad prompt can generate plausible code while still missing important project constraints. Acceptance criteria make those constraints explicit before code is generated.
