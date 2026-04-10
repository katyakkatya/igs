import { useState, useEffect } from 'react';

const questionAnswers = [
  {
    id: 'A',
    text: 'Да, конечно.',
    correct: true,
    explanation:
      'Верно! Телефон застрахован как личное имущество, а падение с парты — это страховой случай. В полисе «Страхование квартиры» можно застраховать личное имущество (телефон, ноутбук, самокат), и оно защищено даже вне квартиры — если это указано в договоре.\nПадение, кража, пожар, залив — всё это страховые случаи.\nНеосторожность не считается умыслом. Дима не бил телефон специально.',
  },
  {
    id: 'B',
    text: 'Нет, страховая не платит за неосторожность. Дима сам виноват, что дёрнулся.',
    correct: false,
    explanation: 'Страховая как раз платит за случайную неосторожность. Умысел — не платит.',
  },
  {
    id: 'C',
    text: 'Нет, потому что страховка квартиры действует только когда Дима находится дома, а в школе — не действует.',
    correct: false,
    explanation: 'Многие полисы «Квартиры» покрывают вещи и вне дома, если это отдельно прописано.',
  },
  {
    id: 'D',
    text: 'Частично да, но только если Дима докажет, что телефон упал не из-за его невнимательности.',
    correct: false,
    explanation: 'Доказывать ничего не надо. Страховой случай наступил — страховая платит.',
  },
];

function Question1({ onNext, onBack, savedAnswer, onAnswer }) {
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
          <h2 className="q-story1-header">Дорогой кирпич</h2>
          <p className="q-story1-text">
            Дима сидел на последней парте и смотрел видео с трюками на самокате.
            Учительница объясняла физику, но Дима был далёк от законов Ньютона.
            <br /><br />
            — Дим, к доске! — неожиданно сказала она. Дима вздрогнул, дёрнулся,
            телефон выскочил из рук, полетел с парты экраном вниз и встретился с
            кафельным полом. <br /><br />
            БАМ! <br /><br />
            Экран разбился вдребезги. Сенсор не работал. Телефон превратился в
            дорогой кирпич. <br /><br />
            Дома Дима показал маме погибший смартфон. Мама вздохнула и сказала:
            <br /><br />— Хорошо, что полгода назад я оформила «Страхование
            квартиры» и вписала туда твой телефон как личное имущество.
          </p>
        </div>
      </div>

      {/* === Вопрос с вариантами ответов === */}
      <div className="quiz-question">
        <h3 className="quiz-question-title">
          Посмотри на картинку и найди её на сайте. Ознакомься с содержимым и
          выбери вариант ответа. Как ты думаешь, выплатит ли страховая деньги
          на ремонт экрана?
        </h3>

        <div className="answers-list">
          {questionAnswers.map((answer) => {
            const isSelected = answer.id === selectedId;

            return (
              <div key={answer.id} className="answer-item">
                <button
                  className={`answer-btn ${
                    isSelected ? (answer.correct ? 'answer-correct' : 'answer-wrong') : ''
                  }`}
                  onClick={() => handleSelect(answer.id)}
                >
                  <span className="answer-letter">{answer.id})</span> {answer.text}
                </button>

                {isSelected && (
                  <div
                    className={`answer-explanation ${
                      answer.correct ? 'exp-correct' : 'exp-wrong'
                    }`}
                  >
                    {answer.explanation.split('\n').map((line, i) =>
                      line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* ================================ */}

      <div className='btn-section'>
        <div className='btn-row'>
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

export default Question1;
