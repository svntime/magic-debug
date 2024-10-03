import { InteractionManager } from 'react-native';
import { logger as rnlogger } from 'react-native-logs';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const stringify = (message: unknown): string => {
  return typeof message === 'string' ? message : JSON.stringify(message);
};

const base = rnlogger.createLogger<LogLevel>({
  severity: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  async: true,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  asyncFunc: InteractionManager.runAfterInteractions,
  formatFunc(level, extension, messages: unknown) {
    const stringifiedMessages: string[] = Array.isArray(messages)
      ? messages.map((msg) => stringify(msg))
      : [stringify(messages)];

    return `[${new Date().toISOString()}][${level}][${extension}] ${stringifiedMessages.join(' ')}`;
  }
});

export const logger = {
  system: base.extend('system'),
  backend: base.extend('backend'),
  auth: base.extend('auth'),
  forms: base.extend('forms'),
  store: base.extend('store'),
  cache: base.extend('cache'),
  validation: base.extend('validation')
};
