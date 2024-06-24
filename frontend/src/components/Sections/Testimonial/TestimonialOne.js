import SectionTitleOne from "../SectionTitle/SectionTitleOne";
import TestimonialSlider from "./Elements/TestimonialSlider";

export default function TestimonialOne({ data, style }) {
  return (
    <div className="testimonial" style={style}>
      <div className="container">
        <SectionTitleOne showSubTitle align="center" subTitle="TESTIMONIOS">
          ¿QUÉ ESTA DICIENDO LA GENTE?
        </SectionTitleOne>
        <TestimonialSlider data={data} showArrows />
      </div>
    </div>
  );
}
