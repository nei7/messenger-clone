import * as sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SEND_GRID_SECRET);

export default {
  from: process.env.SEND_GRID_MAIL,
  mail_settings: {
    sandbox_mode: {
      enable: false,
    },
  },
  message: {},
};
