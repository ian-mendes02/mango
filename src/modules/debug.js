/**
 * Logs `$msg` to console if `$debug` is true.
 * @param {any} msg message to be logged, can be of any type.
 * @param {boolean} debug `default - true`.
 * @param {string} type (optional) type of message [success, error, warning]
 */
export default function _log(msg, debug = true, type = undefined) {
    if (debug) {
        if (typeof msg == 'string')
            switch (type) {
                case "success":
                    console.log("%c" + "☑ - " + msg, "color: #B0C4DE");
                    break;
                case "info":
                    console.log("%c" + "⚠ - " + msg, "color: #F0E68C");
                    break;
                case "error":
                    console.error(msg);
                    break;
                case "warning":
                    console.warn(msg);
                    break;
                default:
                    console.log(msg);
                    break;
            }
        else console.log(msg);
    }
}