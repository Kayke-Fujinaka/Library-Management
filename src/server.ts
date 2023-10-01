import 'dotenv/config';

import { app } from './app';
import { env } from './env';

app.listen({ port: env.PORT, host: env.HOST }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
