import Service from '@ember/service';

import RecordRTC from 'record-rtc';
import {
  StereoAudioRecorder
} from 'record-rtc';

export default Service.extend({
  hasAccess: false,

  requestAccess() {
    if(navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, this.onMediaSuccess.bind(this), this.onMediaError.bind(this));
    }
  },

  onMediaSuccess(stream) {
    if(!this.get("isDestroyed")) {
      this.set("hasAccess", true);
      this.set("stream", stream);
    }
  },

  onMediaError(e) {
    throw new Error("Could not start recording", e);
  },

  createRecorder() {
    const options = {
      recorderType: RecordRTC.StereoAudioRecorder,
      numberOfAudioChannels: 1,
      mimeType: 'audio/wav'
    };

    const recorder = RecordRTC(this.get("stream"), options);

    const start = () => recorder.startRecording();
    const stop = () => new Promise((res) => recorder.stopRecording(() => {
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result;
        const trimmed = buffer.slice(0, buffer.byteLength);
        res(new Blob([trimmed]));
      };
      reader.readAsArrayBuffer(recorder.getBlob());
    }));

    return {
      recorder,
      start,
      stop
    };
  }
});
