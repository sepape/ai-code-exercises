# Task Manager Codebase Discovery

**Name:** Sepape Rametse  
**Language selected:** Python  
**Repository:** sepape/ai-code-exercises  
**Branch:** task-manager-discovery  
**Project location:** use-cases/code-algorithms/python/TaskManager  

## Setup and Initial Checks


- Repository successfully cloned: Yes
- Exercise branch created: Yes
- Branch name: task-manager-discovery
- Language selected: Python
- Python version:
- Project folder opened successfully: Yes

## Part 1: Understanding Project Structure

### Initial observations

The Python Task Manager folder contains:

- README.md
- cli.py
- models.py
- storage.py
- task_manager.py
- task_parser.py
- task_priority.py
- task_list_merge.py
- tests/
- .gitignore

### Configuration files

I searched for:

- requirements.txt
- package.json
- pom.xml

Findings:

The selected implementation is Python. I did not find package.json or pom.xml because those belong to the JavaScript and Java versions. The project uses the Python standard library and does not require external dependencies.

### README findings

- The project is a command-line Task Management System.
- It requires Python 3.11 or later.
- It uses no additional external dependencies.
- The application is started through cli.py.
- Unit tests use Python unittest.
### Initial understanding

My initial understanding is that this is a Python command-line Task Manager.

I think the codebase is organised as follows:

- `cli.py` is the main entry point and handles commands entered by the user.
- `task_manager.py` coordinates task-related operations.
- `models.py` defines core domain entities such as Task, TaskStatus and TaskPriority.
- `storage.py` manages saving and loading tasks.
- `tests/` contains automated tests.
- The other task-related modules may contain separate algorithms or helper functions.

### Technologies and tools identified

- Python 3.11 or later
- Command-line interface
- Python standard library
- JSON file storage
- Python unittest
- UUID values
- Datetime handling
- Enums

### Initial view of the architecture

User
→ Command-line interface
→ Task manager
→ Domain model
→ Storage
→ JSON file

### Questions

1. Is cli.py the only entry point?
2. Which file contains most of the business logic?
3. Does storage.py only store data, or does it also contain business rules?
4. Are task_parser.py, task_priority.py and task_list_merge.py used by the CLI?
5. Are task-status transitions controlled?
6. Where is input validation performed?
7. How does the application respond to a missing or corrupted JSON file?

### Project Structure Prompt

### AI analysis

### Comparison and misconceptions

### Key components and responsibilities

## Part 2: Finding Feature Implementation

### Initial search

### Initial hypothesis

### Feature Location Prompt

### Feature implementation map

### Proposed implementation plan

## Part 3: Understanding the Domain Model

### Core domain entities

### Initial entity diagram

### Initial domain understanding

### Domain Understanding Prompt

### AI questions and my answers

### Revised domain diagram

### Domain glossary

## Part 4: Practical Application

### Files that may need modification

### Proposed changes

### Questions for the team

### Reflection

## Final Discussion and Reflection

### My approach

### Challenges encountered

### Most useful prompt

### What I would do differently

### Additional tools and resources

## Final Submission Summary
