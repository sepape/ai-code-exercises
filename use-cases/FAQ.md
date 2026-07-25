# Frequently Asked Questions (FAQ)

## Python Task Manager

This document answers the most common questions users may have when installing, configuring, and using the Python Task Manager application.

---

# Installation

### 1. What is the Python Task Manager?

The Python Task Manager is a command-line application that helps users create, organize, update, search, prioritize, and manage tasks. It is designed as a learning project that demonstrates Object-Oriented Programming (OOP) concepts and JSON data storage.

---

### 2. What are the system requirements?

To run the application, you need:

* Python 3.10 or later
* Visual Studio Code (recommended)
* A Windows, macOS, or Linux operating system
* Git (optional, for cloning the project)

---

### 3. How do I install the project?

1. Clone or download the project.
2. Open the project in Visual Studio Code.
3. Verify Python is installed.
4. Run the application using:

```bash
python main.py
```

---

### 4. How do I verify my Python installation?

Open a terminal and run:

```bash
python --version
```

or

```bash
python3 --version
```

If Python is installed correctly, you should see version **3.10** or later.

---

# Running the Application

### 5. How do I start the application?

Navigate to the project folder and run:

```bash
python main.py
```

The Task Manager application will launch.

---

### 6. What should happen when the application starts?

When the application starts, it should:

* Display the main menu
* Load previously saved tasks (if available)
* Allow you to create, edit, search, and manage tasks

---

# Adding Tasks

### 7. How do I add a new task?

Choose the **Add Task** option from the application's menu.

Provide the required information, such as:

* Task title
* Description
* Priority
* Category

The new task will be added to your task list.

---

### 8. Can I assign priorities to tasks?

Yes. Tasks can be assigned priorities such as:

* High
* Medium
* Low

This helps organize important work.

---

### 9. Can I organize tasks into categories?

Yes. Categories help group similar tasks.

Examples include:

* Work
* School
* Personal
* Shopping
* Projects

---

# Editing Tasks

### 10. How do I edit an existing task?

Select the **Edit Task** option.

Choose the task you want to modify and update its details, such as:

* Title
* Description
* Category
* Priority
* Completion status

Save your changes when finished.

---

### 11. Can I change a task's priority?

Yes. You can update the priority at any time using the edit feature.

---

# Deleting Tasks

### 12. How do I delete a task?

Select the **Delete Task** option.

Choose the task you want to remove and confirm the deletion.

---

### 13. Can deleted tasks be recovered?

No. Once a task has been deleted, it cannot be recovered unless you restore it from a previous backup of your task data.

---

# Saving Tasks

### 14. How are tasks saved?

Tasks are stored in a **JSON file**, allowing them to persist between application sessions.

---

### 15. Do I need to save tasks manually?

Depending on the application's implementation, tasks may be saved automatically or through a dedicated **Save** option.

Refer to your application's menu for the available save method.

---

# Loading Tasks

### 16. How are saved tasks loaded?

When the application starts, it reads the JSON file and loads previously saved tasks into memory.

---

### 17. What happens if no saved tasks exist?

The application starts with an empty task list, allowing you to create new tasks.

---

# Python Version Requirements

### 18. Which Python version is required?

Python **3.10 or later** is recommended.

Older versions may not support all features used by the project.

---

### 19. How do I upgrade Python?

Visit the official Python website and download the latest stable version.

After installation, verify the upgrade using:

```bash
python --version
```

---

# Common Errors

### 20. I receive the error:

```text
'python' is not recognized as an internal or external command
```

**Solution**

* Ensure Python is installed.
* Add Python to your system PATH.
* Restart your terminal after installation.

---

### 21. I receive a "ModuleNotFoundError".

**Solution**

* Confirm you are running the application from the project folder.
* Verify that all required project files are present.
* Ensure there are no missing Python modules.

---

### 22. My tasks are not being saved.

**Solution**

Check that:

* The JSON file exists.
* The application has permission to write to the project folder.
* The JSON file is not corrupted.

---

### 23. The application crashes when starting.

**Possible causes**

* Invalid JSON file
* Missing files
* Python version incompatibility
* Syntax errors in the code

Verify the error message displayed in the terminal and resolve the reported issue.

---

# Troubleshooting

### 24. Why can't I load my saved tasks?

Possible reasons include:

* The JSON file has been deleted.
* The JSON file contains invalid formatting.
* The application cannot locate the file.

---

### 25. Why are my changes not appearing?

Make sure you:

* Save the task after editing.
* Restart the application if necessary.
* Verify that the JSON file has been updated.

---

### 26. How can I reset the application?

You can remove or rename the existing JSON data file to start with a clean task list.

**Warning:** This will permanently remove all saved tasks unless you have a backup.

---

### 27. Who should I contact if I experience problems?

If you continue to experience issues:

* Review the README documentation.
* Check the terminal for error messages.
* Contact the project maintainer or instructor if this project is part of a course.

---

# Additional Tips

* Save your tasks regularly.
* Keep Python updated to the latest supported version.
* Back up your JSON task file before making significant changes.
* Test new features using sample tasks before relying on them for important work.

---

# Summary

The Python Task Manager is designed to provide a simple and efficient way to organize tasks while demonstrating Python programming concepts such as Object-Oriented Programming and JSON file handling. This FAQ serves as a quick reference for installation, usage, troubleshooting, and common questions.
