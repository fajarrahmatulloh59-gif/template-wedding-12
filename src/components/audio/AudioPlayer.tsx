import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music2 } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { sundaSynth } from '../../utils/audioSynth';

interface AudioPlayerProps {
  config: WeddingConfig;
  autoPlayTriggered: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  config,
  autoPlayTriggered,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUsingSynth, setIsUsingSynth] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and handle user interaction start
  useEffect(() => {
    if (!config.music.enabled) return;

    if (autoPlayTriggered && !isPlaying) {
      startPlayback();
    }
  }, [autoPlayTriggered, config.music.enabled]);

  const startPlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsUsingSynth(false);
        })
        .catch((err) => {
          console.log('HTML5 Audio file unavailable, activating Sundanese Gamelan Degung Synthesizer:', err);
          // Graceful fallback to serene Web Audio API Degung Synthesizer
          try {
            sundaSynth.play();
            setIsPlaying(true);
            setIsUsingSynth(true);
          } catch (synthErr) {
            console.warn('Audio synth failed gracefully:', synthErr);
          }
        });
    } else {
      try {
        sundaSynth.play();
        setIsPlaying(true);
        setIsUsingSynth(true);
      } catch (synthErr) {
        console.warn('Audio synth failed gracefully:', synthErr);
      }
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      if (isUsingSynth) {
        sundaSynth.pause();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (isUsingSynth) {
        sundaSynth.play();
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            sundaSynth.play();
            setIsPlaying(true);
            setIsUsingSynth(true);
          });
      } else {
        sundaSynth.play();
        setIsPlaying(true);
        setIsUsingSynth(true);
      }
    }
  };

  if (!config.music.enabled) return null;

  return (
    <>
      {/* Hidden single shared HTML5 audio element */}
      <audio
        ref={audioRef}
        src={config.music.audioUrl}
        loop
        preload="auto"
        onError={() => {
          // If mp3 is not present in public/music/backsound.mp3, flag for synth fallback
          setIsUsingSynth(true);
        }}
      />

      {/* Floating Audio Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#39342D]/90 backdrop-blur-md text-[11px] text-[#F8F5EF] border border-[#D4B779]/40 shadow-lg animate-in fade-in">
            <Music2 className="w-3.5 h-3.5 text-[#D4B779] animate-pulse" />
            <span className="truncate max-w-[140px]">{config.music.songTitle}</span>
          </div>
        )}

        <button
          onClick={togglePlayback}
          className={`relative p-3.5 rounded-full shadow-xl transition-all duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer border ${
            isPlaying
              ? 'bg-[#39342D] text-[#D4B779] border-[#D4B779] hover:bg-[#2B2620]'
              : 'bg-white/90 text-stone-600 border-stone-300 hover:bg-white'
          }`}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          aria-label={isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 className="w-5 h-5 animate-pulse" />
              {/* Spinning vinyl ring indicator */}
              <span className="absolute -inset-1 rounded-full border border-dashed border-[#D4B779]/60 animate-spin" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>
    </>
  );
};
