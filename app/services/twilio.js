import Service from '@ember/service';
import fetch from 'fetch';
import ENV from 'goutong/config/environment';

export default Service.extend({
  async generateToken(type) {
    const response = await fetch(`${ENV.TOKEN_ENDPOINT}?user=${type}`);

    const { token } = await response.json();

    return token;
  }
});
