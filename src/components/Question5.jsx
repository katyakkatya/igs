import { useState, useEffect } from 'react';

const questionAnswers = [
  {
    id: 'A',
    text: 'Нет, не может. Подарочные сертификаты в Ингосстрахе существуют, но их можно потратить только на страхование квартиры или машины. Для страховки путешественника они не подходят.',
    correct: false,
    explanation:
      'Сертификат подходит на любые страховые продукты, включая путешествия.',
  },
  {
    id: 'B',
    text: 'Да, может, но только если Дима сам оформит страховку на имя Коли, а сертификат использует как способ оплаты. Передать уже купленный сертификат другому человеку нельзя — только потратить его на покупку для другого.',
    correct: false,
    explanation:
      'В этом варианте сказано, что нельзя передать уже купленный сертификат. Это ложь. Передать можно.',
  },
  {
    id: 'C',
    text: 'Нет, не может. Подарочный сертификат можно использовать только для себя. Передавать другому человеку запрещено правилами страховой компании.',
    correct: false,
    explanation:
      'Сертификат подарочный, он как раз и предназначен для подарка кому-то.',
  },
  {
    id: 'D',
    text: 'Да, может. Коля сам активирует сертификат и выберет любую страховку. Никаких ограничений по родству нет.',
    correct: true,
    explanation:
      'Верно! На странице «Подарочные сертификаты» в разделе «Вопросы и ответы» есть прямой ответ: «Я могу отдать подарочный сертификат другому человеку? — Да, вы можете передать сертификат другому человеку».',
  },
];

function Question5({ onNext, onBack, savedAnswer, onAnswer }) {
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
          src="https://cdn.ingos.ru/images/gift-certificate__herobanner.svg"
          alt="Подарочный сертификат"
        />
        <div className="q-story1">
          <h2 className="q-story1-header">Это всё развод</h2>
          <p className="q-story1-text">
            Коля никогда не верил в страховку.
            <br /><br />
            — Это развод, — говорил он другу Диме. — Деньги на ветер. Со мной
            ничего не случится.
            <br /><br />
            Дима подарил Коле на день рождения подарочный сертификат
            Ингосстраха. Коля скривился, но решил: «Раз уж подарили, надо
            использовать». Он зашёл на сайт, ввёл номер и ПИН-код и оформил
            страховку путешественника на поездку в Италию — как раз на время
            соревнований по самокату.
            <br /><br />
            Через две недели Коля был в Риме. В первый же вечер он съел острую
            пиццу с морепродуктами. Ночью его разбудила жуткая боль в животе.
            Температура — 39, тошнота, каждое движение — пытка.
            <br /><br />
            Тренер вызвал скорую. В больнице сказали:
            <br /><br />— Острый панкреатит. Нужна срочная госпитализация и
            капельницы. Счёт — около 3000 евро.
            <br /><br />
            Коля похолодел. У него не было таких денег. А потом он вспомнил: у
            меня же есть страховка!
            <br /><br />
            Он открыл приложение Ингосстраха, нажал «Страховой случай» и
            приложил справку из больницы.
            <br /><br />
            Через час пришёл ответ: «Лечение оплачено.».
            <br /><br />
            Колю пролечили за три дня. Счёт в 3000 евро полностью покрыла
            страховка, которую он оформил по подарочному сертификату.
            <br /><br />
            Вернувшись в Москву, Коля сказал Диме:
            <br /><br />— Твой подарок спас меня. Страховка — это не развод. Это самый
            полезный подарок в моей жизни.
            <br /><br />
            Дима улыбнулся:
            <br /><br />— Я же говорил. На следующий год тоже жди сертификат.
          </p>
        </div>
      </div>

      {/* === Вопрос с вариантами ответов === */}
      <div className="quiz-question">
        <h3 className="quiz-question-title">
          Посмотри на картинку и найди её на сайте. Ознакомься с содержимым и
          выбери вариант ответа.
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

export default Question5;
