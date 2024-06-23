import { ReactNode } from "react";
type Node = HTMLElement | ReactNode;
export = Utils;
export as namespace Utils;
declare namespace Utils {
    function list ( ...classes: string[] ): string {}
    function mobile ( classes: string ): string {}
    function before ( classes: string ): string {}
    function after ( classes: string ): string {}
    function url ( str: string ): string;
    function scrollToCenter ( el: string ): void;
    function scrollToTop ( el: Node | string ): void;
}