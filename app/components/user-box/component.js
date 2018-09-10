import Component from '@ember/component';

export default Component.extend({

  classNames: [],

  didRender() {
    if(this.get('track')) {
      const videoContainer = this.$('.video-container')[0];
      videoContainer.appendChild(this.get('track').attach());
    }
  }
});
