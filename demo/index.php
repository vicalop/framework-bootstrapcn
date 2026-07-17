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
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">shadcn theme kitchen sink</h1>
      <button id="themeToggle" class="btn btn-outline-secondary btn-sm" type="button">Toggle theme</button>
    </div>

    <section class="mb-4">
      <h2 class="h5">Buttons</h2>
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-danger">Destructive</button>
      <button class="btn btn-outline-secondary">Outline</button>
      <button class="btn btn-link">Link</button>
      <button class="btn btn-primary" disabled>Disabled</button>
    </section>

    <section class="mb-4">
      <h2 class="h5">Form</h2>
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" placeholder="you@example.com">
        </div>
        <div class="col-md-4">
          <label class="form-label">Role</label>
          <select class="form-select"><option>Admin</option><option>User</option></select>
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
      <h2 class="h5">Table</h2>
      <table class="table"><thead><tr><th>Name</th><th>Role</th></tr></thead>
        <tbody><tr><td>Ada</td><td>Admin</td></tr><tr><td>Linus</td><td>User</td></tr></tbody></table>
    </section>
  </div>

  <script src="/dist/js/bootstrap.bundle.min.js"></script>
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
  </script>
</body>
</html>
