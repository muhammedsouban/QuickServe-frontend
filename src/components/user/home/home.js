import React, { useState, useEffect } from "react";
import "../../../components/user/home/home.css";
import Hero from "../Hero/hero";
import CategorySlider from "../Categorylist";
import MyCard from "./specialCards";
import Advt from "../advt/advt";
import { getMedia } from "../../../Api/userAPI";
import Loader from "../../Loader";
function Home() {
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        await getMedia().then(response => {
          setMedia(response.data);
          setLoading(false)
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <>
      {loading ?
        <Loader />
        : <div>
          {media && (
            <div>
              <Hero data={media.banner[0]} />
              <CategorySlider />
              <MyCard data={media.Cards[0]} />
              <Advt data={media.Adds[0]} />
              <MyCard data={media.Cards[1]} />
              <MyCard data={media.Cards[2]} />
              <Advt data={media.Adds[1]} />
              <MyCard data={media.Cards[3]} />

            </div>
          )}
        </div>}
    </>
  );
}

export default Home;
