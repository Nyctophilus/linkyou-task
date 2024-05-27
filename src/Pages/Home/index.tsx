import Categories from "./Categories";
import HeroSection from "./HeroSection";
import ItemsList from "./ItemsList";

const HomePage = () => {
  return (
    <section className="min-h-screen">
      <HeroSection />

      <Categories />

      <ItemsList title="أدوات أخري" />
      <ItemsList title="مركبات و سيارات" />
      <ItemsList title="عقارات" />
      <ItemsList title="موبايلات و تابلت" />
    </section>
  );
};
export default HomePage;
