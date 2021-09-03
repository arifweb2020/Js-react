import sliderFirst from "../Images/sliderFirst.svg";
import icon from "../Images/slider-light-icon.png";
import background from '../Images/slider-bg.png';
import wp from "../Images/wp-icon.png";
import icon2 from "../Images/port-icon.png";

const tips = [
    {
        "Type": "WeAreBuilding",
        "imgUrl": sliderFirst,
        "header": "WHAT WE ARE BUILDING",
        "subHeader": "An investing experience for succesful professionals like you",
        "footerText": "HEAR FROM OUR CO-FOUNDER",
        "footerUrl": ""
    },
    {
        "Type": "ProTip",
        "imgUrl": icon,
        "header": "PRO TIP",
        "subHeader": "It's always a good idea to start small",
        "footerText": "Dismiss",
        "footerUrl": null
    },
    {
        "Type": "ReadNow",
        "imgUrl": background,
        "header": "nul",
        "subHeader": "What’s holding you back from reaching your long-term financial goals",
        "footerButtonText": "Read Now",
        "footerUrl": null
    },
    {
        "Type": "WhatsApp",
        "imgUrl": icon2,
        "header": "Reach out to an expert",
        "subHeader": "Any investment query answered",
        "footerText": "WhatsApp now",
        "footerUrl": wp
    }
]

export default tips



import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import icon from "./../../assets/Images/slider-light-icon.png";
import icon1 from "./../../assets/Images/check.png";
import icon2 from "./../../assets/Images/port-icon.png";
import wp from "./../../assets/Images/wp-icon.png";
import sliderFirst from "../../assets/Images/sliderFirst.svg";
import play from "../../assets/Images/playButton.svg";
import ExpertTips from "../../assets/local/sliderData";
import "./ExpertSlider.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class ExpertSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { additionalTransfrom: 0 };
  }

  componentDidMount() {
    console.log(ExpertTips);
  }

  render() {
    const CustomSlider = ({ carouselState }) => {
      let value = 0;
      let carouselItemWidth = 0;
      if (this.Carousel) {
        carouselItemWidth = this.Carousel.state.itemWidth;
        const maxTranslateX = Math.round(
          carouselItemWidth *
            (this.Carousel.state.totalItems -
              this.Carousel.state.slidesToShow) +
            150
        );
        value = maxTranslateX / 100;
      }
      const { transform } = carouselState;
      return (
        <div className="custom-slider">
          <input
            type="range"
            value={Math.round(Math.abs(transform) / value)}
            // defaultValue={0}
            max={
              (carouselItemWidth *
                (carouselState.totalItems - carouselState.slidesToShow) +
                (this.state.additionalTransfrom === 150 ? 0 : 150)) /
              value
            }
            onChange={(e) => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false;
              }
              const nextTransform = e.target.value * value;
              const nextSlide = Math.round(nextTransform / carouselItemWidth);
              if (
                e.target.value === 0 &&
                this.state.additionalTransfrom === 150
              ) {
                this.Carousel.isAnimationAllowed = true;
                this.setState({ additionalTransfrom: 0 });
              }
              this.Carousel.setState({
                transform: -nextTransform, // padding 20px and 5 items.
                currentSlide: nextSlide,
              });
            }}
            className="custom-slider__input"
          />
        </div>
      );
    };
    return (
      <Carousel
        ssr={false}
        ref={(el) => (this.Carousel = el)}
        partialVisbile={false}
        customButtonGroup={<CustomSlider />}
        itemClass="slider-image-item"
        responsive={responsive}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={-this.state.additionalTransfrom}
        beforeChange={(nextSlide) => {
          if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
            this.setState({ additionalTransfrom: 150 });
          }
          if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
            this.setState({ additionalTransfrom: 0 });
          }
        }}
      >
        {ExpertTips.map( (tip, index) => {
          let component;
          switch(tip.Type) {
            case "WeAreBuilding":
              component = (
                <div className="image-container increase-size itemGapFirst">
                  <div className="sliderBody">
                    <div className="card-body">
                      <div className="topHeading firstSilderHeading">
                        <h5 className="card-title">{tip.header}</h5>
                        <img src={tip.imgUrl} alt="sliderFirst" />
                      </div>
                      <p className="innertext" style={{ width: "216px" }}>
                        {tip.subHeader}
                      </p>
                      <div className="hor-line"></div>
                      <div className="card-bottom firstBottomSlider">
                        <p className="dismiss">{tip.footerText}</p><span className="btnWraper"><img src={play} alt="play"/></span>
                      </div>
                    </div>
                  </div>
                </div>)
              break;
            case "ProTip":
              component = (
                <div className="increase-size itemGapSecond">
                  <div className="sliderBody">
                    <div className="card-body">
                      <div className="topHeading">
                        <h5 className="card-title">{tip.header}</h5>
                        <img src={tip.imgUrl} alt="icon" />
                      </div>
                      <p className="innertext" style={{ width: "216px" }}>
                        {tip.subHeader
                          ? tip.subHeader
                          : ""}
                      </p>
                      <div className="hor-line"></div>
                      <div className="card-bottom">
                        <p className="dismiss">{tip.footerText}</p>
                      </div>
                    </div>
                  </div>
                </div>)
              break;
            case "ReadNow":
              component=(
                <div className="increase-size sliderCardthird">
                  <div className="sliderBody bg" style={{backgroundImage: `url(${tip.imgUrl})`}}>
                    <div className="card-body">
                      <p className="bgInnertext">
                        {tip.subHeader}
                      </p>
                      <div className="btn">
                        <button>
                          <span className="bgButton">{tip.footerButtonText}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)
              break;
            case "WhatsApp":
              component=(
                <div className="increase-size sliderCardSpacefSecond">
                  <div className=" sliderBody black">
                    <div className="card-body ">
                      <div className="topHeading">
                        <h4 className="card-title">{tip.header}</h4>
                        <img src={tip.imgUrl} width="35" alt="icon2" />
                      </div>
                      <p className="innertext2">{tip.subHeader}</p>
                      <div className="hor-line"></div>
                      <div className="card-bottom">
                        <p className="wp">
                          <img src={tip.footerUrl} alt="WA" /> {tip.footerText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>)
              break;
            default:
              component=<div></div>
              break;
          } 
          return (
            component
          )
        })}
      </Carousel>
    );
  }
}

export default ExpertSlider;
