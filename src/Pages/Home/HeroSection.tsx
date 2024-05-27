import { CarouselComponent } from "@/components/ui/carousel";
import { heroImages } from "@/data/carousels-data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const imageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const HeroSection = () => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => {
        if (prev === 11) return 0;

        return (prev += 1);
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {window.innerWidth < 768 && (
        <div className="h-[326px] relative">
          <motion.img
            key={activeImage}
            src={`/assets/images/hero/${activeImage}.jpeg`}
            alt="A changing image"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            className="h-full w-full absolute inset-0 object-fill"
          />
        </div>
      )}

      {window.innerWidth >= 768 && (
        <CarouselComponent className="pt-2.5" fullpage items={heroImages} />
      )}
    </>
  );
};
export default HeroSection;
