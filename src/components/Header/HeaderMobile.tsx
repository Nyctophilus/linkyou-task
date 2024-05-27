import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/data/nav-links";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeaderMobile = () => {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <header className="bg-main pt-14 pb-4">
      <div className="px-5 md:container flex justify-between items-center gap-4 h-10">
        <AnimatePresence>
          {!isSearch ? (
            <>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="grid place-items-center"
              >
                <Sheet>
                  <SheetTrigger>
                    <img
                      src="/assets/images/hamburger-menu.svg"
                      alt="menu icon"
                    />
                  </SheetTrigger>
                  <SheetContent className="bg-main text-main-foreground">
                    <SheetHeader>
                      <div className="flex flex-col pt-32 gap-4">
                        {navLinks.map((link) => (
                          <div key={link.name}>
                            <SheetTitle className="text-right">
                              {link.name}
                            </SheetTitle>
                          </div>
                        ))}
                      </div>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </motion.span>

              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </>
          ) : (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              type="search"
              name="search"
              id="search"
              placeholder="البحث عن السيارات، المنازل، الهواتف و أكثر..."
              className="w-full py-2 px-4 rounded-md"
            />
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsSearch(!isSearch)}
          className="p-1.5 bg-main-foreground rounded-full"
        >
          <MagnifyingGlassIcon className="size-6 text-white" />
        </button>
      </div>
    </header>
  );
};
export default HeaderMobile;
