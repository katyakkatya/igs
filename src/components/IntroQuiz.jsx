import kidsImage from "../assets/images/life__children-hero-banner.svg";

function IntroQuiz({ onNext, onBack }) {
  return (
    <div className="container">
      <div className="without-btn">
        <img
          src={kidsImage}
          alt="Дети на скейтборде в парке"
          className="intro-image"
        />
        <h1 className="intro-text">
          Хочешь получить скидку 10% на страхование? Тогда тебе предстоит побыть
          сыщиком: найти похожие изображения на нашем{" "}
          <a href="https://www.ingos.ru/ishop?directions=retail">сайте</a> и
          найти ответы на вопросы.
        </h1>
      </div>
      <div className="btn-row">
        <button
          className="next-button"
          onClick={onNext}
        >
          Далее
        </button>
        <button className="back-button" onClick={onBack}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default IntroQuiz;
