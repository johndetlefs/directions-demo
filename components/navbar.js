import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logoutUser } from "../src/actions";

// Navbar component using Material UI AppBar component.
// The main use here is for the logout button.

const useStyles = makeStyles(theme => ({
  navbar: {
    gridArea: "navbar"
  },
  title: {
    flexGrow: 1
  }
}));

const Nav = ({ isLoggingOut, isAuthenticated, dispatch }) => {
  const classes = useStyles();
  return (
    <div className={classes.navbar}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Demo Directions App
          </Typography>
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Nav);
