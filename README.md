## Prompting Foundations - 1

### Overview
This module introduces foundational concepts for effective AI-assisted coding using GitHub Copilot in VS Code. You will learn how workspace context and prompt style influence Copilot's code suggestions, and practice techniques to improve code generation quality.

### Learning Objectives
- Understand the impact of open files and workspace context on Copilot's output
- Explore and apply different prompting techniques: zero-shot, few-shot, chain-of-thought, and constrained
- Practice curating workspace context to reduce noise and increase signal
- Evaluate Copilot's output against schema and acceptance criteria

### Module Structure

The module is organized into interactive demos, guided labs, and hands-on exercises. Each demo includes a snapshot of the recommended project structure for that step:


### 1. Introduction
- Why context matters for AI coding assistants
- Overview of Copilot in VS Code


### 2. Lab 1: Workspace Context and Schema Awareness
- Generate code with and without schema context
- Observe how Copilot guesses or uses real schema fields

**Project structure (before adding schema.sql):**
```
module-1-demo/
├── db.js
```

**Project structure (after adding schema.sql):**
```
module-1-demo/
├── db.js
├── schema.sql
```


### 3. Lab 2: Signal, Noise, and Curated Tabs
- See how unrelated files (noise) affect Copilot's suggestions
- Practice curating open tabs for better results

**Project structure (with noise):**
```
module-1-demo/
├── db.js
├── legacy_v1_backup.sql
├── scratchpad.txt
```

**Project structure (curated):**
```
module-1-demo/
├── db.js
├── schema.sql
```


### 4. Lab 3: Prompting Techniques
- Try zero-shot, few-shot, chain-of-thought, and constrained prompts
- Compare outputs and review against requirements

**Project structure:**
```
module-1-demo/
├── db.js
├── schema.sql
```


### 5. Activity: The Tale of Two Prompts
- Compare broad vs. acceptance-criteria-encoded prompts for the same task
- Analyze how prompt clarity changes code quality

**Project structure:**
```
module-1-demo/
├── db.js
├── schema.sql
├── SecurityPolicy.ts
```

### 6. Exercises
- Apply all techniques in guided tasks
- Review and discuss outputs

## Key Files
- `db.js`: Main file for Copilot code generation
- `schema.sql`: Defines the user table schema
- `legacy_v1_backup.sql`: Example of legacy schema (used to demonstrate noise)
- `Prompts.md`, `Lab.md`, `exercise_solution.md`: Lab instructions, prompts, and solutions
- `Demo-Exercise-screenshots/`: Screenshots of demo and exercise outputs

## Prompting Techniques Covered
| Technique         | Description                                              |
|-------------------|----------------------------------------------------------|
| Zero-shot         | Direct task instruction, no examples                    |
| Few-shot          | Provide examples to define the output pattern           |
| Chain-of-Thought  | Ask for a plan or reasoning before code                 |
| Constrained       | Specify strict rules or acceptance criteria             |

## Example Prompts
- "Write a Node.js function using pg to insert a new user."
- "Write a Node.js function using pg to insert a new user using #file:schema.sql."
- "Create a third class for 'UserNotFoundError' using the same pattern."
- "Before writing code, give a short 3-step plan. Then write a Node.js function..."
- "Implement getClearanceUser(pool, emailAddress) using Node.js pg and #schema.sql."

## Outcomes
By the end of this module, you will be able to:
- Curate workspace context for better Copilot suggestions
- Choose and apply the right prompting technique for your coding task
- Review and validate Copilot's output against requirements

---
For detailed lab instructions and solutions, see [Lab.md](https://github.com/DataSocietyTraining/module-1-demo/blob/module-1-repo/Lab.md) and [exercise_solution.md](https://github.com/DataSocietyTraining/module-1-demo/blob/module-1-repo/exercise_solution.md).
