## Prompting: Foundations - 1 ##



#### Slide 3/43: Warm-up: How can I set things up and get out of the way?  ####

Build this feature.


#### Slide 9/43: Demo : Generate Code Without Schema Context  ####

Write a Node.js function using pg to insert a new user.


#### Slide 12/43: Demo : Generate the Function Again With Schema Context  ####

Write a Node.js function using pg to insert a new user using #file:schema.sql.


#### Slide 16/43: Demo : Broad prompt with extra context  ####

Write a function to save a user based on table definition.


#### Slide 18/43: Demo : Curated tabs improve the suggestion  ####

Write a production-ready Node.js function to insert a user based on schema.sql.



#### Slide 28/43: Demo: Few-shot prompting  ####

// Example 1: class DatabaseError extends Error { constructor(msg) { super(msg); this.code = 'DB_ERR'; } }
// Example 2: class ValidationError extends Error { constructor(msg) { super(msg); this.code = 'VALID_ERR'; } }
Create a third class for 'UserNotFoundError' using the same pattern, but not as a comment



#### Slide 30/43: Demo: Chain-of-Thought prompting  ####

Before writing code, give a short 3-step plan.

Then write a Node.js `pg` function named `getUserStatus(pool, emailAddress)` using `#schema.sql`.

Find the user by `email_address`, return `null` if not found, and return the user’s name, email, and account status if found.

Use a parameterized query.



#### Slide 32/43: Demo: Constrained prompting  ####

Implement `getClearanceUser(pool, emailAddress)` using Node.js `pg` and `#schema.sql`.

Select `full_name`, `account_status`, and `internal_clearance_level` by `email_address`.

Return `null` if no user is found. Throw an Error if `internal_clearance_level` is missing.

Return only `full_name` and `account_status`.



#### Slide 34/43: Activity: The Tale of Two Prompts  ####

Write a function to update a user's clearance level.



#### Slide 35/43: Activity: Run the acceptance criteria encoded prompt  ####

Reason through how #SecurityPolicy.ts changes validation for #schema.sql, then implement the function following all 5 AC points.



