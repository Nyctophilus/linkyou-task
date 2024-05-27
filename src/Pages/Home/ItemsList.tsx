import { CarouselComponent } from "@/components/ui/carousel";
import { items } from "@/data/carousels-data";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const ItemsList = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="container flex justify-between py-4">
        <h2 className="text-main font-bold text-[17px] md:text-[22px] xl:text-[28px]">
          {title}
        </h2>

        <div className="flex gap-2 justify-center">
          <p className="text-main font-normal text-[17px] md:text-[22px] xl:text-[28px]">
            مشاهدة الكل
          </p>
          <ChevronLeftIcon className="size-6 xl:h-10 xl:w-8 text-main" />
        </div>
      </div>
      <CarouselComponent items={items} autoplay={false} />
    </div>
  );
};
export default ItemsList;
