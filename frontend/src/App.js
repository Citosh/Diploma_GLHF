import  { AppBar, Toolbar, IconButton } from "@mui/material"
import { Container } from "@mui/system";
import {MenuBook} from "@mui/icons-material"

import './App.css';

function App() {
  return (
    <AppBar position="fixed">
      <Container fixed>
        <Toolbar>
          <IconButton aria-label="add an alarm"><MenuBook/> </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default App;
