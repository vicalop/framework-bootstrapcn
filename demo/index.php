<?php /* Kitchen-sink page to verify the shadcn Bootstrap theme in light + dark. */ ?>
<!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>bootstrap-shadcn-theme — demo</title>
  <link rel="stylesheet" href="/dist/css/bootstrap-shadcn.min.css">
</head>
<body class="p-4">
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h3 mb-0">shadcn theme kitchen sink</h1>
      <button id="themeToggle" class="btn btn-outline-secondary btn-sm" type="button">Toggle theme</button>
    </div>

    <div class="d-flex flex-wrap align-items-center gap-2 mb-4 pb-3 border-bottom">
      <span class="text-body-secondary small me-1">Example pages:</span>
      <a class="btn btn-outline-secondary btn-sm" href="/demo/dashboard.php">Dashboard</a>
      <a class="btn btn-outline-secondary btn-sm" href="/demo/users.php">Users</a>
      <a class="btn btn-outline-secondary btn-sm" href="/demo/settings.php">Settings</a>
      <a class="btn btn-outline-secondary btn-sm" href="/demo/login.php">Login</a>
      <a class="btn btn-outline-secondary btn-sm" href="/demo/signup.php">Sign up</a>
    </div>

    <section class="mb-4">
      <h2 class="h5">Buttons</h2>
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-danger">Destructive</button>
      <button class="btn btn-outline-secondary">Outline</button>
      <button class="btn btn-link">Link</button>
      <button class="btn btn-primary" disabled>Disabled</button>
      <div class="mt-3 d-flex align-items-center gap-2">
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary">Default</button>
        <button class="btn btn-primary btn-lg">Large</button>
      </div>
    </section>

    <section class="mb-4">
      <h2 class="h5">Form</h2>
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" placeholder="you@example.com">
        </div>
        <div class="col-md-4">
          <label class="form-label d-block">Role</label>
          <select class="form-select" data-bootcn-combobox data-placeholder="Select role…">
            <option value="admin">Admin</option><option value="user">User</option><option value="viewer">Viewer</option>
          </select>
        </div>
        <div class="col-md-4 d-flex align-items-end gap-3">
          <div class="form-check"><input class="form-check-input" type="checkbox" id="c1" checked><label class="form-check-label" for="c1">Check</label></div>
          <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="s1" checked><label class="form-check-label" for="s1">Switch</label></div>
        </div>
      </div>
    </section>

    <section class="mb-4">
      <h2 class="h5">Card, badges, alert</h2>
      <div class="row g-3">
        <div class="col-md-6">
          <div class="card"><div class="card-body">
            <h5 class="card-title">Card title <span class="badge text-bg-primary">New</span></h5>
            <p class="card-text text-body-secondary">Muted secondary text inside a card.</p>
            <a href="#" class="btn btn-primary btn-sm">Action</a>
          </div></div>
        </div>
        <div class="col-md-6"><div class="alert" role="alert">A neutral, muted alert surface.</div></div>
      </div>
    </section>

    <section class="mb-4">
      <h2 class="h5">Dropdown, modal, tabs</h2>
      <div class="dropdown d-inline-block">
        <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Menu</button>
        <ul class="dropdown-menu"><li><a class="dropdown-item" href="#">Profile</a></li><li><a class="dropdown-item" href="#">Settings</a></li></ul>
      </div>
      <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#m1">Open modal</button>
      <ul class="nav nav-tabs mt-3">
        <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
      </ul>
      <div class="modal fade" id="m1" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">Modal</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">Popover-surface modal on token colors.</div>
        <div class="modal-footer"><button class="btn btn-primary" data-bs-dismiss="modal">Done</button></div>
      </div></div></div>
    </section>

    <section class="mb-4">
      <h2 class="h5">Links &amp; color utilities</h2>
      <p>A bare <a href="#">text link</a> should be neutral (near-black / near-white), not blue.</p>
      <p><span class="text-primary">.text-primary</span> ·
         <span class="text-danger">.text-danger</span> ·
         <span class="badge text-bg-primary">bg-primary</span> ·
         <span class="badge bg-danger">bg-danger</span></p>
    </section>

    <section class="mb-4">
      <h2 class="h5">Table</h2>
      <table class="table"><thead><tr><th>Name</th><th>Role</th></tr></thead>
        <tbody><tr><td>Ada</td><td>Admin</td></tr><tr><td>Linus</td><td>User</td></tr></tbody></table>
    </section>

    <section class="mb-4">
      <h2 class="h5">bootcn components <span class="badge text-bg-secondary align-middle">phase 2</span></h2>

      <h3 class="h6 mt-3">Avatars</h3>
      <span class="bootcn-avatar"><span>SC</span></span>
      <span class="bootcn-avatar bootcn-avatar-sm"><span>JL</span></span>
      <span class="bootcn-avatar bootcn-avatar-lg"><span>IN</span></span>

      <h3 class="h6 mt-3">Toasts</h3>
      <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.toast('Link copied')">Default</button>
      <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.toast.success('Changes saved', {description:'Your profile is up to date.'})">Success</button>
      <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.toast.error('Could not save', {description:'Check your connection.'})">Error</button>
      <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.toast('Event deleted', {action:{label:'Undo', onClick(){bootcn.toast.success('Restored')}}})">With action</button>

      <h3 class="h6 mt-3">Combobox</h3>
      <select class="form-select" data-bootcn-combobox data-placeholder="Select framework…" data-search-placeholder="Search framework…">
        <option value="" disabled selected hidden></option>
        <option value="next">Next.js</option><option value="svelte">SvelteKit</option>
        <option value="nuxt">Nuxt</option><option value="remix">Remix</option><option value="astro">Astro</option>
      </select>

      <h3 class="h6 mt-3">Command palette</h3>
      <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.command.open()">Open command palette (Ctrl / ⌘ K)</button>
      <div data-bootcn-command hidden>
        <div data-bootcn-command-group="Navigation">
          <button data-bootcn-command-item data-href="dashboard.php" data-shortcut="G D">Go to Dashboard</button>
          <button data-bootcn-command-item data-href="users.php" data-shortcut="G U">Go to Users</button>
          <button data-bootcn-command-item data-href="settings.php" data-shortcut="G S">Go to Settings</button>
        </div>
        <div data-bootcn-command-group="Actions">
          <button data-bootcn-command-item data-id="copy">Copy current URL</button>
          <button data-bootcn-command-item data-id="theme">Toggle theme</button>
        </div>
      </div>

      <h3 class="h6 mt-3">Input OTP</h3>
      <input type="text" data-bootcn-otp data-length="6" aria-label="One-time code">

      <h3 class="h6 mt-3">Date picker</h3>
      <input type="hidden" data-bootcn-datepicker data-placeholder="Pick a date">

      <h3 class="h6 mt-3">Calendar</h3>
      <div class="card d-inline-block"><div data-bootcn-calendar></div></div>

      <h3 class="h6 mt-3">Context menu</h3>
      <div data-bootcn-context-menu>
        <div data-bootcn-context-trigger class="d-flex align-items-center justify-content-center text-body-secondary border rounded" style="height:6rem;max-width:24rem;border-style:dashed!important;border-color:hsl(var(--border))!important">Right-click here</div>
        <div data-bootcn-context-content hidden>
          <button data-bootcn-context-item onclick="bootcn.toast('Opened')">Open</button>
          <button data-bootcn-context-item onclick="bootcn.toast('Renaming…')">Rename</button>
          <button data-bootcn-context-item data-disabled>Duplicate</button>
          <hr>
          <button data-bootcn-context-item class="text-danger" onclick="bootcn.toast.error('Deleted')">Delete</button>
        </div>
      </div>

      <h3 class="h6 mt-3">Hover card</h3>
      <p class="mb-0">Created by <span data-bootcn-hovercard>
        <a data-bootcn-hovercard-trigger href="#" class="fw-medium">@sofia</a>
        <template data-bootcn-hovercard-content>
          <div class="d-flex gap-2"><span class="bootcn-avatar">SC</span>
            <div><div class="fw-semibold">Sofia Chen</div>
            <div class="text-body-secondary">Joined March 2024</div>
            <p class="mb-0 mt-1">Product designer building calm tools at Acme.</p></div></div>
        </template></span> — hover to preview.</p>

      <h3 class="h6 mt-3">Resizable</h3>
      <div data-bootcn-resizable class="card overflow-hidden" style="height:8rem;max-width:32rem">
        <div data-bootcn-panel class="p-3 d-flex align-items-center justify-content-center fw-medium">Sidebar</div>
        <div data-bootcn-panel class="p-3 d-flex align-items-center justify-content-center fw-medium bg-body-secondary">Content</div>
      </div>

      <h3 class="h6 mt-3">Scroll area</h3>
      <div class="bootcn-scroll-area card p-3" style="height:8rem;max-width:18rem">
        <?php for ($i = 1; $i <= 15; $i++) echo "<div class='py-1'>Notification $i</div>"; ?>
      </div>

      <h3 class="h6 mt-3">Menubar</h3>
      <div data-bootcn-menubar>
        <div class="dropdown"><button class="bootcn-menubar-trigger">File</button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item">New Tab <span class="bootcn-menubar-kbd">⌘T</span></button></li>
            <li><button class="dropdown-item">New Window <span class="bootcn-menubar-kbd">⌘N</span></button></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item">Print <span class="bootcn-menubar-kbd">⌘P</span></button></li>
          </ul></div>
        <div class="dropdown"><button class="bootcn-menubar-trigger">Edit</button>
          <ul class="dropdown-menu"><li><button class="dropdown-item">Undo <span class="bootcn-menubar-kbd">⌘Z</span></button></li>
          <li><button class="dropdown-item">Redo <span class="bootcn-menubar-kbd">⇧⌘Z</span></button></li></ul></div>
        <div class="dropdown"><button class="bootcn-menubar-trigger">View</button>
          <ul class="dropdown-menu"><li><button class="dropdown-item">Toggle sidebar</button></li></ul></div>
      </div>

      <h3 class="h6 mt-3">Navigation menu</h3>
      <nav data-bootcn-navmenu>
        <div class="bootcn-navmenu-item">
          <button class="bootcn-navmenu-trigger">Products <span class="bootcn-navmenu-caret">&#9662;</span></button>
          <div class="bootcn-navmenu-content">
            <a class="bootcn-navmenu-link-card" href="#"><div class="title">Analytics</div><div class="desc">Understand your traffic and conversions.</div></a>
            <a class="bootcn-navmenu-link-card" href="#"><div class="title">Billing</div><div class="desc">Invoices, plans, and payment methods.</div></a>
            <a class="bootcn-navmenu-link-card" href="#"><div class="title">Security</div><div class="desc">SSO, audit logs, and access control.</div></a>
          </div>
        </div>
        <a class="bootcn-navmenu-link" href="#">Docs</a>
        <a class="bootcn-navmenu-link" href="#">Pricing</a>
      </nav>

      <h3 class="h6 mt-3">Data table</h3>
      <div style="max-width:40rem">
        <table class="table align-middle" data-bootcn-datatable data-page-size="4">
          <thead><tr><th data-sortable>Name</th><th data-sortable>Email</th><th data-sortable data-sort="number">Amount</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Olivia Martin</td><td>olivia@email.com</td><td>$1,999.00</td><td><span class="badge text-bg-secondary">Paid</span></td></tr>
            <tr><td>Jackson Lee</td><td>jackson@email.com</td><td>$39.00</td><td><span class="badge text-bg-secondary">Paid</span></td></tr>
            <tr><td>Isabella Nguyen</td><td>isabella@email.com</td><td>$299.00</td><td><span class="badge border bg-transparent text-body-secondary">Pending</span></td></tr>
            <tr><td>William Kim</td><td>will@email.com</td><td>$99.00</td><td><span class="badge text-bg-secondary">Paid</span></td></tr>
            <tr><td>Sofia Davis</td><td>sofia@email.com</td><td>$4,200.00</td><td><span class="badge border bg-transparent text-body-secondary">Pending</span></td></tr>
            <tr><td>Ava Brown</td><td>ava@email.com</td><td>$12.00</td><td><span class="badge text-bg-secondary">Paid</span></td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="h6 mt-3">Sidebar (collapsible)</h3>
      <button class="btn btn-outline-secondary btn-sm mb-2" data-bootcn-sidebar-toggle>Toggle sidebar</button>
      <div class="d-flex card overflow-hidden" style="height:12rem;max-width:36rem">
        <aside data-bootcn-sidebar class="p-2 border-end" style="border-color:hsl(var(--border))!important">
          <?php foreach (['⌂'=>'Dashboard','◱'=>'Users','⚙'=>'Settings'] as $i=>$l): ?>
            <a class="d-flex align-items-center gap-2 p-2 rounded text-decoration-none text-body" href="#" style="white-space:nowrap"><span><?= $i ?></span><span class="bootcn-sidebar-label"><?= $l ?></span></a>
          <?php endforeach; ?>
        </aside>
        <div class="p-3 flex-grow-1 text-body-secondary">Content area</div>
      </div>
    </section>
  </div>

  <script src="/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/dist/js/bootcn.js"></script>
  <script>
    (function () {
      var root = document.documentElement;
      var saved = localStorage.getItem('theme');
      if (saved) root.setAttribute('data-bs-theme', saved);
      document.getElementById('themeToggle').addEventListener('click', function () {
        var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-bs-theme', next);
        localStorage.setItem('theme', next);
      });
    })();
    window.addEventListener('load', function () {
      if (window.bootcn && bootcn.command) bootcn.command.onSelect = function (item) {
        if (item.id === 'theme') document.getElementById('themeToggle').click();
        else if (item.id === 'copy') bootcn.toast('URL copied');
      };
    });
  </script>
</body>
</html>
