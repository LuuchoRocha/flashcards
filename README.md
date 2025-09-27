# Take-home Test: Flashcards

## Description

This is a simple flashcards app designed to help early learners of English identify common phonics sounds.

The app has two components:

* A Rails-based API
* A React-based front-end

Originally, the app requested a list of levels and displayed flashcards for the selected level. Flashcards could be clicked to show a larger view, and two buttons (**Needs Work** and **Got It**) were displayed but not functional.

### Updates and Enhancements

This submission includes the following enhancements:

**Full functionality for response buttons:**

* **Needs Work** and **Got It** buttons now record the user's response.
* Clicking a button updates the flashcard’s color in the level list:

  * Green for **Got It** (`mastered`)
  * Red for **Needs Work** (`needs_work`)
* Responses are persisted to the Rails backend in the `status` field.
* Statuses persist across page refreshes and level changes.

**User Experience Enhancements:**

* Smooth animations when flashcards change color.
* Optimistic UI updates for immediate visual feedback.
* Retry buttons for failed requests.
* Graceful error handling for server or network errors.

**Testing and Quality Assurance:**

* **Rails controller tests** for `index`, `show`, and `update` actions.
* **Rails model tests** ensuring the `status` enum is correctly defined and validated.
* **React component tests** for button interactions and state updates.

## Installation

The Rails API is in the `server` directory and the React front-end in the `client` directory.

### Setting up the Rails app

```bash
cd server
bundle install
bin/setup
```

### Setting up the React app

```bash
cd client
npm install
```

---

## Running the app

Both server and client need to run simultaneously:

```bash
# Rails server
cd server
bin/dev

# React client
cd client
npm run dev
```
