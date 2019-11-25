import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Destination from "../components/destination";
import Router from "next/router";
import { connect } from "react-redux";

// This page displays the Google Map component.
//
// TODO: Move GoogleMapObject to its own component

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
  // default latlng is set for Sydney CBD
  pos: {
    lat: -33.865143,
    lng: 151.2099
  },
  marker: null,
  initiateMap() {
    var googleMap;
    // load the map object
    if (this.map == null) {
      this.loadMap();
      // check if the map object has loaded then render the map
      this.loadMapApi.addEventListener("load", () => {
        googleMap = new Promise((resolve, reject) => {
          this.createGoogleMap();
          resolve(true);
        });
        googleMap.then(() => {
          // if possible, grab the current position, recentre map, and add marker
          this.getCurrentPosition();
        });
      });
    } else {
      googleMap = new Promise((resolve, reject) => {
        this.createGoogleMap();
        resolve(true);
      });
      googleMap.then(() => {
        // if possible, grab the current position, recentre map, and add marker
        this.getCurrentPosition();
      });
    }
  },
  loadMap() {
    this.loadMapApi = document.createElement("script");
    this.loadMapApi.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAyyadYv-nclpdXaBX6EzC7AHdJctr6ZNI`;
    window.document.body.appendChild(this.loadMapApi);
  },
  createGoogleMap() {
    const latlng = new window.google.maps.LatLng({
      lat: this.pos.lat,
      lng: this.pos.lng
    });
    this.map = new window.google.maps.Map(
      document.getElementById("google-map"),
      {
        zoom: 15,
        center: latlng,
        disableDefaultUI: true
      }
    );
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
      position: new window.google.maps.LatLng({
        lat: this.pos.lat,
        lng: this.pos.lng
      }),
      map: this.map
    });
  },
  removeMarker() {
    this.marker.setMap(null);
    this.marker = null;
  },
  centerMap() {
    const center = new google.maps.LatLng({
      lat: this.pos.lat,
      lng: this.pos.lng
    });
    this.map.panTo(center);
    this.createMarker();
  }
};

const Maps = ({ isAuthenticated }) => {
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
    if (!isAuthenticated) {
      Router.push("/login");
    }
    // Add some CSS to bring the autocomplete list over the modal
    map.initiateMap();
    addAutoCompleteCss();
  });
  return (
    <>
      <div className={classes.wrapper}>
        <Destination map={map} />
        <div className={classes.map} id="google-map">
          Loading
        </div>
      </div>
    </>
  );
};
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Maps);
