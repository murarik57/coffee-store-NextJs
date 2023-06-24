import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import { fetchCoffeeStores } from "../../lib/coffee-store";

export const getStaticPaths = async () => {
  // return {
  //   paths: [
  //     {
  //       params: {
  //         id: "0",
  //       },
  //     },
  //     {
  //       params: {
  //         id: "1",
  //       },
  //     },
  //   ],
  //   fallback: true, // false or "blocking"
  // };

  const coffeeStoresData = await fetchCoffeeStores();

  const paths = coffeeStoresData.map((coffeeStore) => ({
    params: {
      id: coffeeStore.fsq_id.toString(),
    },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === params.id; //dynamic id
      }),
    },
  };
};

const CoffeeStore = (props) => {
  const router = useRouter();
  const id = router.query.id;

  const handleUpvoteButton = useCallback(() => {
    alert("upvote");
  }, []);

  if (router.isFallback) {
    return <div>Loading</div>;
  }
  const { location, name, imgUrl } = props.coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={`${styles.col2} glass`}>
          <div className={styles.iconWrapper}>
            <Image
              alt=""
              src="/static/icons/places.svg"
              width="24"
              height="24"
            />
            <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt=""
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
            />
            <p className={styles.text}>
              {location.cross_street}
              {location.postcode},{location.region}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image alt="" src="/static/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
