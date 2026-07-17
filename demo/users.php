<?php $title = 'Users'; $active = 'users'; require __DIR__ . '/partials/shell-top.php'; ?>

<div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
  <div>
    <h1 class="page-title">Users</h1>
    <p class="page-sub">Manage who has access to this workspace.</p>
  </div>
  <button class="btn btn-primary btn-sm"><?= icon('plus') ?>&nbsp;Invite user</button>
</div>

<div class="d-flex flex-wrap gap-2 mb-3">
  <div class="topbar-search" style="max-width:18rem">
    <?= icon('search') ?>
    <input type="search" class="form-control form-control-sm" placeholder="Filter users…" style="padding-left:2rem">
  </div>
  <div class="dropdown">
    <button class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">Status</button>
    <ul class="dropdown-menu">
      <li><label class="dropdown-item"><input class="form-check-input me-2" type="checkbox" checked>Active</label></li>
      <li><label class="dropdown-item"><input class="form-check-input me-2" type="checkbox" checked>Invited</label></li>
      <li><label class="dropdown-item"><input class="form-check-input me-2" type="checkbox">Suspended</label></li>
    </ul>
  </div>
  <button class="btn btn-outline-secondary btn-sm ms-auto">Columns&nbsp;<?= icon('chevrondown') ?></button>
</div>

<?php
$users = [
  ['n'=>'Sofia Chen','e'=>'sofia@acme.com','a'=>'SC','role'=>'Owner','st'=>'active','stl'=>'Active','last'=>'2 min ago'],
  ['n'=>'Marcus Reed','e'=>'marcus@acme.com','a'=>'MR','role'=>'Admin','st'=>'active','stl'=>'Active','last'=>'1 hour ago'],
  ['n'=>'Priya Anand','e'=>'priya@acme.com','a'=>'PA','role'=>'Member','st'=>'active','stl'=>'Active','last'=>'3 hours ago'],
  ['n'=>'Diego Torres','e'=>'diego@acme.com','a'=>'DT','role'=>'Member','st'=>'invited','stl'=>'Invited','last'=>'—'],
  ['n'=>'Hana Ito','e'=>'hana@acme.com','a'=>'HI','role'=>'Member','st'=>'active','stl'=>'Active','last'=>'Yesterday'],
  ['n'=>'Tom Becker','e'=>'tom@acme.com','a'=>'TB','role'=>'Viewer','st'=>'suspended','stl'=>'Suspended','last'=>'2 weeks ago'],
];
?>
<div class="card">
  <div class="table-responsive">
    <table class="table align-middle mb-0">
      <thead>
        <tr>
          <th style="width:2.5rem"><input class="form-check-input" type="checkbox" aria-label="Select all"></th>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
          <th>Last active</th>
          <th class="text-end">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($users as $u): ?>
        <tr>
          <td><input class="form-check-input" type="checkbox" aria-label="Select row"></td>
          <td>
            <div class="d-flex align-items-center gap-2 min-w-0">
              <span class="avatar avatar-sm"><?= $u['a'] ?></span>
              <div class="min-w-0">
                <div class="fw-medium small text-truncate"><?= $u['n'] ?></div>
                <div class="text-body-secondary small text-truncate"><?= $u['e'] ?></div>
              </div>
            </div>
          </td>
          <td class="small"><?= $u['role'] ?></td>
          <td>
            <span class="badge border bg-transparent text-body-secondary fw-medium">
              <span class="dot dot-<?= $u['st'] ?>"></span><?= $u['stl'] ?>
            </span>
          </td>
          <td class="small text-body-secondary"><?= $u['last'] ?></td>
          <td class="text-end">
            <div class="dropdown">
              <button class="icon-btn" style="width:1.75rem;height:1.75rem" data-bs-toggle="dropdown" aria-label="Row actions"><?= icon('more') ?></button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">View profile</a></li>
                <li><a class="dropdown-item" href="#">Edit role</a></li>
                <li><a class="dropdown-item" href="#">Copy user ID</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#">Remove</a></li>
              </ul>
            </div>
          </td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</div>

<div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
  <span class="small text-body-secondary">0 of <?= count($users) ?> row(s) selected.</span>
  <div class="d-flex gap-2">
    <button class="btn btn-outline-secondary btn-sm" disabled>Previous</button>
    <button class="btn btn-outline-secondary btn-sm">Next</button>
  </div>
</div>

<?php require __DIR__ . '/partials/shell-bottom.php'; ?>
