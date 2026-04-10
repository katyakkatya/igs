import kidsImage from "../assets/images/life__children-hero-banner.svg";

function Intro({ onNext }) {
  return (
    <div className="container">
      <div className="without-btn">
        <img
          src={kidsImage}
          alt="Дети на скейтборде в парке"
          className="intro-image"
        />
        <h1 className="intro-text">
          Привет! Хочешь разобраться в теме страхования? Мы тебе поможем сделать
          это просто и интересно!
        </h1>
      </div>
      <button className="next-button" onClick={onNext}>
        Далее
      </button>
    </div>
  );
}

export default Intro;
