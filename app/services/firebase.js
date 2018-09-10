import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({

  app: firebase.app(),
  lessonStash: service(),

  init() {
    const firestore = this.database();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
  },

  boot() {
    var fc = this.database()
      .collection("flash-cards")
      .where("active", "==", true);

    fc
      .onSnapshot(qsh => {
        const last = qsh.docs[0];

        if(last) {
          const model = {
            ref: last.ref,
            data: last.data()
          };

          this.get('lessonStash').setCurrentCard(model);
        } else {
          this.get('lessonStash').setCurrentCard(null);
        }

      });
  },

  database() {
    return this.get('app')
      .firestore();
  },

  storage() {
    return this.get('app')
      .storage()
      .ref();
  },

  async uploadAsset(path, data) {
    const assetRef = this.storage().child(path);

    const upload = await assetRef.put(data);

    return `gs://${upload.metadata.bucket}/${upload.metadata.fullPath}`;
  }
});
