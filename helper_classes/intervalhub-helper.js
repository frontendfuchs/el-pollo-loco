/**
 * Central manager for all setInterval timers in the project.
 * Allows starting new intervals and stopping all registered intervals at once.
 */
export class IntervalHub {
    /**
     * List of all active interval IDs.
     * @type {number[]}
     */
    static allIntervals = [];

    /**
     * Starts a new interval and registers it in the IntervalHub.
     * @param {Function} func - The function to execute on each tick.
     * @param {number} timer - The interval duration in milliseconds.
     * @returns {number} The interval ID returned by setInterval.
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
        return newInterval;
    }

    /**
     * Stops all intervals registered in the IntervalHub and clears the list.
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}