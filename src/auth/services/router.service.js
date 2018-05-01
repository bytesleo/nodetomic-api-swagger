import config from '../../config';

// Load Passport's
Object.keys(config.oAuth).forEach((key) => {
  if (config.oAuth[key].enabled)
    require(`../passports/${key}.passport`);
});