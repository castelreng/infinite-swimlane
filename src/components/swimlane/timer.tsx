// Animation frame based implementation of setTimeout.
// Inspired by Joe Lambert, https://gist.github.com/joelambert/1002116#file-requesttimeout-js

const hasNativePerformanceNow =
    typeof performance === 'object' && typeof performance.now === 'function';

const now = hasNativePerformanceNow
    ? () => performance.now()
    : () => Date.now();

export function cancelTimeout(timeoutID: any) {
    cancelAnimationFrame(timeoutID.id);
}

export function requestTimeout(callback : any, delay: any) {
    const start = now();

    function tick() {
        if (now() - start >= delay) {
            callback.call(null);
        } else {
            timeoutID.id = requestAnimationFrame(tick);
        }
    }

    const timeoutID = {
        id: requestAnimationFrame(tick),
    };

    return timeoutID;
}