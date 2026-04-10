import { useState, useEffect } from 'react';

const questionAnswers = [
  {
    id: 'A',
    text: 'Да, конечно. Страховая защищает туриста от всего — и от болезни, и от воров.',
    correct: false,
    explanation:
      'Нет, страховка путешественника покрывает не «всё подряд», а конкретные риски (медицинская помощь, расходы на лечение). Кража вещей туда не входит.',
  },
  {
    id: 'B',
    text: 'Нет, потому что Дима сам оставил рюкзак без присмотра. Это его вина.',
    correct: false,
    explanation:
      'Да, это неосторожность, но главная причина отказа — даже при идеальном поведении страховка бы не заплатила, потому что вещи просто не застрахованы.',
  },
  {
    id: 'C',
    text: 'Нет. В стандартном полисе путешественника по России нет защиты багажа и личных вещей. Только здоровье и несчастный случай.',
    correct: true,
    explanation:
      'Верно! Страхование для поездок по России от «Ингосстраха» (как и у многих компаний) не включает покрытие кражи, потери или повреждения багажа. Оно покрывает: медицинскую помощь, отмену поездки.',
  },
  {
    id: 'D',
    text: 'Да, но только если Дима докажет, что рюкзак стоил больше 50 000 ₽.',
    correct: false,
    explanation:
      'Сумма не имеет значения. Если риска «кража» нет в договоре — не заплатят ни за 5000, ни за 500 000 ₽.',
  },
];

function Question2({ onNext, onBack, savedAnswer, onAnswer }) {
  const [selectedId, setSelectedId] = useState(savedAnswer || null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (savedAnswer) {
      setSelectedId(savedAnswer);
    }
  }, [savedAnswer]);

  const handleSelect = (id) => {
    if (!selectedId) {
      setSelectedId(id);
      if (onAnswer) onAnswer(id);
    }
    setShowHint(false);
  };

  const handleNextClick = () => {
    if (selectedId === null) {
      setShowHint(true);
    } else {
      onNext();
    }
  };

  return (
    <div className="container">
      <div className="without-btn">
        <img
          loading="lazy"
          src="https://cdn.ingos.ru/images/travel-russia-hero-banner.svg"
          alt="Поездки по России"
        />
        <div className="q-story1">
          <h2 className="q-story1-header">Неприятный сюрприз</h2>
          <p className="q-story1-text">
            Дима с командой поехал на соревнования в Нижний Новгород. Поезд,
            купе, отличное настроение.
            <br /><br />
            Дима положил рюкзак с ноутбуком и одеждой на верхнюю полку и пошёл в
            вагон-ресторан перекусить. Через час вернулся — рюкзака нет. Ни на
            полке, ни под столом.
            <br /><br />
            Проводница сказала:
            <br /><br />— На станции «Владимир» заходили посторонние. Похоже, украли.
            Пиши заявление в полицию.
            <br /><br />
            Дима расстроился. Позвонил маме. Она сказала:
            <br /><br />— У тебя же есть страховка путешественника по России! Я
            оформляла перед поездкой.
          </p>
        </div>
      </div>

      {/* === Вопрос с вариантами ответов === */}
      <div className="quiz-question">
        <h3 className="quiz-question-title">
          Посмотри на картинку и найди её на сайте. Ознакомься с содержимым и
          выбери вариант ответа. Как ты думаешь, выплатит ли страховая
          компенсацию за украденный рюкзак с ноутбуком (ноутбук стоил 70 000
          рублей)?
        </h3>

        <div className="answers-list">
          {questionAnswers.map((answer) => {
            const isSelected = answer.id === selectedId;

            return (
              <div key={answer.id} className="answer-item">
                <button
                  className={`answer-btn ${
                    isSelected
                      ? answer.correct
                        ? "answer-correct"
                        : "answer-wrong"
                      : ""
                  }`}
                  onClick={() => handleSelect(answer.id)}
                >
                  <span className="answer-letter">{answer.id})</span>{" "}
                  {answer.text}
                </button>

                {isSelected && (
                  <div
                    className={`answer-explanation ${
                      answer.correct ? "exp-correct" : "exp-wrong"
                    }`}
                  >
                    {answer.explanation
                      .split("\n")
                      .map((line, i) =>
                        line.trim() === "" ? (
                          <br key={i} />
                        ) : (
                          <p key={i}>{line}</p>
                        ),
                      )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* ================================ */}

      <div className="btn-section">
        <div className="btn-row">
          <button className="next-button" onClick={handleNextClick}>
            Далее
          </button>
          <button className="back-button" onClick={onBack}>
            Назад
          </button>
        </div>
        {showHint && selectedId === null && (
          <p className="next-hint">Сначала выберите вариант ответа</p>
        )}
      </div>
    </div>
  );
}

export default Question2;
