import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Card from "../components/Card";
import { fetchCoffeeStores } from "../lib/coffee-store";
import useTrackLocation from "../hooks/useTrackLocation";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export const getStaticProps = async () => {
  const coffeeStores = await fetchCoffeeStores();
  return { props: { coffeeStores } };
};

const Home = (props) => {
  const { handleTrackLocation, isFindingLocation } = useTrackLocation();

  // const [fetchedCoffeeStores, setFetchedCoffeeStores] = useState([]);
  const { state, dispatch } = useContext(StoreContext);

  const handleClick = useCallback(() => {
    handleTrackLocation();
  }, [handleTrackLocation]);

  useEffect(() => {
    (async () => {
      if (state.latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(
            state.latLong,
            30
          );
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores: fetchedCoffeeStores },
          });

          // setFetchedCoffeeStores(fetchedCoffeeStores);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [dispatch, state.latLong]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Store Locator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleClick={handleClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/images/banner-image.png"
            width={700}
            height={400}
            alt=""
          />
        </div>
        {state.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {state.coffeeStores.map((store) => (
                <Card
                  key={store.fsq_id}
                  href={`/coffee-store/${store.fsq_id}`}
                  name={store.name}
                  imgUrl={
                    store.imgUrl ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                />
              ))}
            </div>
          </div>
        )}
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Delhi Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => (
                <Card
                  key={store.fsq_id}
                  href={`/coffee-store/${store.fsq_id}`}
                  name={store.name}
                  imgUrl={
                    store.imgUrl ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default Home;
