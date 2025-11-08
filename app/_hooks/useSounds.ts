import { useEffect, useRef } from "react";

export function useSounds() {
  const sounds = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    const soundFiles: Record<string, string> = {
      pop: "/sounds/pop.mp3",
      page: "/sounds/page.mp3",
      hurt: "/sounds/hurt.mp3",
      levelup: "/sounds/levelup.mp3",
      shatter: "/sounds/shatter.mp3",
      equip: "/sounds/equip.mp3",
      click: "/sounds/click.mp3",
      ping: "/sounds/ping.mp3",
    };

    const loadedSounds: Record<string, HTMLAudioElement> = {};
    for (const [name, path] of Object.entries(soundFiles)) {
      const audio = new Audio(path);
      audio.volume = 0.3
      audio.load();
      loadedSounds[name] = audio;
    }

    sounds.current = loadedSounds;
  }, []);

  const playSound = (name: string) => {
    const sound = sounds.current[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        console.warn(`Could not play sound: ${name}`);
      });
    } else {
      console.warn(`Sound not found: ${name}`);
    }
  };

  return { playSound };
}
