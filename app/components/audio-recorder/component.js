import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import { notEmpty } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({
  audioRecorder: service(),

  hasAudio: notEmpty('model.audioUrl'),
  saving: false,
  recording: false,

  didInsertElement() {
    this.get("audioRecorder").requestAccess();
  },

  label: computed('saving', 'recording', function() {
    if(this.get('saving')) {
      return 'Saving';
    } else if(this.get('recording')) {
      return 'Stop Recording';
    } else {
      return 'Start Recording';
    }
  }),

  startRecording() {
    this.set('recording', true);

    const recorder = this.get("audioRecorder").createRecorder();
    this.set("recorder", recorder);
    Ember.run.later(recorder.start, 100);
  },

  stopRecording() {
    this.set("saving", true);
    const recorder = this.get("recorder");
    recorder
      .stop()
      .then(this.get("processAudio"))
      .then(() => {
        this.set("saving", false);
        this.set('recording', false);
      });
  },

  actions: {
    toggle() {
      if(this.get('recording')) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    }
  }
});
