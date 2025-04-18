import React from "react";
import heroImage from "../../assets/images/bank-tree.webp";
import FeatureContainer from "../../components/Feature/Feature-container";
import Hero from "../../components/Hero/Hero";

export default function Home() {
  return (
    <div>
      <Hero imgSrc={heroImage} />
      <FeatureContainer />
    </div>
  );
}
