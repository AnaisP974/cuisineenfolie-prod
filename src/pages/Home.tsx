import Header from "../components/Header";
import Footer from "../components/Footer";
import App from "../components/App";
import Aside from "../components/Aside";

export default function Home() {
  return (
    <>
    <Header />
    <main>
      <Aside />
      <App />
    </main>
    <Footer />
    </>
  )
}
