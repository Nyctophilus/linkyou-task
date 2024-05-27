import footerLinks from "@/data/footer-links";
import { AccordionComponent } from "../ui/accordion";
import { Socials } from "./Footer";
import StickyButton from "../ui/StickyButton";

const FooterMobile = () => {
  return (
    <footer className="bg-main py-1 mt-4 rounded-t-[10px]">
      <div className="container">
        <img src="/assets/images/logo.svg" alt="logo" className="mx-auto" />
        <Socials className="mb-4" />

        <AccordionComponent items={footerLinks} />

        <div className="flex justify-between items-center mt-5">
          <img src="/assets/images/google-play.png" alt="google play" />
          <img src="/assets/images/app-store.png" alt="app store" />
        </div>

        <StickyButton />

        <p className="text-white/25 [line-height:20px] text-center text-xs font-thin">
          تم التطوير من قبل لينك يو
        </p>
      </div>
    </footer>
  );
};
export default FooterMobile;
