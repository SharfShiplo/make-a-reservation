import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layouts";
import AllPages from "./components/pages";

function App() {
  return (
    <Layout>
      <Router>
        <AllPages/>
      </Router>
    </Layout>
  );
}

export default App;
