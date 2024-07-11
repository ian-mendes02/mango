import {ReactNode} from "react";
type Node = HTMLElement | ReactNode | string;
declare namespace Utils {
    function list( ...classes: string[] ): string;
    function mobile( classes: string ): string;
    function before( classes: string ): string;
    function after( classes: string ): string;
    function url( str: string ): string;
    function scrollToCenter( el: Node ): void;
    function scrollToTop( el: Node ): void;
    function log( msg: string, debug?: boolean, type?: string ): void;
}
export = Utils;
export as namespace Utils;