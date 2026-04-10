function QuizResults({ correctCount, totalCount, onRestart, onBack }) {
  return (
    <div className="container">
      <div className="results">
        <h1 className="intro-text">Результаты викторины</h1>
        <p className="intro-text" style={{ fontSize: '1.5rem', marginTop: '20px' }}>
          Правильных ответов: {correctCount} из {totalCount}
        </p>
      </div>
      <div className="btn-row">
        <button className="next-button" onClick={onRestart}>
          Пройти викторину заново
        </button>
        <button className="back-button" onClick={onBack}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default QuizResults;
