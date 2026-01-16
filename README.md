# 🧠 Quizzical

A trivia game built with **React** using the Open Trivia Database (OpenTDB) API.  
This project was completed as my **first solo React project**, where I was given only a design and asked to implement the full application logic independently.

## 🔗 Live Demo
https://quizzical-trivia-knowledge.netlify.app/

## 📁 Repository
https://github.com/Denilson15/quizzical

## ⚙️ Features
- Fetches trivia questions from the OpenTDB API
- Multiple-choice quiz flow with score tracking
- Conditional rendering for loading, gameplay, and results
- Ability to restart the quiz and fetch a new set of questions

## 🧩 Technical Details
- Built with **React** (functional components + hooks)
- Uses `useState` and `useEffect` for state and side-effect management
- Handles API fetching and UI state transitions
- Deployed using **Netlify**

## ⚠️ Known Edge Case
An edge case occurs if the user starts the quiz before the API response is fully received.  
In rare cases, the OpenTDB API may return an empty response (`response_code: 5`), which can require additional user interaction before the game behaves as intended.

This was a valuable learning experience around:
- Data readiness vs loading state
- Handling unreliable API responses
- Preventing premature user interaction in UI-driven applications

## 📚 What I Learned
- Structuring React components around UI state
- Managing API data and conditional rendering
- Debugging race conditions between user actions and network responses

## 📝 Notes
The goal of this project was to strengthen my ability to reason through problems and implement solutions independently.

## 🚧 Future Improvements
- Disable the start button until questions are fully loaded
- Add explicit error handling for API response codes
- Improve UX around loading and retry states

---

Feedback and suggestions are welcome.
