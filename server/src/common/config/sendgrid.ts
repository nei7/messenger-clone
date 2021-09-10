import * as sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(
  '',
);

export default {
  from: '',
  mail_settings: {
    sandbox_mode: {
      enable: false,
    },
  },
  message: {},
};
