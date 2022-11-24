import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Layout from "./components/layouts";
import AllPages from "./components/pages";

function App() {
  return (
    <RecoilRoot>
      <Layout>
        <Router>
          <AllPages />
        </Router>
      </Layout>
    </RecoilRoot>
  );
}

export default App;
