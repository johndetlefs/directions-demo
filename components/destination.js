import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { ENTERED } from "react-transition-group/Transition";

// This component displays the Material UI FAB button, which when clicked reveals a modal where
// the desired destination can be entered.
//
// The input uses the Google Places Autocomplete API to find possible destinations.

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: "30px",
    right: "30px",
    zIndex: 9999
    // backgroundColor: "blue"
  }
}));
const AutocompleteDirectionsHandler = {
  map: null,
  travelMode: "DRIVING",
  directionsService: null,
  directionsRenderer: null,
  setRenderMap() {
    this.directionsRenderer.setMap(this.map);
  },
  createRoute() {
    if (!this.origin || !this.destination) {
      return;
    }
    this.directionsService.route(
      {
        origin: this.origin,
        destination: this.destination,
        travelMode: this.travelMode
      },
      (response, status) => {
        if (status === "OK") {
          this.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
};
var originAutocomplete;
var myRoute;

const Destination = props => {
  const classes = useStyles();
  const [_open, setOpen] = useState(false);
  const [_destination, setDestination] = useState("");
  const [_rendered, setRendered] = useState(false);
  const map = props.map;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDestination("");
  };

  const addAutocomplete = () => {
    var originInput = document.querySelector("input#destination");
    var options = {
      componentRestrictions: { country: "au" }
    };
    originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      options
    );
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["address_components", "formatted_address"]);
    originAutocomplete.addListener("place_changed", () => {
      setDestination(originAutocomplete.getPlace().formatted_address);
    });
  };
  const renderDirections = () => {
    if (_rendered == false) {
      myRoute = AutocompleteDirectionsHandler;
      myRoute.map = map.map;
      myRoute.directionsService = new google.maps.DirectionsService();
      myRoute.directionsRenderer = new google.maps.DirectionsRenderer();
      myRoute.setRenderMap();
      if (map.marker != null) {
        map.removeMarker();
      }
      setRendered(true);
    }
    myRoute.origin = `${map.pos.lat},${map.pos.lng}`;
    myRoute.destination = _destination;
    myRoute.createRoute();
  };

  return (
    <>
      <Fab className={classes.fab} color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        onEntered={addAutocomplete}
        fullWidth={true}
        maxWidth="sm"
        open={_open}
        onClose={handleClose}
        aria-labelledby="add new person"
      >
        <DialogTitle id="form-dialog-title">New Destination</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter in the full address of your destination
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="destination"
            label="Destination"
            type="text"
            fullWidth
            value={_destination}
            onChange={e => {
              setDestination(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={e => {
              e.preventDefault;
              if (_destination.length > 0) {
                handleClose();
                renderDirections();
              } else {
                console.log("Details aren't correct - can't submit!");
              }
            }}
            color="primary"
          >
            Let's go!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Destination;
