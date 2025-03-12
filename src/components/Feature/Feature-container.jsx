import Feature from "../../components/Feature/Feature";
import imgSrc from "../../assets/images/icon-chat.webp";
import imgSrc2 from "../../assets/images/icon-money.webp";
import imgSrc3 from "../../assets/images/icon-security.webp";
import styles from "./Feature.module.scss";

export default function FeatureContainer() {
  return (
    <div className={styles.featureContainer}>
      <Feature
        title="Features"
        subtitles="You are our #1 priority"
        imgSrc={imgSrc}
        description=" Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes."
      />
      <Feature
        title="Features"
        subtitles="More savings means higher rates"
        imgSrc={imgSrc2}
        description=" The more you save with us, the higher your interest rate will be!."
      />
      <Feature
        title="Features"
        subtitles="Security you can trust"
        imgSrc={imgSrc3}
        description="We use top of the line encryption to make sure your data and money
            is always safe."
      />
    </div>
  );
}
