import React from "react";
import { AppBar, Box, Button } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Button color="inherit" component={Link} to={"/login"}>
            Login
          </Button>
          <Button color="inherit" component={Link} to={"/register"}>
            Register
          </Button>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
