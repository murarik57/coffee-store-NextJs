import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import { useCallback } from "react";
import Image from "next/image";
import Card from "../components/Card";
import coffeeStoresData from "../data/coffee-stores.json";

export const getStaticProps = async () => {
  return { props: { coffeeStores: coffeeStoresData } };
};

const Home = (props) => {
  const handleClick = useCallback(() => {
    alert("hi");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Store Locator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={"View stores nearby"} handleClick={handleClick} />
        <div className={styles.heroImage}>
          <Image
            src="/static/images/banner-image.png"
            width={700}
            height={400}
            alt=""
          />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => (
                <Card
                  key={store.id}
                  href={`/coffee-store/${store.id}`}
                  name={store.name}
                  imgUrl={store.imgUrl}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};
export default Home;
