      </div><!-- .content -->
    </main>
  </div><!-- .main-col -->
</div><!-- .app-shell -->

<!-- Command palette (⌘K) — available on every app page -->
<div data-bootcn-command hidden>
  <div data-bootcn-command-group="Navigation">
    <button data-bootcn-command-item data-href="dashboard.php" data-shortcut="G D">Go to Dashboard</button>
    <button data-bootcn-command-item data-href="users.php" data-shortcut="G U">Go to Users</button>
    <button data-bootcn-command-item data-href="settings.php" data-shortcut="G S">Go to Settings</button>
    <button data-bootcn-command-item data-href="settings.php#billing" data-shortcut="G B">Go to Billing</button>
  </div>
  <div data-bootcn-command-group="Actions">
    <button data-bootcn-command-item data-id="invite">Invite a user</button>
    <button data-bootcn-command-item data-id="theme">Toggle theme</button>
    <button data-bootcn-command-item data-href="login.php" data-id="logout">Log out</button>
  </div>
</div>

<script src="/dist/js/bootstrap.bundle.min.js"></script>
<script src="/dist/js/bootcn.js"></script>
<script src="/demo/demo.js"></script>
<script>
  // Wire command-palette actions that aren't plain navigation.
  window.addEventListener('load', function () {
    if (!window.bootcn || !bootcn.command) return;
    bootcn.command.onSelect = function (item) {
      if (item.id === 'theme') document.getElementById('themeToggle').click();
      else if (item.id === 'invite') bootcn.toast('Invite sent', { description: 'We emailed an invitation.' });
    };
  });
</script>
</body>
</html>
