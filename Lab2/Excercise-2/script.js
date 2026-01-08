// Helper to format seconds as M:SS
function formatTime(seconds) {
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const rest = s % 60;
  return m + ":" + (rest < 10 ? "0" + rest : rest);
}

// Audio elements
const audio = document.getElementById("audioPlayer");
const audioTime = document.getElementById("audioTime");

// Update audio time on timeupdate
audio.addEventListener("timeupdate", function () {
  audioTime.textContent = formatTime(audio.currentTime);
});

const newAudio = document.getElementById("newAudioPlayer");
const newAudioTime = document.getElementById("newAudioTime");

newAudio.addEventListener("timeupdate", function () {
  newAudioTime.textContent = formatTime(newAudio.currentTime);
});

// Video elements
const video = document.getElementById("videoPlayer");
const videoTime = document.getElementById("videoTime");

// Update video time on timeupdate
video.addEventListener("timeupdate", function () {
  videoTime.textContent = formatTime(video.currentTime);
});
