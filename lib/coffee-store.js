import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (query, latlong, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

const getListOfCoffeeStoresPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls.small);
};

export const fetchCoffeeStores = async (
  latLong = "28.7041%2C77.1025",
  limit = 6
) => {
  const photos = await getListOfCoffeeStoresPhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOUR_SQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("coffee", latLong, limit),
    options
  );
  const data = await response.json();

  return data.results.map((result, i) => ({
    ...result,
    imgUrl: photos.length > 0 ? photos[i] : null,
  }));
};
