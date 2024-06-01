import { AudioWave, useAudio } from "./index";

import audio from "./assets/audio/audio.ogg";
import { useRef } from "react";

function App() {

  const audioWaveRef = useRef();

  const { togglePlayPause } = useAudio(audioWaveRef);

  return (
    <div>
      <AudioWave
        ref={audioWaveRef}
        height={400}
        width={750}
        audioSource={audio}
        isCustomAudioBar
      />
      <button onClick={togglePlayPause}>play/pause</button>
    </div>
  );
}

export default App;
