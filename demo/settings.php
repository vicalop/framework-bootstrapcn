<?php $title = 'Settings'; $active = 'settings'; require __DIR__ . '/partials/shell-top.php'; ?>

<div class="mb-4">
  <h1 class="page-title">Settings</h1>
  <p class="page-sub">Manage your account settings and preferences.</p>
</div>

<ul class="nav nav-tabs mb-4" role="tablist">
  <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-profile" type="button" role="tab">Profile</button></li>
  <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-notifs" type="button" role="tab">Notifications</button></li>
  <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-billing" type="button" role="tab">Billing</button></li>
</ul>

<div class="tab-content" style="max-width:42rem">
  <!-- Profile -->
  <div class="tab-pane fade show active" id="tab-profile" role="tabpanel">
    <div class="card">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">Profile</h2>
        <p class="page-sub">This is how others will see you on the site.</p>
      </div>
      <div class="card-body">
        <div class="d-flex align-items-center gap-3 mb-4">
          <span class="avatar" style="width:3.5rem;height:3.5rem;font-size:1rem">SC</span>
          <div>
            <button class="btn btn-outline-secondary btn-sm">Change avatar</button>
            <p class="page-sub mt-1">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-sm-6">
            <label class="form-label" for="f-name">Name</label>
            <input class="form-control" id="f-name" value="Sofia Chen">
          </div>
          <div class="col-sm-6">
            <label class="form-label" for="f-user">Username</label>
            <input class="form-control" id="f-user" value="sofiachen">
          </div>
          <div class="col-12">
            <label class="form-label" for="f-email">Email</label>
            <input class="form-control" id="f-email" type="email" value="sofia@acme.com">
            <div class="form-text">Used for sign-in and receipts.</div>
          </div>
          <div class="col-12">
            <label class="form-label" for="f-bio">Bio</label>
            <textarea class="form-control" id="f-bio" rows="3">Product designer building calm tools at Acme.</textarea>
          </div>
        </div>
      </div>
      <div class="card-footer bg-transparent d-flex justify-content-end gap-2">
        <button class="btn btn-outline-secondary">Cancel</button>
        <button class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>

  <!-- Notifications -->
  <div class="tab-pane fade" id="tab-notifs" role="tabpanel">
    <div class="card">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">Notifications</h2>
        <p class="page-sub">Choose what you want to hear about.</p>
      </div>
      <div class="card-body">
        <?php
        $prefs = [
          ['t'=>'Product updates','d'=>'News about features and improvements.','on'=>true],
          ['t'=>'Security alerts','d'=>'Sign-ins and changes to your account.','on'=>true],
          ['t'=>'Weekly digest','d'=>'A summary of activity every Monday.','on'=>false],
          ['t'=>'Marketing emails','d'=>'Offers, surveys, and announcements.','on'=>false],
        ];
        foreach ($prefs as $i => $p): ?>
        <div class="d-flex justify-content-between align-items-start gap-3<?= $i ? ' mt-3 pt-3 border-top' : '' ?>">
          <div>
            <div class="fw-medium small"><?= $p['t'] ?></div>
            <div class="text-body-secondary small"><?= $p['d'] ?></div>
          </div>
          <div class="form-check form-switch mt-1">
            <input class="form-check-input" type="checkbox" <?= $p['on'] ? 'checked' : '' ?> aria-label="<?= $p['t'] ?>">
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="card-footer bg-transparent d-flex justify-content-end">
        <button class="btn btn-primary">Save preferences</button>
      </div>
    </div>
  </div>

  <!-- Billing -->
  <div class="tab-pane fade" id="tab-billing" role="tabpanel">
    <div class="card mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">Plan</h2>
        <p class="page-sub">You are currently on the Pro plan.</p>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="fw-semibold">Pro</span>
              <span class="badge text-bg-primary">Current</span>
            </div>
            <div class="page-sub">$29 / month · renews Feb 1, 2026</div>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary btn-sm">Cancel plan</button>
            <button class="btn btn-primary btn-sm">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">Payment method</h2>
        <p class="page-sub">Charged automatically each period.</p>
      </div>
      <div class="card-body d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-2">
          <span class="stat-ico"><?= icon('billing') ?></span>
          <span class="small">Visa ending in <span class="fw-medium">4242</span></span>
        </div>
        <button class="btn btn-outline-secondary btn-sm">Update</button>
      </div>
    </div>
  </div>
</div>

<script>
  // If arriving at settings.php#billing from the sidebar, open the Billing tab.
  // Deferred to load so bootstrap.bundle (included by shell-bottom) is available.
  window.addEventListener('load', function () {
    if (location.hash === '#billing') {
      new bootstrap.Tab(document.querySelector('[data-bs-target="#tab-billing"]')).show();
    }
  });
</script>

<?php require __DIR__ . '/partials/shell-bottom.php'; ?>
