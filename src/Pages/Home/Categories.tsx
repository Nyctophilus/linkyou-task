import { Card, CardTitle } from "@/components/ui/card";
import { CarouselComponent } from "@/components/ui/carousel";
import categories from "@/data/categories";

const Categories = () => {
  return (
    <section className="my-8">
      <h2 className="container text-main font-bold text-[17px] md:text-[22px] xl:text-[28px] pb-4">
        الفئات
      </h2>

      {window.innerWidth < 768 && (
        <CarouselComponent
          categories
          className="h-[144px] pe-[10px]"
          items={categories}
          autoplay={false}
        />
      )}

      {window.innerWidth >= 768 && (
        <div className="grid grid-cols-3 gap-x-[78px] gap-y-4 container">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="group py-[5px] px-[14px] rounded-xl flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-[25px] [box-shadow:0px_4px_4px_0px_#00000040] border-transparent hover:border-main-foreground transition-colors duration-300"
            >
              <img src={category.img} alt={category.title} />
              <CardTitle className="grow text-main font-normal text-[22px] text-center group-hover:font-bold group-hover:scale-105 duration-300 transition-transform ">
                {category.title}
              </CardTitle>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
export default Categories;
