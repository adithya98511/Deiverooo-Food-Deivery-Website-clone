import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white pt-60">
      <header className="flex items-center justify-center p-6 bg-opacity-80">
        <h1 className="text-6xl font-bold">Deliveroo</h1>
      </header>
      <main className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Your go-to platform for managing restaurants</h2>
          <p className="mb-6">
            Sign up or log in to start exploring the features of our application.
          </p>
          <Link
            to="/signinOpt"
            className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </main>
      <footer className="p-4 bg-opacity-80 text-center">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
