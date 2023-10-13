import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Topbar from "./components/Topbar";
import Icons from "./components/Icons";
import ImageSwapper from "./components/Avatar";


function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <main className="content">
            <Icons />
            <Topbar />
            <ImageSwapper />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
