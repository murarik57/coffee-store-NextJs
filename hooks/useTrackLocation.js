import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

const useTrackLocation = () => {
  // const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(StoreContext);

  const sucess = (position) => {
    const { latitude, longitude } = position.coords;

    // setLatLong(`${latitude},${longitude}`);

    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {
        latLong: `${latitude},${longitude}`,
      },
    });
    setIsFindingLocation(false);
  };

  const error = (error) => {
    let msg;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        msg = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        msg = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        msg = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        msg = "An unknown error occurred.";
        break;
    }
    setLatLong("");
    setIsFindingLocation(false);
    alert(msg);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sucess, error);
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsFindingLocation(false);
    }
  };
  return {
    // latLong,
    handleTrackLocation,
    isFindingLocation,
  };
};

export default useTrackLocation;
