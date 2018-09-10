import Component from '@ember/component';
import Ember from 'ember';
import {
  connect,
  createLocalVideoTrack
} from 'twilio-video';

import { inject as service } from '@ember/service';

export default Component.extend({
  twilio: service(),
  lessonStash: service(),
  tracks: [],

  async startSession() {
    const token = await this.get('twilio').generateToken(this.get('userType'));

    const room = await connect(token, { name:'chinese', audio: true, video: {width: 640}});
    this.set('room', room);

    const myTrack = await createLocalVideoTrack();
    this.set('me', myTrack);

    this.setupListeners();
  },

  setupListeners() {
    this.get('room').on('trackSubscribed', (track, participant) => {
      console.log(participant);
      this.get('tracks').addObject(track);
    });

    this.get('room').on('trackUnsubscribed', (track, participant) => {
      this.get('tracks').removeObject(track);
    });
  },

  didInsertElement() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
      .then(() => {
        this.startSession();
      })
      .catch(e => {
        console.log("Something went wrong!");
      });
    }
  }
});
