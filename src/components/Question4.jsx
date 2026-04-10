import { useState, useEffect } from 'react';

const questionAnswers = [
  {
    id: 'A',
    text: 'Да, покроет. Страховка «Квартира» защищает от случайного ущерба чужому имуществу, где бы это ни случилось. Дима пролил сок случайно — это страховой случай.',
    correct: false,
    explanation:
      'Нет, страховка «Квартира» не защищает от ущерба чужому имуществу.',
  },
  {
    id: 'B',
    text: 'Нет, не покроет. Страховка «Квартира» защищает только то имущество, которое застраховано (свои вещи в своей квартире). Чужой ноутбук в другом месте — не входит в покрытие.',
    correct: true,
    explanation:
      'Верно! Стандартная страховка «Квартира» покрывает своё имущество в своей квартире, она не покрывает ответственность перед другими людьми.',
  },
  {
    id: 'C',
    text: 'Нет, не покроет, потому что Дима пролил сок намеренно. Если бы это была случайность — покрыло бы, но страховая решит, что он специально.',
    correct: false,
    explanation:
      'Нет, Дима пролил случайно. Но даже если случайно — страховка «Квартира» всё равно не покрывает чужое имущество.',
  },
  {
    id: 'D',
    text: 'Покроет, но только половину стоимости. Страховка «Квартира» делит ответственность пополам между тем, кто пролил, и владельцем ноутбука.',
    correct: false,
    explanation:
      'Нет, никаких «половин» нет. Либо покрывает полностью, либо не покрывает вообще.',
  },
];

function Question4({ onNext, onBack, savedAnswer, onAnswer }) {
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
          src="https://cdn.ingos.ru/images/property__hero-banner-new-girl.svg"
          alt="Страхование квартиры"
        />
        <div className="q-story1">
          <h2 className="q-story1-header">Оранжевая река</h2>
          <p className="q-story1-text">
            Дима с друзьями отмечал победу на районных соревнованиях по
            самокату. Компания зашла в антикафе — уютное место, где можно играть
            в приставку, пить чай и работать на ноутбуках.
            <br /><br />
            Дима взял стакан апельсинового сока, сел на диван рядом с другом
            Пашей. Паша как раз показывал Диме своё видео с трюками на новеньком
            ноутбуке.
            <br /><br />
            — Смотри, какой заезд я сделал! — Паша повернул ноутбук к Диме.
            <br /><br />
            В этот момент Дима потянулся за печеньем, задел стакан локтем… и
            оранжевая река пролилась прямо на клавиатуру ноутбука.
            <br /><br />
            Ноутбук зашипел, экран мигнул и погас.
            <br /><br />
            Паша в шоке:
            <br /><br />— Ты что наделал?! Это ноутбук родителей! Он стоит 150 000 ₽!
            Они меня убьют!
            <br /><br />
            Дима покраснел:
            <br /><br />— Я заплачу… правда… Но у меня только 5000 ₽ накоплено.
            <br /><br />
            Он позвонил маме в панике. Мама сказала:
            <br /><br />— У нас есть страховка «Квартира». Я застраховала имущество:
            мебель, и даже технику. Может, она покроет?
          </p>
        </div>
      </div>

      {/* === Вопрос с вариантами ответов === */}
      <div className="quiz-question">
        <h3 className="quiz-question-title">
          Посмотри на картинку и найди её на сайте. Ознакомься с содержимым и
          выбери вариант ответа. Как ты думаешь, покроет ли стандартная
          страховка «Квартира» ущерб, который Дима случайно нанёс чужому
          ноутбуку в антикафе?
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

export default Question4;
