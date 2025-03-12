import React from "react";
import heroImage from "../../assets/images/bank-tree.webp";
import Hero from "../../components/Hero/Hero";
import FeatureContainer from "../../components/Feature/Feature-container";

export default function Home() {
  return (
    <div>
      <Hero imgSrc={heroImage} />
      <FeatureContainer />
    </div>
  );
}
