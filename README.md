Follow these steps to set up the project locally on your machine.

Prerequisites

Make sure you have the following installed on your machine:

Git
Node.js
npm (Node Package Manager)

Cloning the Repository
git clone https://github.com/sknoor07/Movie-Info-App
cd Movie-Info-App

Installation

Install the project dependencies using npm:

npm install

Set Up Environment Variables

Create a new file named .env.local in the root of your project and add the following content:

VITE_TMDB_API_KEY=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=

Replace the placeholder values with your actual TheMovieDatabase API and Appwrite credentials.

Running the Project

npm run dev

Open http://localhost:5173 in your browser to view the project.
