import Controller from '@ember/controller';
import fetch from 'fetch';
import uuid from '../utils/uuid';
import { inject as service } from '@ember/service';
import ENV from 'goutong/config/environment';

export default Controller.extend({
  queryParams: ['userType'],
  userType: null,

  // firebase: service(),

  init() {
    // this.get('firebase').boot();
  },

  actions: {
    async processAudio(blob) {
    //   const path = `audio/${uuid()}.wav`;
    //
    //   const gcsUri = await this.get('firebase').uploadAsset(path, blob);
    //
    //   const response = await fetch(ENV.TRANSLATION_ENDPOINT, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       gcsUri
    //     })
    //   });
    //
    //   const data = await response.json();
    //
    //   data.audio = gcsUri;
    //   data.active = true;
    //
    //   this.get('firebase')
    //     .database()
    //     .collection("flash-cards")
    //     .add(data);
    }
  }
});
