import { envApp } from './infra/utils/environment.ts';
import { buildServer } from './server.ts';


const server = buildServer();

server.listen({ port: envApp.PORT, host: '0.0.0.0' }, (err) =>
{
  if (err)
  {
    server.log.error(err);
    process.exit(1);
  }
});
