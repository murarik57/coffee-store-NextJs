import React, { useCallback } from "react";
import { useRouter } from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";

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

  const paths = coffeeStoresData.map((coffeeStore) => ({
    params: {
      id: coffeeStore.id.toString(),
    },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;

  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
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
  const { address, name, neighbourhood, imgUrl } = props.coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
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
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt=""
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
            />
            <p className={styles.text}>{neighbourhood}</p>
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
