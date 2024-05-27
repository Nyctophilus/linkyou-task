import HomePage from "./Pages/Home";
import Footer from "./components/Footer/Footer";
import FooterMobile from "./components/Footer/FooterMobile";
import Header from "./components/Header/Header";
import HeaderMobile from "./components/Header/HeaderMobile";

function App() {
  return (
    <>
      {window.innerWidth < 768 ? <HeaderMobile /> : <Header />}

      <HomePage />

      {window.innerWidth < 768 ? <FooterMobile /> : <Footer />}
    </>
  );
}

export default App;
