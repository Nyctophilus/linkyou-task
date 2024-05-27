import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-200"
        width="12"
        height="6"
        viewBox="0 0 12 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 1L6 5L1 1H11Z" fill="#D9904E" />
        <path
          d="M11 1L11.1874 1.23426L11.8552 0.7H11V1ZM6 5L5.81259 5.23426C5.92216 5.32191 6.07784 5.32191 6.18741 5.23426L6 5ZM1 1V0.7H0.144766L0.812591 1.23426L1 1ZM10.8126 0.765739L5.81259 4.76574L6.18741 5.23426L11.1874 1.23426L10.8126 0.765739ZM6.18741 4.76574L1.18741 0.765739L0.812591 1.23426L5.81259 5.23426L6.18741 4.76574ZM1 1.3H11V0.7H1V1.3Z"
          fill="#D9904E"
        />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

type itemsProps = {
  name: string;
  path?: string;
  children: {
    name: string;
    path?: string;
  }[];
}[];

export function AccordionComponent({ items }: { items: itemsProps }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.name} value={`item-${item.name}`}>
          <AccordionTrigger className="text-main-foreground font-bold text-[15px] ">
            {item.name}
          </AccordionTrigger>
          <ul className="list-inside list-disc">
            {item.children.map((child) => (
              <AccordionContent
                className="ps-4 text-white font-normal text-[14px]"
                key={child.name}
              >
                <li>{child.name}</li>
              </AccordionContent>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
