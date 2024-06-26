import { ReactNode } from "react";
type Node = HTMLElement | ReactNode;
declare namespace Utils {
    function list ( ...classes: string[] ): string;
    function mobile ( classes: string ): string;
    function before ( classes: string ): string;
    function after ( classes: string ): string;
    function url ( str: string ): string;
    function scrollToCenter ( el: string ): void;
    function scrollToTop ( el: Node | string ): void;
    function log ( msg: string, debug?: boolean, type?: string ): void;
}
export = Utils;
export as namespace Utils;