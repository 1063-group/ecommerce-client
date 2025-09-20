import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import SubNavbar from "./components/shared/SubNavbar";

function App() {
  const [lang, setLang] = useState("Ўзб");

  return (
    <>
      <Header />
      <SubNavbar lang={lang} onLangChange={setLang} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
