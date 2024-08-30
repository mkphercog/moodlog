import "react";

declare module "react" {
  interface CSSProperties {
    "--text-color"?: string;
    "--text-hover-color"?: string;
    "--bg-color"?: string;
    "--bg-hover-color"?: string;
    "--border-color"?: string;
    "--border-hover-color"?: string;
    "--gradient-dark-color"?: string;
    "--gradient-light-color"?: string;
  }
}
