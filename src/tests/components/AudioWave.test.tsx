import { describe, test, expect, vi, Mock } from "vitest";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import AudioWave from "../../components/AudioWave/AudioWave";
import audio from "../../assets/audio/audio.ogg";

vi.mock("axios");

describe("AudioWave", function () {
  beforeEach(() => {
    global.AudioContext = vi.fn();
  });
  afterEach(() => {
    vi.clearAllMocks();
    (axios.get as Mock).mockReset();
  });

  test("render loader before init audioWave", () => {
    (AudioContext as Mock).mockResolvedValue({ decodeAudioData: vi.fn });
    (axios.get as Mock).mockResolvedValue({
      data: "data",
    });

    render(<AudioWave height={400} audioSource={audio} />);
    expect(
      screen.queryByTestId("reactRhythmPlay_loaderWrapper")
    ).not.toBeNull();
  });
});
