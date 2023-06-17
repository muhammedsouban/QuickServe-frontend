import React, { useState, useEffect } from "react";
import "../../../components/user/home/home.css";
import Hero from "../Hero/hero";
import CategorySlider from "../Categorylist";
import MyCard from "./specialCards";
import Advt from "../advt/advt";
import { getMedia } from "../../../Api/userAPI";
function Home() {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        await getMedia().then(response => {
          setMedia(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div>
      {media && (
        <div>
          <Hero />
          <CategorySlider />
          <MyCard data={media.Cards[0]} />
          <Advt data={media.Adds[0]}/>
          <MyCard data={media.Cards[1]} />
          <Advt data={media.Adds[1]}/>
        </div>
      )}
    </div>
  );
}

export default Home;
