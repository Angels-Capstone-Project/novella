import React from "react";
import "./WelcomePage.css";

const WelcomePage = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <div className="brand-name">Novella</div>
        <div className="auth-buttons">
          <button onClick={onLoginClick}>Log In</button>
          <button onClick={onSignupClick}>Sign Up</button>
        </div>
      </header>

      <main className="welcome-main">
        <div className="welcome-text">
          <h1>Hi, we're Novella.</h1>
          <p>
            The world's coziest storytelling community. <br />
            Home to millions of readers & writers. Write your own story or enjoy
            stories from others.
          </p>
          <div className="cta-buttons">
            <button>Start Reading</button>
            <button>Start Writing</button>
          </div>
        </div>
      </main>

      <section className="how-it-works">
        <h2>How Novella Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Create</h3>
            <p>
              Share your unique voice and original story on Novella. Find the
              writing tools you need to bring your ideas to life.
            </p>
          </div>
          <div className="step">
            <h3>2. Build</h3>
            <p>
              Grow your fanbase as your story gains momentum. Connect with other
              writers and readers through storytelling.
            </p>
          </div>
          <div className="step">
            <h3>3. Amplify</h3>
            <p>
              Get discovered, featured, and celebrated on Novella. Your story
              might just be the next big thing.
            </p>
          </div>
        </div>
      </section>

      <footer className="welcome-footer">© 2025 Novella</footer>
    </div>
  );
};

export default WelcomePage;
