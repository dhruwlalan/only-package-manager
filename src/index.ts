import './utils/info';
import { program } from 'commander';
import updateNotifier from 'update-notifier';

import { name, version } from '../package.json';
import install, { InstallOptions } from './commands/install';
import parseOptions from './utils/parseOptions';

///version///
updateNotifier({
   pkg: {
      name,
      version,
   },
   updateCheckInterval: 1000 * 60 * 60 * 24,
}).notify({ isGlobal: true });
program.name('opm');
program.usage('[command] [option]');
program.version(`${version}`, '-v, --version', 'output the current version');

///commands///
program
   .command('i [packages...]')
   .option('-d, -D', 'devDependency', false)
   .option('-p, -P', 'peerDependency', false)
   .option('-o, -O', 'optionalDependency', false)
   .option('-e, -E', 'exact', false)
   .description('test command')
   .action((packages: string[], options: InstallOptions) => {
      install(packages, parseOptions(options));
   });
program
   .command('default', { isDefault: true })
   .arguments('[cmd] [args...]')
   .description('run default command')
   .allowUnknownOption()
   .action((cmd, args) => {
      if (!cmd) return;

      console.log(cmd);
      console.log(args);
   });

///help///
program.parse();
if (!program.args.length) install([], []);
