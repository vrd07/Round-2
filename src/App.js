import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import ScoreBoard from './components/ScoreBoard';
import Timer from './components/Timer';
import Instructions from './components/Instructions';
import questions from './data/questions';
import './styles/styles.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4200); // 30 minutes in seconds
  const [answeredQuestions, setAnsweredQuestions] = useState(Array(questions.length).fill(false));

  
  useEffect(() => {
    let timer;
    if (gameStarted && !gameCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameCompleted(true);
    }
    
    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted, timeLeft]);
  
  const startGame = () => {
    setShowInstructions(false);
    setGameStarted(true);
  };
  
  const handleAnswer = (isCorrect, points) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + points);
    }

  
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (newAnsweredQuestions.every(q => q === true)) {
      setGameCompleted(true);
    }
  };
  
  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };
  
  const restartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameCompleted(false);
    setGameStarted(false);
    setShowInstructions(true);
    setTimeLeft(1800);
    setAnsweredQuestions(Array(questions.length).fill(false));
  };
  
  return (
    <div className="app">
      <header>
        <h1>SQL Quest</h1>
        <div className="subtitle">Master the Database Challenge</div>
      </header>
      
      {showInstructions ? (
        <Instructions onStart={startGame} />
      ) : (
        <div className="game-container">
          <div className="game-header">
            <ScoreBoard 
              score={score} 
              totalQuestions={questions.length} 
              answeredQuestions={answeredQuestions}
              currentQuestion={currentQuestionIndex}
              onQuestionSelect={navigateToQuestion}
            />
            <Timer timeLeft={timeLeft} />
          </div>
          
          {!gameCompleted ? (
            <Question 
              question={questions[currentQuestionIndex]} 
              onAnswer={handleAnswer}
              onNext={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
              onPrev={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
              isAnswered={answeredQuestions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
            />
          ) : (
            <div className="game-completed">
              <h2>Challenge Completed!</h2>
              <div className="final-score">Your Score: {score}/{100}</div>
              <div className="score-message">
                {score >= 90 ? "Outstanding! You're a SQL wizard!" :
                 score >= 70 ? "Great job! You have solid SQL skills!" :
                 score >= 50 ? "Good effort! Keep practicing your SQL!" :
                 "Keep learning! SQL mastery takes practice!"}
              </div>
              <button className="restart-button" onClick={restartGame}>Play Again</button>
            </div>
          )}
        </div>
      )}
      
      <footer>
        <p>Data Analytics Event © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;