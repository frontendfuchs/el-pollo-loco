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
    static collectCoin = new Audio("assets/sounds/collect-coin.mp3");
    static babychick = new Audio("assets/sounds/babychick.m4a");
    static bgSound = new Audio("assets/sounds/bg-sound.mp3");

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
        SoundHelper.collectCoin,
        SoundHelper.babychick,
        SoundHelper.bgSound,
    ];

    static isMuted = false;
    static bgSoundActive = false;

    static init() {
        SoundHelper.loadMuteState();

        SoundHelper.allSounds.forEach((sound) => {
            sound.loop = sound === SoundHelper.bgSound;
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

    static playBg() {
        SoundHelper.bgSoundActive = true;
        SoundHelper.play(SoundHelper.bgSound, 0.3);
    }

    static stopBg() {
        SoundHelper.bgSoundActive = false;
        SoundHelper.stop(SoundHelper.bgSound);
    }

    static pauseAll() {
        SoundHelper.allSounds.forEach((sound) => {
            SoundHelper.stop(sound);
        });
    }

    static stop(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    static stopAll() {
        SoundHelper.bgSoundActive = false;

        SoundHelper.allSounds.forEach((sound) => {
            SoundHelper.stop(sound);
        });
    }

    static toggleSound() {
        SoundHelper.isMuted = !SoundHelper.isMuted;

        SoundHelper.saveMuteState();

        if (SoundHelper.isMuted) {
            SoundHelper.pauseAll();
        } else if (SoundHelper.bgSoundActive) {
            SoundHelper.play(SoundHelper.bgSound, 0.3);
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
        try {
            const savedState = localStorage.getItem("soundMuted");

            if (savedState === null) {
                return;
            }

            SoundHelper.isMuted = JSON.parse(savedState) === true;
        } catch {
            SoundHelper.isMuted = false;
        }
    }

    static updateSoundIcon() {
        const soundIcon = document.getElementById("sound-icon");

        if (!soundIcon) {
            return;
        }

        soundIcon.textContent = SoundHelper.isMuted
            ? "volume_off"
            : "volume_up";
    }
}

export { SoundHelper };
