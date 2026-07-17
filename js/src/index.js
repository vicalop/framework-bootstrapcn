// bootcn — shadcn/ui-flavoured components for Bootstrap 5. Vanilla JS, no framework.
import { toast, Toaster } from './toast.js';
import { Combobox } from './combobox.js';
import { Command } from './command.js';
import { initAvatars } from './avatar.js';
import { InputOTP } from './otp.js';
import { Calendar } from './calendar.js';
import { DatePicker } from './datepicker.js';
import { ContextMenu } from './context-menu.js';
import { HoverCard } from './hovercard.js';

const bootcn = {
  version: '0.1.0',
  toast,
  Toaster,
  Combobox,
  Command,
  InputOTP,
  Calendar,
  DatePicker,
  ContextMenu,
  HoverCard,
  command: null, // set to the first Command instance on init (bootcn.command.open())
  init(root) {
    root = root || document;
    initAvatars(root);
    root.querySelectorAll('select[data-bootcn-combobox]').forEach((el) => Combobox.getOrCreate(el));
    root.querySelectorAll('input[data-bootcn-otp]').forEach((el) => InputOTP.getOrCreate(el));
    root.querySelectorAll('[data-bootcn-calendar]').forEach((el) => Calendar.getOrCreate(el));
    root.querySelectorAll('input[data-bootcn-datepicker]').forEach((el) => DatePicker.getOrCreate(el));
    root.querySelectorAll('[data-bootcn-context-menu]').forEach((el) => ContextMenu.getOrCreate(el));
    root.querySelectorAll('[data-bootcn-hovercard]').forEach((el) => HoverCard.getOrCreate(el));
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
