"use client";

import React from "react";
import { cn } from "@/utils/cn";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

export const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "font-heading font-extrabold text-[44px] sm:text-[56px] md:text-[72px] leading-[1.1] tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
);
H1.displayName = "H1";

export const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "font-heading font-bold text-[34px] sm:text-[44px] md:text-[56px] leading-[1.15] tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
);
H2.displayName = "H2";

export const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "font-heading font-semibold text-[26px] sm:text-[34px] md:text-[42px] leading-[1.2] tracking-normal text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
H3.displayName = "H3";

export const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(
        "font-heading font-medium text-[22px] sm:text-[26px] md:text-[32px] leading-[1.25] tracking-normal text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  )
);
H4.displayName = "H4";

export const Body = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "font-sans font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[1.6] text-foreground/80",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);
Body.displayName = "Body";

export const Small = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "font-sans font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] text-foreground/60",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);
Small.displayName = "Small";
