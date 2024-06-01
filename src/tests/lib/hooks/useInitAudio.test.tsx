import { describe, test, expect, vi, Mock } from "vitest";
import { renderHook } from "@testing-library/react";
import { useInitAudio } from "../../../lib/hooks";

describe("useInitAudio", () => {
  beforeEach(() => {
    global.AudioContext = vi.fn();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("audioBuffer value", () => {
    (AudioContext as Mock).mockResolvedValue({ decodeAudioData: vi.fn });

    const { result } = renderHook(() => useInitAudio(""));
    const { audioBuffer } = result.current;
    expect(audioBuffer).toBeUndefined();
  });
  test("isLoading value", () => {
    (AudioContext as Mock).mockResolvedValue({ decodeAudioData: vi.fn });

    const { result } = renderHook(() => useInitAudio(""));
    const { isLoading } = result.current;
    expect(isLoading).toBeTruthy();
  });

  test("audio value", () => {
    (AudioContext as Mock).mockResolvedValue({ decodeAudioData: vi.fn });

    const { result } = renderHook(() => useInitAudio(""));
    const { audio } = result.current;
    expect(audio).toBeDefined();
  });
  test("isError value", () => {
    (AudioContext as Mock).mockResolvedValue({ decodeAudioData: vi.fn });

    const { result } = renderHook(() => useInitAudio(""));
    const { isError } = result.current;
    expect(isError).toBeFalsy();
  });
});
