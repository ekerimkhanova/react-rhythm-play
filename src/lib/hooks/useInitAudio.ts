import { useCallback, useEffect, useState } from "react";

import axios from "axios";

export function useInitAudio(audioSource: string) {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const [audioContext] = useState(new AudioContext());
  const [audio] = useState(new Audio(audioSource));

  const initAudio = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(audioSource, {
        responseType: "arraybuffer",
      });
      const buffer = await audioContext.decodeAudioData(response.data);
      setAudioBuffer(buffer);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [audioContext, audioSource]);

  useEffect(() => {
    if (!audioContext) return;
    initAudio();
  }, [audioContext, initAudio]);

  return { audioBuffer, isLoading, audio, isError };
}
