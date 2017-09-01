import RedisJWT from 'redis-jwt';
import config from '../../config';

export const r = new RedisJWT(config['redis-jwt']);

export const exec = r.exec();

export const call = r.call();