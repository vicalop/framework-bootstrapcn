<?php
require __DIR__ . '/partials/icons.php';
$pages = ['Dashboard' => 'dashboard.php', 'Users' => 'users.php', 'Settings' => 'settings.php', 'Login' => 'login.php', 'Sign up' => 'signup.php'];
$nav = [
  'Form & input' => ['button','button-group','input','input-group','textarea','label','field','checkbox','radio-group','switch','slider','native-select','select','combobox','input-otp','calendar','date-picker'],
  'Layout & nav' => ['accordion','breadcrumb','navigation-menu','sidebar','tabs','separator','scroll-area','resizable'],
  'Overlays' => ['dialog','alert-dialog','sheet','drawer','popover','tooltip','hover-card','context-menu','dropdown-menu','menubar','command'],
  'Feedback' => ['alert','toast','progress','spinner','skeleton','badge','empty'],
  'Display' => ['avatar','card','table','data-table','chart','carousel','aspect-ratio','typography','item','kbd'],
  'Misc' => ['collapsible','toggle','toggle-group','pagination','direction'],
];
?>
<!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>bootstrap-shadcn-theme — component catalog</title>
  <link rel="stylesheet" href="/dist/css/bootstrap-shadcn.min.css">
  <link rel="stylesheet" href="/demo/demo.css">
