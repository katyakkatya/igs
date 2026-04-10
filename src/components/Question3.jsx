import { useState, useEffect } from 'react';

const questionAnswers = [
  {
    id: 'A',
    text: 'Да, страховая выплатит. Внезапная болезнь до вылета (ветрянка, грипп, перелом и т.д.) — это страховой случай по полису «Страховка от невыезда». Компания вернёт стоимость билетов и отеля, даже если они невозвратные.',
    correct: true,
    explanation:
      'Верно! Страховка от невыезда покрывает болезнь — любую, включая ветрянку, если есть справка от врача. А также отказ в визе и другие причины (если всё включено).',
  },
  {
    id: 'B',
    text: 'Нет, не выплатит. Страховка от невыезда покрывает только отказ в визе или травму, полученную до вылета. Ветрянка (инфекционное заболевание) не входит в список страховых случаев.',
    correct: false,
    explanation:
      'В правилах страхования от невыезда у «Ингосстраха» болезнь (включая инфекционные заболевания, подтверждённые врачом) — это страховой случай. Ветрянка подходит.',
  },
  {
    id: 'C',
    text: 'Нет, не выплатит. Страховка от невыезда действует только если поездка отменяется из-за самого путешественника (например, он передумал). А болезнь — это не страховой случай.',
    correct: false,
    explanation:
      'Страховка от невыезда действует как раз когда ты не можешь поехать по независящим причинам (болезнь, отказ в визе, смерть родственника). Если просто передумал — страховая не платит.',
  },
  {
    id: 'D',
    text: 'Выплатит, но только часть — например, стоимость отеля, но не билеты. Билеты страховая никогда не возвращает.',
    correct: false,
    explanation:
      'Страховка покрывает и билеты, и отель (в пределах страховой суммы). Нет правила, что билеты не возвращаются.',
  },
];

function Question3({ onNext, onBack, savedAnswer, onAnswer }) {
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
          src="https://cdn.ingos.ru/images/travel-neviezd-herobanner.svg"
          alt="Отмена поездки"
        />
        <div className="q-story1">
          <h2 className="q-story1-header">Ветрянка вместо моря</h2>
          <p className="q-story1-text">
            Дима с родителями купил путёвку в Турцию на 10 дней. Билеты и отель
            — невозвратные. Общая стоимость — 120 000 ₽.
            <br /><br />
            За неделю до вылета у Димы поднялась температура, а потом всё тело
            покрылось красными пятнами. Врач сказал:
            <br /><br />— Это ветрянка. Лететь нельзя. Минимум две недели карантина.
            <br /><br />
            Мама расстроилась: деньги пропали. Но папа вспомнил:
            <br /><br />— Мы же оформляли страховку от невыезда! Когда покупали тур,
            нам предложили доплатить 5500 ₽ — и мы согласились.
            <br /><br />
            Дима открыл приложение Ингосстраха, нашёл полис. Там было написано:
            «Страховой случай — заболевание, подтверждённое врачом,
            препятствующее выезду».
            <br /><br />
            Он нажал «Страховой случай», приложил справку от врача и
            подтверждение от туроператора, что деньги не возвращают.
          </p>
        </div>
      </div>

      {/* === Вопрос с вариантами ответов === */}
      <div className="quiz-question">
        <h3 className="quiz-question-title">
          Посмотри на картинку и найди её на сайте. Ознакомься с содержимым и
          выбери вариант ответа. Как думаешь, выплатит ли страховая компания все
          деньги?
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

export default Question3;
