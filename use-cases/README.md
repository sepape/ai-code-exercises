# Task Manager

A Python-based task management application that enables users to create, update, organize, prioritize, search, and manage tasks efficiently. The project demonstrates Object-Oriented Programming (OOP) principles while providing a simple and user-friendly way to keep track of daily tasks.

---

# Project Overview

The **Task Manager** application is designed to help users organize their work by allowing them to create and manage tasks through a Python application. It provides essential task management features such as adding, updating, deleting, searching, sorting, saving, and loading tasks.

This project is intended for learning Python programming concepts, Object-Oriented Programming (OOP), and JSON data handling while building a practical application.

---

# Features

The application includes the following features:

* ✅ Add new tasks
* ✅ Update existing tasks
* ✅ Delete completed or unwanted tasks
* ✅ Assign task priorities
* ✅ Organize tasks into categories
* ✅ Search for tasks
* ✅ Sort tasks by different criteria
* ✅ Save tasks to a JSON file
* ✅ Load saved tasks when the application starts

---

# Technologies Used

* Python 3.10+
* JSON
* Object-Oriented Programming (OOP)
* Visual Studio Code

---

# Project Structure

```text
task_manager/
│
├── main.py
├── models/
├── services/
├── utils/
├── tests/
└── README.md
```

### Folder Description

| Folder/File | Purpose                                       |
| ----------- | --------------------------------------------- |
| `main.py`   | Application entry point                       |
| `models/`   | Contains task data models and classes         |
| `services/` | Business logic and task management operations |
| `utils/`    | Utility/helper functions                      |
| `tests/`    | Unit tests for the application                |
| `README.md` | Project documentation                         |

---

# Installation

## Prerequisites

Before installing the application, ensure you have:

* Python 3.10 or later
* Visual Studio Code
* Git (optional)

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager.git
```

---

## Step 2: Navigate to the Project

```bash
cd task-manager
```

---

## Step 3: Open the Project

Open the project folder in Visual Studio Code.

---

## Step 4: Verify Python Installation

Run:

```bash
python --version
```

or

```bash
python3 --version
```

Expected output:

```text
Python 3.10.x
```

---

## Step 5: Run the Application

Execute:

```bash
python main.py
```

or

```bash
python3 main.py
```

The Task Manager application will start.

---

# Usage

## Create a Task

Choose the option to add a new task.

Enter:

* Task Name
* Description
* Priority
* Category

The task will be stored in the application.

---

## Update a Task

Select an existing task and modify:

* Title
* Description
* Priority
* Category
* Status

---

## Delete a Task

Select the task you wish to remove.

Confirm the deletion.

---

## Search Tasks

Search using:

* Task name
* Category
* Priority

---

## Sort Tasks

Tasks can be sorted by:

* Priority
* Category
* Name

---

## Save Tasks

Choose the Save option.

The application stores task information in a JSON file.

---

## Load Tasks

When the application starts, previously saved tasks are loaded automatically from the JSON file.

---

# Configuration

The project currently uses JSON for storing task information.

Example:

```json
{
  "title": "Complete Assignment",
  "priority": "High",
  "category": "School",
  "completed": false
}
```

Future improvements may include:

* SQLite database support
* PostgreSQL integration
* User authentication
* Cloud synchronization

---

# Troubleshooting

## Python Not Found

Problem:

```text
'python' is not recognized...
```

Solution:

* Install Python.
* Ensure Python is added to your system PATH.

---

## Module Not Found

Problem:

```text
ModuleNotFoundError
```

Solution:

* Verify that you are running the command inside the project directory.
* Check that all required project files are present.

---

## JSON File Errors

Problem:

The application cannot load saved tasks.

Solution:

* Verify the JSON file exists.
* Ensure the JSON file is correctly formatted.

---

## Application Will Not Start

Possible causes:

* Incorrect Python version
* Missing project files
* Syntax errors

Solution:

Run:

```bash
python --version
```

Ensure you are using Python 3.10 or newer.

---

# Future Enhancements

Potential improvements include:

* Graphical User Interface (GUI)
* User login and authentication
* Cloud synchronization
* Notifications and reminders
* Due dates
* Calendar integration
* Mobile application support

---

# Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Submit a Pull Request.

---

# License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software in accordance with the terms of the MIT License.

---

# Author

**Task Manager Project**

Created as part of an AI-assisted software engineering documentation exercise demonstrating best practices for project documentation, Python development, and Object-Oriented Programming.

---

# Acknowledgements

Special thanks to:

* Python Software Foundation
* Visual Studio Code
* Open-source Python community
* Contributors and reviewers who help improve software documentation
