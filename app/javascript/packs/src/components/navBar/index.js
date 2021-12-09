import React, { useState } from "react";
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Box,
  Typography,
} from "@material-ui/core";
import { logOut } from "../../services/auth.services";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function Navbar({ user }) {
  const [loading, setLoading] = useState(true);

  const style = { margin: "1.25em 0.7em", color: "white", display: "block" };

  const handleLogout = () => {
    logOut().then(
      (res) => {
        setLoading(false);
        toast.success("Logged out Successfully");
        return Promise.resolve();
      },
      (error) => {
        setLoading(false);
        toast.error("Logout Unsuccessful");
        console.log(error);
        return Promise.reject();
      }
    );
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ marginRight: 2, flexGrow: 1}}
          >
            ReactonRails
          </Typography>
          <Box sx={{ flexGrow: 0, display: 'flex'}}>
            {!!user ? (
              <>
                <Button
                  onClick={handleLogout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </Button>
                <p style={style}>{user}</p>
              </>
            ) : (
              <>
                <Link to="/login" style={style}>
                  {" "}
                  Login{" "}
                </Link>
                <Link to="/signup" style={style}>
                  {" "}
                  Register{" "}
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Navbar.defaultProps = {
  user: null
}

Navbar.propTypes = {
  user: PropTypes.string,
}
