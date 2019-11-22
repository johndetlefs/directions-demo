import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Destination from "../components/destination";
import Nav from "../components/navbar";

const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    display: "grid",
    gridTemplateRows: "1fr min-content",
    gridRowGap: "0px",
    gridColumnGap: "0px",
    gridTemplateAreas: `"navbar" "map"`
  },
  map: {
    gridArea: "map",
    height: "calc(100vh - 64px)"
  }
}));
const googleMapObject = {
  loadMapApi: null,
  map: null,
  pos: {
    lat: -33.865143,
    lng: 151.2099
  },
  marker: null,
  initiateMap(googleMapRef) {
    // load the map object
    this.loadMap();
    // check if the map object has loaded then render the map
    this.loadMapApi.addEventListener("load", () => {
      var googleMap = new Promise((resolve, reject) => {
        this.createGoogleMap(googleMapRef);
        resolve(true);
      });
      googleMap.then(() => {
        // if possible, grab the current position, recentre map, and add marker
        this.getCurrentPosition();
      });
    });
  },
  loadMap() {
    this.loadMapApi = document.createElement("script");
    this.loadMapApi.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAyyadYv-nclpdXaBX6EzC7AHdJctr6ZNI`;
    window.document.body.appendChild(this.loadMapApi);
  },
  createGoogleMap(googleMapRef) {
    this.map = new window.google.maps.Map(googleMapRef.current, {
      zoom: 15,
      center: this.pos,
      disableDefaultUI: true
    });
  },
  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.centerMap();
      });
    }
  },
  createMarker() {
    this.marker = new window.google.maps.Marker({
      position: this.pos,
      map: this.map
    });
  },
  removeMarker() {
    this.marker.setMap(null);
    this.marker = null;
  },
  centerMap() {
    const center = new google.maps.LatLng(this.pos.lat, this.pos.lng);
    this.map.panTo(center);
    this.createMarker();
  }
};
const Maps = props => {
  const googleMapRef = React.createRef();
  const classes = useStyles();
  const map = googleMapObject;
  const addAutoCompleteCss = () => {
    var style = document.createElement("style");
    style.innerHTML = `
  .pac-container {
  z-index: 9999 !important
  }
  `;
    document.head.appendChild(style);
  };
  useEffect(() => {
    if (map.map == null) {
      map.initiateMap(googleMapRef);
      addAutoCompleteCss();
    }
  });
  return (
    <>
      <div className={classes.wrapper}>
        <Destination map={map} />
        <div className={classes.map} id="google-map" ref={googleMapRef} />
      </div>
    </>
  );
};
export default Maps;