import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Layout from "./components/layouts";
import AllPages from "./components/pages";
import LocaleProvider from "./i18n/locale-provider";

function App() {
  return (
    <RecoilRoot>
      <LocaleProvider>
        <Layout>
          <Router>
            <AllPages />
          </Router>
        </Layout>
      </LocaleProvider>
    </RecoilRoot>
  );
}

export default App;
