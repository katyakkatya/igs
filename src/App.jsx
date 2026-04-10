import { useState, useCallback } from "react";
import "./App.css";
import Intro from './components/Intro';
import Story1 from './components/Story1';
import Story2 from './components/Story2';
import Story3 from './components/Story3';
import IntroQuiz from './components/IntroQuiz';
import Question1 from './components/Question1';
import Question2 from './components/Question2';
import Question3 from './components/Question3';
import Question4 from './components/Question4';
import Question5 from './components/Question5';
import QuizResults from './components/QuizResults';

const TOTAL_STEPS = 11; // Intro(0), Story1(1), Story2(2), Story3(3), IntroQuiz(4), Q1(5), Q2(6), Q3(7), Q4(8), Q5(9), Results(10)

const correctAnswers = {
  5: 'A', // Question1
  6: 'C', // Question2
  7: 'A', // Question3
  8: 'B', // Question4
  9: 'D', // Question5
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizRestartCount, setQuizRestartCount] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleAnswer = useCallback((questionIndex, answerId) => {
    setAnswers((prev) => {
      if (prev[questionIndex] !== undefined) return prev;
      return { ...prev, [questionIndex]: answerId };
    });
  }, []);

  const handleRestart = useCallback(() => {
    setAnswers({});
    setCurrentStep(4); // Return to IntroQuiz
    setQuizRestartCount((prev) => prev + 1);
  }, []);

  const handleQuestionNext = useCallback((questionIndex) => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const correctCount = Object.entries(answers).reduce((count, [qIdx, ansId]) => {
    return count + (correctAnswers[qIdx] === ansId ? 1 : 0);
  }, 0);

  const totalQuestions = Object.keys(correctAnswers).length;

  const renderStep = () => {
    const commonProps = { onNext: handleNext, onBack: handleBack };

    switch (currentStep) {
      case 0:
        return <Intro onNext={handleNext} />;
      case 1:
        return <Story1 {...commonProps} />;
      case 2:
        return <Story2 {...commonProps} />;
      case 3:
        return <Story3 {...commonProps} />;
      case 4:
        return <IntroQuiz {...commonProps} />;
      case 5:
        return (
          <Question1
            key={`q1-${quizRestartCount}`}
            onNext={() => handleQuestionNext(5)}
            onBack={handleBack}
            savedAnswer={answers[5]}
            onAnswer={(ans) => handleAnswer(5, ans)}
          />
        );
      case 6:
        return (
          <Question2
            key={`q2-${quizRestartCount}`}
            onNext={() => handleQuestionNext(6)}
            onBack={handleBack}
            savedAnswer={answers[6]}
            onAnswer={(ans) => handleAnswer(6, ans)}
          />
        );
      case 7:
        return (
          <Question3
            key={`q3-${quizRestartCount}`}
            onNext={() => handleQuestionNext(7)}
            onBack={handleBack}
            savedAnswer={answers[7]}
            onAnswer={(ans) => handleAnswer(7, ans)}
          />
        );
      case 8:
        return (
          <Question4
            key={`q4-${quizRestartCount}`}
            onNext={() => handleQuestionNext(8)}
            onBack={handleBack}
            savedAnswer={answers[8]}
            onAnswer={(ans) => handleAnswer(8, ans)}
          />
        );
      case 9:
        return (
          <Question5
            key={`q5-${quizRestartCount}`}
            onNext={() => handleQuestionNext(9)}
            onBack={handleBack}
            savedAnswer={answers[9]}
            onAnswer={(ans) => handleAnswer(9, ans)}
          />
        );
      case 10:
        return (
          <QuizResults
            correctCount={correctCount}
            totalCount={totalQuestions}
            onRestart={handleRestart}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 500 54"
          className="ng-star-inserted"
        >
          <path d="M46.7 53.1H35.4V19L10.8 53H0V1h11.3v34L36 1h10.6v52ZM54.9.9h11.4v20.7h23V.9h11.5V53H89.3V32h-23v21H55V1Zm65.5 52.2H109V1h35.3v10.4h-23.9V53Zm79-26.1C199.4 11 188 .1 172 0h-.3c-15.9.1-27.4 11-27.4 27s11.5 26.9 27.4 27h.3c15.9-.2 27.4-11 27.4-27ZM172 43.4c-9.2 0-15.6-6.3-15.6-16.4 0-10.2 6.4-16.4 15.6-16.4s15.6 6.3 15.6 16.4c0 10.1-6.4 16.4-15.6 16.4Zm147.1-31.9h-16.8V.9h45v10.6h-16.8V53h-11.4V11.5ZM354.2.9h23.4c12.4 0 19.9 7.4 19.9 18.2 0 12.1-9.4 18.4-21 18.4h-10.9V53h-11.4V1Zm22.6 26.3c5.8 0 9-3.4 9-8 0-5.2-3.5-8-9.2-8h-11v16h11.2ZM500 53.1l-18.5-26.8L499.3 1H486l-11.1 16-11-16h-13.6l17.8 25.7-18.5 26.5h13.1l12-17 11.7 17H500Zm-63.2 0h11.7L426.2.5h-10.6l-22.2 52.6H405l4.9-12h22l5 12ZM414 31l7-16.3 6.9 16.3h-14ZM231.8 43.4c-9.2 0-15.6-6.3-15.6-16.4 0-10.1 6.4-16.4 15.6-16.4a18 18 0 0 1 12.2 4.3l7-7.1A27.4 27.4 0 0 0 232 0h-.3c-16 .1-27.4 11-27.4 27s11.5 26.8 27.4 27h.3c7.8 0 14.2-3.1 19-7.8l-7-7a17.9 17.9 0 0 1-12.2 4.2m47.8 0c-9.2 0-15.6-6.3-15.6-16.4 0-10.1 6.4-16.4 15.6-16.4 4.8 0 8.7 1.4 12.1 4.3l7.1-7.1a27.4 27.4 0 0 0-19-7.8h-.4C263.5.1 252 11 252 27s11.5 26.8 27.4 27h.3c7.9 0 14.3-3.1 19.1-7.8l-7-7a17.9 17.9 0 0 1-12.2 4.2"></path>
        </svg>
      </header>
      <main>{renderStep()}</main>
    </>
  );
}

export default App;
