<?php $title = 'Dashboard'; $active = 'dashboard'; require __DIR__ . '/partials/shell-top.php'; ?>

<div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
  <div>
    <h1 class="page-title">Dashboard</h1>
    <p class="page-sub">Your store’s performance over the last 30 days.</p>
  </div>
  <div class="d-flex gap-2">
    <button class="btn btn-outline-secondary btn-sm">Jan 1 – Jan 30</button>
    <button class="btn btn-primary btn-sm"><?= icon('up') ?>&nbsp;Export</button>
  </div>
</div>

<?php
$stats = [
  ['label' => 'Total revenue', 'icon' => 'dollar',   'value' => '$45,231.89', 'delta' => '+20.1%', 'dir' => 'up',   'note' => 'from last month'],
  ['label' => 'Subscriptions', 'icon' => 'users',    'value' => '+2,350',     'delta' => '+180.1%','dir' => 'up',   'note' => 'from last month'],
  ['label' => 'Sales',         'icon' => 'billing',   'value' => '+12,234',    'delta' => '+19%',   'dir' => 'up',   'note' => 'from last month'],
  ['label' => 'Active now',     'icon' => 'activity', 'value' => '+573',       'delta' => '-2.4%',  'dir' => 'down', 'note' => 'since last hour'],
];
?>
<div class="row g-4 mb-4">
  <?php foreach ($stats as $s): ?>
  <div class="col-sm-6 col-xl-3">
    <div class="card h-100">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="text-body-secondary small fw-medium"><?= $s['label'] ?></span>
          <span class="stat-ico"><?= icon($s['icon']) ?></span>
        </div>
        <div class="stat-num"><?= $s['value'] ?></div>
        <div class="small text-body-secondary mt-1">
          <span class="delta-<?= $s['dir'] ?> fw-medium"><?= $s['delta'] ?></span> <?= $s['note'] ?>
        </div>
      </div>
    </div>
  </div>
  <?php endforeach; ?>
</div>

<div class="row g-4">
  <div class="col-lg-7">
    <div class="card h-100">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">Overview</h2>
        <p class="page-sub">Revenue by month</p>
      </div>
      <div class="card-body">
        <?php $bars = [46, 58, 40, 63, 52, 71, 48, 66, 90, 61, 74, 55];
              $months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; ?>
        <div class="chart">
          <?php foreach ($bars as $b): ?><div class="bar" style="height: <?= $b ?>%"></div><?php endforeach; ?>
        </div>
        <div class="chart-x">
          <?php foreach ($months as $m): ?><span><?= $m ?></span><?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-5">
    <div class="card h-100">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">Recent sales</h2>
        <p class="page-sub">You made 265 sales this month.</p>
      </div>
      <div class="card-body">
        <?php
        $sales = [
          ['n' => 'Olivia Martin',  'e' => 'olivia.martin@email.com', 'a' => 'OM', 'v' => '+$1,999.00'],
          ['n' => 'Jackson Lee',    'e' => 'jackson.lee@email.com',   'a' => 'JL', 'v' => '+$39.00'],
          ['n' => 'Isabella Nguyen','e' => 'isabella@email.com',      'a' => 'IN', 'v' => '+$299.00'],
          ['n' => 'William Kim',    'e' => 'will@email.com',          'a' => 'WK', 'v' => '+$99.00'],
          ['n' => 'Sofia Davis',    'e' => 'sofia.davis@email.com',   'a' => 'SD', 'v' => '+$39.00'],
        ];
        foreach ($sales as $p): ?>
        <div class="list-row">
          <span class="avatar"><?= $p['a'] ?></span>
          <div class="flex-grow-1 min-w-0">
            <div class="fw-medium small text-truncate"><?= $p['n'] ?></div>
            <div class="text-body-secondary small text-truncate"><?= $p['e'] ?></div>
          </div>
          <div class="fw-medium small"><?= $p['v'] ?></div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</div>

<?php require __DIR__ . '/partials/shell-bottom.php'; ?>
