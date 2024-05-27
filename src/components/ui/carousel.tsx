import * as React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

export function CarouselComponent({
  className,
  items,
  fullpage,
  autoplay = true,
  categories,
}: {
  className?: string;
  fullpage?: boolean;
  autoplay?: boolean;
  categories?: boolean;
  items: {
    title?: string;
    parag?: string;
    img: string;
    price?: string;
    location?: string;
    time?: string;
  }[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={autoplay ? [plugin.current] : undefined}
      className={cn("w-full", className)}
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
      dir="ltr"
    >
      <CarouselContent className="-ml-4">
        {items.map((item, index) => (
          <CarouselItem
            className={cn(
              "pl-[15px]",
              fullpage
                ? "basis-[92%] xl:basis-[90%]"
                : "basis-[33%] xl:basis-[20%]"
            )}
            key={index}
          >
            <Card
              className={cn(
                "bg-transparent",
                item.title
                  ? "border-main/50 shadow-xl"
                  : "h-[362px] xl:h-[528px] border-none shadow-none",
                categories &&
                  "[box-shadow:0px_4px_4px_0px_#00000040] border-none py-1 rounded-md h-[90%] hover:border-solid hover:border-main-foreground"
              )}
            >
              <CardContent
                className={cn(
                  "relative grid place-items-center p-0",
                  item.title ? "" : "h-[362px] xl:h-[528px]",
                  categories && "h-full"
                )}
              >
                {!item.title ? (
                  <img
                    src={item.img}
                    alt={`carousel image-${index}`}
                    className="absolute w-full h-full object-fill"
                  />
                ) : (
                  <>
                    <img
                      src={item.img}
                      alt={`carousel image-${index}`}
                      className={cn(
                        categories ? "pb-6" : "h-[228px] w-full object-fill"
                      )}
                    />
                    {!categories && (
                      <div className="w-full px-4 py-[13.5px] flex justify-between items-center text-main-foreground">
                        <span className="rounded-full shadow-md p-1.5">
                          <svg
                            width="24"
                            height="22"
                            viewBox="0 0 24 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.4 -3.05176e-05C15.312 -3.05176e-05 13.308 0.971087 12 2.50569C10.692 0.971087 8.688 -3.05176e-05 6.6 -3.05176e-05C2.904 -3.05176e-05 0 2.90133 0 6.59398C0 11.1259 4.08 14.8185 10.26 20.4294L12 22L13.74 20.4174C19.92 14.8185 24 11.1259 24 6.59398C24 2.90133 21.096 -3.05176e-05 17.4 -3.05176e-05ZM12.12 18.643L12 18.7629L11.88 18.643C6.168 13.4757 2.4 10.0588 2.4 6.59398C2.4 4.19616 4.2 2.39779 6.6 2.39779C8.448 2.39779 11.364 3.58471 12 5.22722C12.624 3.58471 15.552 2.39779 17.4 2.39779C19.8 2.39779 21.6 4.19616 21.6 6.59398C21.6 10.0588 17.832 13.4757 12.12 18.643Z"
                              fill="#DA9352"
                            />
                          </svg>
                        </span>
                        <p className="font-bold text-[17px] lg:text-[22px]">
                          $ {item.price}
                        </p>
                      </div>
                    )}
                    <div className="px-4 pb-2 flex flex-col gap-2 text-right w-full">
                      <h2
                        className={cn(
                          "text-p-parag font-bold text-[15px] lg:text-lg xl:text-2xl",
                          categories &&
                            "text-center text-[15px] xl:text-[16px] font-normal"
                        )}
                      >
                        {item.title}
                      </h2>
                      <p
                        dir="rtl"
                        className="text-[13px] lg:text-[16px] text-p-light font-normal text-base xl:text-xl line-clamp-2 [line-height:25px]"
                      >
                        {item.parag}
                      </p>

                      {!categories && (
                        <div className="flex justify-between">
                          <span className="flex gap-x-1 lg:gap-x-[10px] items-center">
                            <p className="text-[13px] lg:text-[14px] xl:text-[16px] text-p-light font-normal line-clamp-2">
                              {item.time}
                            </p>
                            <svg
                              width="19"
                              height="18"
                              viewBox="0 0 19 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="9.5"
                                cy="9"
                                r="7.5"
                                stroke="#D9904E"
                                strokeWidth="2.25"
                              />
                              <path
                                d="M9.5 4.71442V8.64857C9.5 8.84273 9.6574 9.00013 9.85156 9.00013H12.7143"
                                stroke="#D9904E"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <span className="flex gap-x-1 lg:gap-x-[10px] items-center">
                            <p className="text-[13px] lg:text-[14px] text-p-light font-normal">
                              {item.location}
                            </p>
                            <svg
                              width="11"
                              height="16"
                              viewBox="0 0 11 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.5 0.5C2.5975 0.5 0.25 2.8475 0.25 5.75C0.25 9.6875 5.5 15.5 5.5 15.5C5.5 15.5 10.75 9.6875 10.75 5.75C10.75 2.8475 8.4025 0.5 5.5 0.5ZM5.5 7.625C4.465 7.625 3.625 6.785 3.625 5.75C3.625 4.715 4.465 3.875 5.5 3.875C6.535 3.875 7.375 4.715 7.375 5.75C7.375 6.785 6.535 7.625 5.5 7.625Z"
                                fill="#D9904E"
                              />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
