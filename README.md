# Feedback Frontend

A modern feedback management web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project allows users to submit feedback and provides an admin dashboard for managing and viewing customer feedback.

## Features

- **User Feedback Form**: Collects name, email, message, and a star rating from users.
- **Admin Dashboard**: Secure login for admins to view, sort, and paginate feedback entries.
- **Feedback Details**: View detailed feedback, including ratings and submission date.
- **Responsive UI**: Clean, mobile-friendly design using Tailwind CSS.
- **Type-safe**: Built with TypeScript for robust type checking.
- **Modern Tooling**: Uses Vite for fast development and hot module replacement.
- **Linting**: ESLint and TypeScript ESLint for code quality.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/feedback-front.git
   cd feedback-front
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   #### The application will be available at `http://localhost:5173` in your browser

## Project Structure

- src/components/Feedback/FeedbackForm.tsx – User feedback form component
- src/components/Feedback/RatingSelect.tsx – Star rating selector
- src/pages/Admin/FeedbackListPage.tsx – Admin feedback list with pagination and sorting
- src/pages/Admin/FeedbackDetailsPage.tsx – Detailed feedback view for admins
- src/pages/Admin/Login.tsx – Admin login page
- src/services/feedbacksService.ts – API service for feedback operations

## Linting & Formatting

ESLint is configured for React and TypeScript.
To run lint checks:

```bash
npm run lint
# or
yarn lint
```

## Customization

- Styling : Tailwind CSS is used for styling. You can customize the design via Tailwind utility classes.
- API Integration : Update src/services/axiosInstance.ts to connect with your backend API.