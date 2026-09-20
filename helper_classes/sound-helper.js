class SoundHelper {
    static gameStart = new Audio("assets/sounds/gameStart.mp3");
    static endbossApproach = new Audio("assets/sounds/endbossApproach.wav");
    static chickenDead = new Audio("assets/sounds/chickenDead.mp3");
    static chickenDead2 = new Audio("assets/sounds/chickenDead2.mp3");
    static characterSnoring = new Audio("assets/sounds/characterSnoring.mp3");
    static characterRun = new Audio("assets/sounds/characterRun.mp3");
    static characterDead = new Audio("assets/sounds/characterDead.wav");
    static characterDamage = new Audio("assets/sounds/characterDamage.mp3");
    static bottleCollect = new Audio("assets/sounds/bottleCollectSound.wav");
    static bottleBreak = new Audio("assets/sounds/bottleBreak.mp3");

    static allSounds = [
        SoundHelper.gameStart,
        SoundHelper.endbossApproach,
        SoundHelper.chickenDead,
        SoundHelper.chickenDead2,
        SoundHelper.characterSnoring,
        SoundHelper.characterRun,
        SoundHelper.characterDead,
        SoundHelper.characterDamage,
        SoundHelper.bottleCollect,
        SoundHelper.bottleBreak,
    ];

    static isMuted = false;

    static init() {
        SoundHelper.loadMuteState();

        SoundHelper.allSounds.forEach((sound) => {
            sound.loop = false;
        });

        SoundHelper.updateSoundIcon();
    }

    static play(sound, volume = 1) {
        if (SoundHelper.isMuted) {
            return;
        }

        sound.volume = volume;
        sound.currentTime = 0;

        sound.play().catch((error) => {
            console.warn("Sound konnte nicht abgespielt werden:", error);
        });
    }

    static pause(sound) {
        sound.pause();
    }

    static pauseAll() {
        SoundHelper.allSounds.forEach((sound) => {
            sound.pause();
        });
    }

    static stop(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    static stopAll() {
        SoundHelper.allSounds.forEach((sound) => {
            SoundHelper.stop(sound);
        });
    }

    static toggleSound() {
        SoundHelper.isMuted = !SoundHelper.isMuted;

        SoundHelper.saveMuteState();

        if (SoundHelper.isMuted) {
            SoundHelper.pauseAll();
        }

        SoundHelper.updateSoundIcon();
    }

    static saveMuteState() {
        localStorage.setItem(
            "soundMuted",
            JSON.stringify(SoundHelper.isMuted),
        );
    }

    static loadMuteState() {
        const savedState = localStorage.getItem("soundMuted");

        if (savedState !== null) {
            SoundHelper.isMuted = JSON.parse(savedState);
        }
    }

    static updateSoundIcon() {
        const soundIcon = document.getElementById("sound-icon");

        if (!soundIcon) {
            return;
        }

        soundIcon.src = SoundHelper.isMuted
            ? "assets/icons/sound-off.png"
            : "assets/icons/sound-on.png";
    }
}

export { SoundHelper };
