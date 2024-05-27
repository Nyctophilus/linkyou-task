import footerLinks from "@/data/footer-links";
import { cn } from "@/lib/utils";
import StickyButton from "../ui/StickyButton";

const socialPlatforms = ["youtube", "tiktok", "instagram", "fb"];

export const Socials = ({
  className,
  spanClassName,
}: {
  className?: string;
  spanClassName?: string;
}) => (
  <div className={cn("py-2 px-5 flex justify-between items-center", className)}>
    {socialPlatforms.map((social) => (
      <span
        key={social}
        className={cn(
          "p-2 size-10 border border-white rounded-full grid place-items-center",
          spanClassName
        )}
      >
        <img src={`/assets/images/social/${social}.svg`} alt={`${social}`} />
      </span>
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-main py-4 mt-8 relative">
      <div className="container grid justify-items-start grid-cols-6 gap-x-2">
        <div className="flex flex-col gap-5 col-span-1">
          <img src="/assets/images/logo.svg" alt="logo" />
          <img src="/assets/images/google-play.png" alt="google play" />
          <img src="/assets/images/app-store.png" alt="app store" />
        </div>

        {footerLinks.map(({ name, path, children }) => (
          <div key={name} className="flex flex-col col-span-1">
            <a
              href={path}
              className="text-main-foreground text-lg font-semibold [line-height:40px]"
            >
              {name}
            </a>

            <ul className="list-inside list-disc">
              {children.map((child: { name: string; path?: string }) => (
                <a
                  key={child.name}
                  href={child.path}
                  className="text-white text-[15px] [line-height:40px] font-normal"
                >
                  <li className="ps-3"> {child.name}</li>
                </a>
              ))}
            </ul>
          </div>
        ))}

        <Socials
          className="flex-col gap-[22px] col-span-1 col-start-6"
          spanClassName="border-main-foreground"
        />
      </div>

      <StickyButton />

      <p className="text-white/25 [line-height:40px] text-center font-thin">
        تم التطوير من قبل لينك يو
      </p>
    </footer>
  );
};
export default Footer;
