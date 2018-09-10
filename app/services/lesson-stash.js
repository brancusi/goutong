import Service from '@ember/service';
import { notEmpty } from '@ember/object/computed';

export default Service.extend({

  hasActiveCard: notEmpty('currentCard'),

  setCurrentCard(data) {

    if(data) {
      this.set('currentCard', data);
    } else {
      this.set('currentCard', null);
    }
  }
});