</head>
<body class="p-4">
  <div class="container-xl">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h1 class="h3 mb-0">shadcn component catalog</h1>
        <p class="text-body-secondary mb-0 small">One example per official shadcn/ui component, mapped onto Bootstrap + bootcn.</p>
      </div>
      <button id="themeToggle" class="btn btn-outline-secondary btn-sm" type="button">Toggle theme</button>
    </div>
    <div class="d-flex flex-wrap align-items-center gap-2 mb-4 pb-3 border-bottom">
      <span class="text-body-secondary small me-1">Example pages:</span>
      <?php foreach ($pages as $label => $href): ?>
        <a class="btn btn-outline-secondary btn-sm" href="/demo/<?= $href ?>"><?= $label ?></a>
      <?php endforeach; ?>
    </div>

    <div class="ks-layout">
      <nav class="ks-nav bootcn-scroll-area" aria-label="Components">
        <?php foreach ($nav as $group => $ids): ?>
          <span class="ks-nav-group"><?= $group ?></span>
          <?php foreach ($ids as $id): ?>
            <a href="#<?= $id ?>"><?= ucwords(str_replace('-', ' ', $id)) ?></a>
          <?php endforeach; ?>
        <?php endforeach; ?>
      </nav>

      <div>
        <section class="ks-section" id="button">
          <h2 class="h5">Button</h2>
          <div class="d-flex flex-wrap align-items-center gap-2">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-danger">Destructive</button>
            <button class="btn btn-outline-secondary">Outline</button>
            <button class="btn btn-ghost">Ghost</button>
            <button class="btn btn-link">Link</button>
            <button class="btn btn-primary" disabled>Disabled</button>
          </div>
          <div class="mt-3 d-flex align-items-center gap-2">
            <button class="btn btn-primary btn-sm">Small</button>
            <button class="btn btn-primary">Default</button>
            <button class="btn btn-primary btn-lg">Large</button>
          </div>
        </section>

        <section class="ks-section" id="button-group">
          <h2 class="h5">Button Group</h2>
          <div class="btn-group" role="group">
            <button class="btn btn-outline-secondary">Left</button>
            <button class="btn btn-outline-secondary">Middle</button>
            <button class="btn btn-outline-secondary">Right</button>
          </div>
        </section>

        <section class="ks-section" id="input">
          <h2 class="h5">Input</h2>
          <input type="email" class="form-control" style="max-width:20rem" placeholder="you@example.com">
        </section>

        <section class="ks-section" id="input-group">
          <h2 class="h5">Input Group</h2>
          <div class="input-group" style="max-width:24rem">
            <span class="input-group-text">https://</span>
            <input type="text" class="form-control" placeholder="example.com">
          </div>
        </section>

        <section class="ks-section" id="textarea">
          <h2 class="h5">Textarea</h2>
          <textarea class="form-control" rows="3" style="max-width:24rem" placeholder="Write a note…"></textarea>
        </section>

        <section class="ks-section" id="label">
          <h2 class="h5">Label</h2>
          <label class="form-label" for="lbl-demo">Email</label>
          <input id="lbl-demo" class="form-control" style="max-width:20rem" placeholder="Label sits above the control">
        </section>

        <section class="ks-section" id="field">
          <h2 class="h5">Field</h2>
          <div class="bootcn-field-group" style="max-width:24rem">
            <div class="bootcn-field">
              <label class="bootcn-field-label" for="f-username">Username</label>
              <input id="f-username" class="form-control" placeholder="sofia">
              <p class="bootcn-field-desc">This is your public display name.</p>
            </div>
            <div class="bootcn-field is-invalid">
              <label class="bootcn-field-label" for="f-email">Email</label>
              <input id="f-email" class="form-control is-invalid" value="not-an-email">
              <p class="bootcn-field-error">Enter a valid email address.</p>
            </div>
          </div>
        </section>

        <section class="ks-section" id="checkbox">
          <h2 class="h5">Checkbox</h2>
          <div class="form-check"><input class="form-check-input" type="checkbox" id="c1" checked><label class="form-check-label" for="c1">Accept terms</label></div>
        </section>

        <section class="ks-section" id="radio-group">
          <h2 class="h5">Radio Group</h2>
          <div class="form-check"><input class="form-check-input" type="radio" name="plan" id="r1" checked><label class="form-check-label" for="r1">Hobby</label></div>
          <div class="form-check"><input class="form-check-input" type="radio" name="plan" id="r2"><label class="form-check-label" for="r2">Pro</label></div>
        </section>

        <section class="ks-section" id="switch">
          <h2 class="h5">Switch</h2>
          <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="s1" checked><label class="form-check-label" for="s1">Airplane mode</label></div>
        </section>

        <section class="ks-section" id="slider">
          <h2 class="h5">Slider</h2>
          <input type="range" class="form-range" style="max-width:20rem" min="0" max="100" value="40" aria-label="Volume">
        </section>

        <section class="ks-section" id="native-select">
          <h2 class="h5">Native Select</h2>
          <select class="form-select" style="max-width:16rem" aria-label="Framework">
            <option selected>Next.js</option>
            <option>SvelteKit</option>
            <option>Astro</option>
          </select>
        </section>

        <section class="ks-section" id="select">
          <h2 class="h5">Select</h2>
          <select class="form-select" data-bootcn-select data-placeholder="Select a fruit…">
            <option value="" disabled selected hidden></option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="blueberry">Blueberry</option>
            <option value="grapes">Grapes</option>
          </select>
        </section>

        <section class="ks-section" id="combobox">
          <h2 class="h5">Combobox</h2>
          <select class="form-select" data-bootcn-combobox data-placeholder="Select framework…" data-search-placeholder="Search framework…">
            <option value="" disabled selected hidden></option>
            <option value="next">Next.js</option><option value="svelte">SvelteKit</option>
            <option value="nuxt">Nuxt</option><option value="remix">Remix</option><option value="astro">Astro</option>
          </select>
        </section>

        <section class="ks-section" id="input-otp">
          <h2 class="h5">Input OTP</h2>
          <input type="text" data-bootcn-otp data-length="6" aria-label="One-time code">
        </section>

        <section class="ks-section" id="calendar">
          <h2 class="h5">Calendar</h2>
          <div class="card d-inline-block"><div data-bootcn-calendar></div></div>
        </section>

        <section class="ks-section" id="date-picker">
          <h2 class="h5">Date Picker</h2>
          <input type="hidden" data-bootcn-datepicker data-placeholder="Pick a date">
        </section>

        <section class="ks-section" id="accordion">
          <h2 class="h5">Accordion</h2>
          <div class="accordion" id="acc1" style="max-width:32rem">
            <div class="accordion-item">
              <h3 class="accordion-header"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#acc-a">Is it accessible?</button></h3>
              <div id="acc-a" class="accordion-collapse collapse show" data-bs-parent="#acc1"><div class="accordion-body">Yes. It uses Bootstrap collapse with keyboard support.</div></div>
            </div>
            <div class="accordion-item">
              <h3 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#acc-b">Is it styled?</button></h3>
              <div id="acc-b" class="accordion-collapse collapse" data-bs-parent="#acc1"><div class="accordion-body">Yes. Hairline borders, no card chrome — the shadcn accordion look.</div></div>
            </div>
          </div>
        </section>

        <section class="ks-section" id="breadcrumb">
          <h2 class="h5">Breadcrumb</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item"><a href="#">Components</a></li>
              <li class="breadcrumb-item active" aria-current="page">Breadcrumb</li>
            </ol>
          </nav>
        </section>

        <section class="ks-section" id="navigation-menu">
          <h2 class="h5">Navigation Menu</h2>
          <nav data-bootcn-navmenu>
            <div class="bootcn-navmenu-item">
              <button class="bootcn-navmenu-trigger">Products <span class="bootcn-navmenu-caret">&#9662;</span></button>
              <div class="bootcn-navmenu-content">
                <a class="bootcn-navmenu-link-card" href="#"><div class="title">Analytics</div><div class="desc">Understand your traffic and conversions.</div></a>
                <a class="bootcn-navmenu-link-card" href="#"><div class="title">Billing</div><div class="desc">Invoices, plans, and payment methods.</div></a>
              </div>
            </div>
            <a class="bootcn-navmenu-link" href="#">Docs</a>
            <a class="bootcn-navmenu-link" href="#">Pricing</a>
          </nav>
        </section>

        <section class="ks-section" id="sidebar">
          <h2 class="h5">Sidebar</h2>
          <button class="btn btn-outline-secondary btn-sm mb-2" data-bootcn-sidebar-toggle>Toggle sidebar</button>
          <div class="bootcn-app-shell d-flex card overflow-hidden" style="height:12rem;max-width:36rem">
            <aside data-bootcn-sidebar class="bootcn-sidebar">
              <nav class="bootcn-sidebar-nav py-2">
                <?php foreach (['⌂'=>'Dashboard','◱'=>'Users','⚙'=>'Settings'] as $i=>$l): ?>
                  <a class="bootcn-sidebar-link" href="#"><span class="bootcn-sidebar-icon" aria-hidden="true"><?= $i ?></span><span class="bootcn-sidebar-label"><?= $l ?></span></a>
                <?php endforeach; ?>
              </nav>
            </aside>
            <div class="bootcn-main p-3 text-body-secondary">Content area</div>
          </div>
        </section>

        <section class="ks-section" id="tabs">
          <h2 class="h5">Tabs</h2>
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-a" type="button">Account</button></li>
            <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-b" type="button">Password</button></li>
          </ul>
          <div class="tab-content pt-3">
            <div class="tab-pane fade show active" id="tab-a">Make changes to your account here.</div>
            <div class="tab-pane fade" id="tab-b">Change your password here.</div>
          </div>
        </section>

        <section class="ks-section" id="separator">
          <h2 class="h5">Separator</h2>
          <p class="mb-2">Above</p>
          <hr class="bootcn-separator">
          <div class="d-flex align-items-center gap-2">
            <span>Blog</span>
            <span class="bootcn-separator" data-orientation="vertical"></span>
            <span>Docs</span>
          </div>
        </section>

        <section class="ks-section" id="scroll-area">
          <h2 class="h5">Scroll Area</h2>
          <div class="bootcn-scroll-area card p-3" style="height:8rem;max-width:18rem">
            <?php for ($i = 1; $i <= 15; $i++) echo "<div class='py-1'>Notification $i</div>"; ?>
          </div>
        </section>

        <section class="ks-section" id="resizable">
          <h2 class="h5">Resizable</h2>
          <div data-bootcn-resizable class="card overflow-hidden" style="height:8rem;max-width:32rem">
            <div data-bootcn-panel class="p-3 d-flex align-items-center justify-content-center fw-medium">Sidebar</div>
            <div data-bootcn-panel class="p-3 d-flex align-items-center justify-content-center fw-medium bg-body-secondary">Content</div>
          </div>
        </section>

        <section class="ks-section" id="dialog">
          <h2 class="h5">Dialog</h2>
          <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#dlg">Open dialog</button>
          <div class="modal fade" id="dlg" tabindex="-1">
            <div class="modal-dialog"><div class="modal-content">
              <div class="modal-header"><h5 class="modal-title">Edit profile</h5><button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
              <div class="modal-body">Make changes to your profile here. Click save when you're done.</div>
              <div class="modal-footer">
                <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button class="btn btn-primary" data-bs-dismiss="modal">Save</button>
              </div>
            </div></div>
          </div>
        </section>

        <section class="ks-section" id="alert-dialog">
          <h2 class="h5">Alert Dialog</h2>
          <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#adlg">Show alert dialog</button>
          <div class="modal fade bootcn-alert-dialog" id="adlg" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Are you absolutely sure?</h5>
              </div>
              <div class="modal-body">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</div>
              <div class="modal-footer">
                <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button class="btn btn-danger" data-bs-dismiss="modal">Continue</button>
              </div>
            </div></div>
          </div>
        </section>

        <section class="ks-section" id="sheet">
          <h2 class="h5">Sheet</h2>
          <button class="btn btn-outline-secondary" data-bs-toggle="offcanvas" data-bs-target="#sheet">Open sheet</button>
          <div class="offcanvas offcanvas-end" id="sheet" tabindex="-1">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title">Edit profile</h5>
              <button class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">Slide-over panel. Same surface as shadcn Sheet; Bootstrap Offcanvas underneath.</div>
          </div>
        </section>

        <section class="ks-section" id="drawer">
          <h2 class="h5">Drawer</h2>
          <button class="btn btn-outline-secondary" data-bs-toggle="offcanvas" data-bs-target="#drawer">Open drawer</button>
          <div class="offcanvas offcanvas-bottom" id="drawer" tabindex="-1" style="height:16rem">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title">Move goal</h5>
              <button class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">Bottom sheet — shadcn Drawer maps to <code>offcanvas-bottom</code>.</div>
          </div>
        </section>

        <section class="ks-section" id="popover">
          <h2 class="h5">Popover</h2>
          <button class="btn btn-outline-secondary" data-bs-toggle="popover" data-bs-placement="right" data-bs-title="Dimensions" data-bs-content="Set the dimensions for the layer.">Open popover</button>
        </section>

        <section class="ks-section" id="tooltip">
          <h2 class="h5">Tooltip</h2>
          <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" title="Add to library">Hover me</button>
        </section>

        <section class="ks-section" id="hover-card">
          <h2 class="h5">Hover Card</h2>
          <p class="mb-0">Created by <span data-bootcn-hovercard>
            <a data-bootcn-hovercard-trigger href="#" class="fw-medium">@sofia</a>
            <template data-bootcn-hovercard-content>
              <div class="d-flex gap-2"><span class="bootcn-avatar">SC</span>
                <div><div class="fw-semibold">Sofia Chen</div>
                <div class="text-body-secondary">Joined March 2024</div>
                <p class="mb-0 mt-1">Product designer building calm tools at Acme.</p></div></div>
            </template></span> — hover to preview.</p>
        </section>

        <section class="ks-section" id="context-menu">
          <h2 class="h5">Context Menu</h2>
          <div data-bootcn-context-menu>
            <div data-bootcn-context-trigger class="d-flex align-items-center justify-content-center text-body-secondary border rounded" style="height:6rem;max-width:24rem;border-style:dashed!important">Right-click here</div>
            <div data-bootcn-context-content hidden>
              <button data-bootcn-context-item onclick="bootcn.toast('Opened')">Open</button>
              <button data-bootcn-context-item onclick="bootcn.toast('Renaming…')">Rename</button>
              <button data-bootcn-context-item data-disabled>Duplicate</button>
              <hr>
              <button data-bootcn-context-item class="text-danger" onclick="bootcn.toast.error('Deleted')">Delete</button>
            </div>
          </div>
        </section>

        <section class="ks-section" id="dropdown-menu">
          <h2 class="h5">Dropdown Menu</h2>
          <div class="dropdown d-inline-block">
            <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Open</button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Billing</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Log out</a></li>
            </ul>
          </div>
        </section>

        <section class="ks-section" id="menubar">
          <h2 class="h5">Menubar</h2>
          <div data-bootcn-menubar>
            <div class="dropdown"><button class="bootcn-menubar-trigger">File</button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item">New Tab <span class="bootcn-menubar-kbd">⌘T</span></button></li>
                <li><button class="dropdown-item">New Window <span class="bootcn-menubar-kbd">⌘N</span></button></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item">Print <span class="bootcn-menubar-kbd">⌘P</span></button></li>
              </ul></div>
            <div class="dropdown"><button class="bootcn-menubar-trigger">Edit</button>
              <ul class="dropdown-menu"><li><button class="dropdown-item">Undo <span class="bootcn-menubar-kbd">⌘Z</span></button></li></ul></div>
          </div>
        </section>

        <section class="ks-section" id="command">
          <h2 class="h5">Command</h2>
          <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.command.open()">Open command palette (Ctrl / ⌘ K)</button>
          <div data-bootcn-command hidden>
            <div data-bootcn-command-group="Navigation">
              <button data-bootcn-command-item data-href="dashboard.php" data-shortcut="G D">Go to Dashboard</button>
              <button data-bootcn-command-item data-href="users.php" data-shortcut="G U">Go to Users</button>
            </div>
            <div data-bootcn-command-group="Actions">
              <button data-bootcn-command-item data-id="copy">Copy current URL</button>
              <button data-bootcn-command-item data-id="theme">Toggle theme</button>
            </div>
          </div>
        </section>

        <section class="ks-section" id="alert">
          <h2 class="h5">Alert</h2>
          <div class="alert mb-3" role="alert" style="max-width:36rem">
            <?= icon('bell') ?>
            <div>
              <div class="bootcn-alert-title">Heads up!</div>
              <p class="bootcn-alert-desc">You can add components to your app using the cli.</p>
            </div>
          </div>
          <div class="alert alert-danger bootcn-alert-destructive" role="alert" style="max-width:36rem">
            <?= icon('activity') ?>
            <div>
              <div class="bootcn-alert-title">Error</div>
              <p class="bootcn-alert-desc">Your session has expired. Please log in again.</p>
            </div>
          </div>
        </section>

        <section class="ks-section" id="toast">
          <span id="sonner"></span>
          <h2 class="h5">Toast / Sonner</h2>
          <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.toast('Link copied')">Default</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.toast.success('Changes saved', {description:'Your profile is up to date.'})">Success</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.toast.error('Could not save', {description:'Check your connection.'})">Error</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="bootcn.toast('Event deleted', {action:{label:'Undo', onClick(){bootcn.toast.success('Restored')}}})">With action</button>
        </section>

        <section class="ks-section" id="progress">
          <h2 class="h5">Progress</h2>
          <div class="progress" style="max-width:20rem" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width:60%"></div>
          </div>
        </section>

        <section class="ks-section" id="spinner">
          <h2 class="h5">Spinner</h2>
          <div class="spinner-border" role="status"><span class="visually-hidden">Loading…</span></div>
        </section>

        <section class="ks-section" id="skeleton">
          <h2 class="h5">Skeleton</h2>
          <div class="d-flex align-items-center gap-3">
            <span class="bootcn-skeleton rounded-circle" style="width:2.5rem;height:2.5rem"></span>
            <div style="width:12rem">
              <span class="bootcn-skeleton d-block mb-2" style="height:.75rem;width:70%"></span>
              <span class="bootcn-skeleton d-block" style="height:.75rem;width:100%"></span>
            </div>
          </div>
        </section>

        <section class="ks-section" id="badge">
          <h2 class="h5">Badge</h2>
          <span class="badge text-bg-primary">Default</span>
          <span class="badge text-bg-secondary">Secondary</span>
          <span class="badge badge-destructive">Destructive</span>
          <span class="badge badge-outline">Outline</span>
        </section>

        <section class="ks-section" id="empty">
          <h2 class="h5">Empty</h2>
          <div class="bootcn-empty" style="max-width:28rem">
            <div class="bootcn-empty-header">
              <span class="bootcn-empty-media bootcn-empty-media-icon"><?= icon('inbox') ?></span>
              <h3 class="bootcn-empty-title">No projects yet</h3>
              <p class="bootcn-empty-desc">Get started by creating a new project.</p>
            </div>
            <div class="bootcn-empty-content">
              <button class="btn btn-primary btn-sm">Create project</button>
            </div>
          </div>
        </section>

        <section class="ks-section" id="avatar">
          <h2 class="h5">Avatar</h2>
          <span class="bootcn-avatar"><span>SC</span></span>
          <span class="bootcn-avatar bootcn-avatar-sm"><span>JL</span></span>
          <span class="bootcn-avatar bootcn-avatar-lg"><span>IN</span></span>
        </section>

        <section class="ks-section" id="card">
          <h2 class="h5">Card</h2>
          <div class="card" style="max-width:22rem">
            <div class="card-body">
              <h5 class="card-title">Create project</h5>
              <p class="card-text text-body-secondary">Deploy your new project in one-click.</p>
              <button class="btn btn-primary btn-sm">Deploy</button>
            </div>
          </div>
        </section>

        <section class="ks-section" id="table">
          <h2 class="h5">Table</h2>
          <table class="table" style="max-width:28rem">
            <thead><tr><th>Invoice</th><th>Status</th><th>Amount</th></tr></thead>
            <tbody>
              <tr><td>INV001</td><td>Paid</td><td>$250.00</td></tr>
              <tr><td>INV002</td><td>Pending</td><td>$150.00</td></tr>
            </tbody>
          </table>
        </section>

        <section class="ks-section" id="data-table">
          <h2 class="h5">Data Table</h2>
          <div style="max-width:40rem">
            <table class="table align-middle" data-bootcn-datatable data-page-size="4">
              <thead><tr><th data-sortable>Name</th><th data-sortable>Email</th><th data-sortable data-sort="number">Amount</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Olivia Martin</td><td>olivia@email.com</td><td>$1,999.00</td><td><span class="badge text-bg-secondary">Paid</span></td></tr>
                <tr><td>Jackson Lee</td><td>jackson@email.com</td><td>$39.00</td><td><span class="badge text-bg-secondary">Paid</span></td></tr>
                <tr><td>Isabella Nguyen</td><td>isabella@email.com</td><td>$299.00</td><td><span class="badge badge-outline">Pending</span></td></tr>
                <tr><td>William Kim</td><td>will@email.com</td><td>$99.00</td><td><span class="badge text-bg-secondary">Paid</span></td></tr>
                <tr><td>Sofia Davis</td><td>sofia@email.com</td><td>$4,200.00</td><td><span class="badge badge-outline">Pending</span></td></tr>
                <tr><td>Ava Brown</td><td>ava@email.com</td><td>$12.00</td><td><span class="badge text-bg-secondary">Paid</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="ks-section" id="chart">
          <h2 class="h5">Chart</h2>
          <div class="row g-3">
            <div class="col-md-6">
              <div data-bootcn-chart data-type="bar">
                <script type="application/json">[{"label":"Jan","value":186},{"label":"Feb","value":305},{"label":"Mar","value":237},{"label":"Apr","value":73},{"label":"May","value":209}]</script>
              </div>
            </div>
            <div class="col-md-6">
              <div data-bootcn-chart data-type="donut" style="max-width:12rem">
                <script type="application/json">[{"label":"Chrome","value":60},{"label":"Safari","value":25},{"label":"Firefox","value":15}]</script>
              </div>
            </div>
          </div>
        </section>

        <section class="ks-section" id="carousel">
          <h2 class="h5">Carousel</h2>
          <div id="car1" class="carousel slide card overflow-hidden" style="max-width:24rem" data-bs-ride="false">
            <div class="carousel-inner">
              <div class="carousel-item active"><div class="p-5 text-center bg-body-secondary">Slide 1</div></div>
              <div class="carousel-item"><div class="p-5 text-center bg-body-secondary">Slide 2</div></div>
              <div class="carousel-item"><div class="p-5 text-center bg-body-secondary">Slide 3</div></div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#car1" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
            <button class="carousel-control-next" type="button" data-bs-target="#car1" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>
          </div>
        </section>

        <section class="ks-section" id="aspect-ratio">
          <h2 class="h5">Aspect Ratio</h2>
          <div class="ratio ratio-16x9 card overflow-hidden" style="max-width:24rem">
            <div class="d-flex align-items-center justify-content-center bg-body-secondary">16:9</div>
          </div>
        </section>

        <section class="ks-section" id="typography">
          <h2 class="h5">Typography</h2>
          <h1 class="h1">Taxing Laughter: The Joke Tax Chronicles</h1>
          <p class="lead">A lead paragraph sits at 14px base with muted tracking on headings.</p>
          <p>The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
          <blockquote class="blockquote"><p>After all, he said, everyone enjoys a good joke, so it's only fair that they should pay for the privilege.</p></blockquote>
          <p><code>bootcn.toast()</code> · <a href="#">inline link</a></p>
        </section>

        <section class="ks-section" id="item">
          <h2 class="h5">Item</h2>
          <div class="bootcn-item-group" style="max-width:28rem">
            <div class="bootcn-item bootcn-item-outline">
              <span class="bootcn-item-media bootcn-item-media-icon"><?= icon('billing') ?></span>
              <div class="bootcn-item-content">
                <div class="bootcn-item-title">Visa ending in 4242</div>
                <p class="bootcn-item-desc">Expires 12/28</p>
              </div>
              <div class="bootcn-item-actions"><button class="btn btn-ghost btn-sm">Edit</button></div>
            </div>
          </div>
        </section>

        <section class="ks-section" id="kbd">
          <h2 class="h5">Kbd</h2>
          <span class="bootcn-kbd-group">
            <kbd class="bootcn-kbd">⌘</kbd>
            <kbd class="bootcn-kbd">K</kbd>
          </span>
          to open the command palette.
        </section>

        <section class="ks-section" id="collapsible">
          <h2 class="h5">Collapsible</h2>
          <button class="btn btn-ghost btn-sm" data-bs-toggle="collapse" data-bs-target="#coll1">@peduarte starred 3 repositories</button>
          <div class="collapse show" id="coll1">
            <div class="card card-body mt-2" style="max-width:24rem">@radix-ui/primitives</div>
          </div>
        </section>

        <section class="ks-section" id="toggle">
          <h2 class="h5">Toggle</h2>
          <button type="button" class="bootcn-toggle" data-bootcn-toggle aria-pressed="false" aria-label="Toggle italic"><?= icon('italic') ?></button>
        </section>

        <section class="ks-section" id="toggle-group">
          <h2 class="h5">Toggle Group</h2>
          <div data-bootcn-toggle-group data-type="single" class="bootcn-toggle-group-outline">
            <button type="button" class="bootcn-toggle" data-value="bold" data-default aria-label="Bold"><?= icon('bold') ?></button>
            <button type="button" class="bootcn-toggle" data-value="italic" aria-label="Italic"><?= icon('italic') ?></button>
            <button type="button" class="bootcn-toggle" data-value="underline" aria-label="Underline"><?= icon('underline') ?></button>
          </div>
        </section>

        <section class="ks-section" id="pagination">
          <h2 class="h5">Pagination</h2>
          <nav aria-label="Page">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </section>

        <section class="ks-section" id="direction">
          <h2 class="h5">Direction</h2>
          <p class="text-body-secondary small">shadcn's Direction is a React RTL provider. Here, set <code>dir="rtl"</code> on <code>&lt;html&gt;</code> or a subtree — Bootstrap logical properties and this theme follow it.</p>
          <div class="card p-3" dir="rtl" style="max-width:22rem">
            <label class="form-label">البريد الإلكتروني</label>
            <input class="form-control" placeholder="you@example.com">
            <button class="btn btn-primary mt-3">متابعة</button>
          </div>
        </section>
      </div>
    </div>
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
