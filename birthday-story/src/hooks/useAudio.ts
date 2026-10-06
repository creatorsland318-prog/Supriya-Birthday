import { useRef, useEffect, useState, useCallback } from 'react';

export function useAudio(src?: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setIsAvailable(true));
    audio.addEventListener('error', () => setIsAvailable(false));

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const mute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = true;
    setIsMuted(true);
  }, []);

  const unmute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) unmute();
    else mute();
  }, [isMuted, mute, unmute]);

  const setVolume = useCallback((v: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(1, v));
    audioRef.current.volume = clamped;
    setVolumeState(clamped);
  }, []);

  const lowerVolume = useCallback((to = 0.08) => {
    if (!audioRef.current) return;
    audioRef.current.volume = to;
  }, []);

  const restoreVolume = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  return {
    play,
    pause,
    togglePlay,
    mute,
    unmute,
    toggleMute,
    setVolume,
    lowerVolume,
    restoreVolume,
    isPlaying,
    isMuted,
    volume,
    isAvailable,
    audioRef,
  };
}
