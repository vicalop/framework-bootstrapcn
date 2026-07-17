// bootcn — shadcn/ui-flavoured components for Bootstrap 5. Vanilla JS, no framework.
import { toast, Toaster } from './toast.js';
import { Combobox } from './combobox.js';
import { Command } from './command.js';
import { initAvatars } from './avatar.js';

const bootcn = {
  version: '0.1.0',
  toast,
  Toaster,
  Combobox,
  Command,
  command: null, // set to the first Command instance on init (bootcn.command.open())
  init(root) {
    root = root || document;
    initAvatars(root);
    root.querySelectorAll('select[data-bootcn-combobox]').forEach((el) => Combobox.getOrCreate(el));
    root.querySelectorAll('[data-bootcn-command]').forEach((el) => {
      const inst = Command.getOrCreate(el);
      if (!bootcn.command) bootcn.command = inst;
    });
  },
};

if (typeof window !== 'undefined') {
  window.bootcn = bootcn;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bootcn.init());
  } else {
    bootcn.init();
  }
}

export default bootcn;
