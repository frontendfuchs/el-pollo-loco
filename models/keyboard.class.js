/**
 * Represents the current state of keyboard input.
 * Each property is true while the corresponding key is pressed.
 */
export class Keyboard {
    /** Left arrow key state. */
    LEFT = false;

    /** Right arrow key state. */
    RIGHT = false;

    /** Up arrow key state. */
    UP = false;

    /** Down arrow key state. */
    DOWN = false;

    /** Spacebar key state. */
    SPACE = false;

    /** D key state (used for throwing). */
    D = false;
}