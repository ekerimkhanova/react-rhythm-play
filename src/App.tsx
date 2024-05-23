import { AudioWave } from "./index";

import audio from "./assets/audio/audio.ogg";

function App() {
  return <AudioWave width={750} height={400} audioSource={audio} />;
}

export default App;
