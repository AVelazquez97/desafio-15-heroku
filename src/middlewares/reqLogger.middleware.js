import { loggerInfo, loggerWarn } from '../../config/log4.js';

const requestsLogger = (req, res, next) => {
  res.on('finish', () => {
    const msg = `Ruta: "${req.originalUrl}" | Método: "${req.method}" | Respuesta HTTP: "${res.statusCode}: ${res.statusMessage}"`;
    if (res.statusCode !== 404) {
      loggerInfo.info(msg);
    } else {
      loggerWarn.warn(msg);
    }
  });

  next();
};

export default requestsLogger;
