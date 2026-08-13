<?php
require __DIR__ . '/icons.php';
$title  = $title  ?? 'Acme Inc';
$active = $active ?? 'dashboard';
$nav = [
  ['key' => 'dashboard', 'label' => 'Dashboard', 'icon' => 'dashboard', 'href' => 'dashboard.php'],
  ['key' => 'users',     'label' => 'Users',     'icon' => 'users',     'href' => 'users.php'],
  ['key' => 'billing',   'label' => 'Billing',   'icon' => 'billing',   'href' => 'settings.php#billing'],
  ['key' => 'settings',  'label' => 'Settings',  'icon' => 'settings',  'href' => 'settings.php'],
];
?><!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($title) ?> · Acme</title>
  <link rel="stylesheet" href="/dist/css/bootstrap-shadcn.min.css">
  <link rel="stylesheet" href="/demo/demo.css">
</head>
<body>
<div class="bootcn-app-shell d-flex" id="shell">
  <aside class="bootcn-sidebar" data-bootcn-sidebar>
    <div class="bootcn-sidebar-header">
      <span class="bootcn-sidebar-brand-mark"><?= icon('activity') ?></span>
      <span class="bootcn-sidebar-label">Acme Inc</span>
    </div>
    <nav class="bootcn-sidebar-nav">
      <div class="bootcn-sidebar-group-label">Platform</div>
      <?php foreach ($nav as $item): ?>
        <a class="bootcn-sidebar-link<?= $active === $item['key'] ? ' active' : '' ?>" href="<?= $item['href'] ?>"<?= $active === $item['key'] ? ' aria-current="page"' : '' ?>>
          <?= icon($item['icon']) ?><span class="bootcn-sidebar-label"><?= $item['label'] ?></span>
        </a>
      <?php endforeach; ?>
    </nav>
    <div class="bootcn-sidebar-footer">
      <a class="bootcn-sidebar-link" href="login.php"><?= icon('logout') ?><span class="bootcn-sidebar-label">Log out</span></a>
    </div>
  </aside>

  <div class="bootcn-main">
    <header class="bootcn-topbar">
      <button class="icon-btn bootcn-sidebar-toggle" type="button" data-bootcn-sidebar-toggle aria-label="Open navigation"><?= icon('menu') ?></button>
      <div class="topbar-search">
        <?= icon('search') ?>
        <input type="text" class="form-control" placeholder="Search…" aria-label="Search" readonly
               style="cursor:pointer" onclick="window.bootcn && bootcn.command && bootcn.command.open()">
        <span class="kbd">⌘K</span>
      </div>
      <div class="ms-auto d-flex align-items-center gap-1">
        <button class="icon-btn" type="button" id="themeToggle" aria-label="Toggle theme"><?= icon('sun') ?></button>
        <button class="icon-btn" type="button" aria-label="Notifications"><?= icon('bell') ?></button>
        <div class="dropdown">
          <button class="btn p-0 border-0 bg-transparent" data-bs-toggle="dropdown" aria-label="Account">
            <span class="avatar">SC</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><h6 class="dropdown-header">Sofia Chen<br><span class="fw-normal text-body-secondary">sofia@acme.com</span></h6></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="settings.php">Settings</a></li>
            <li><a class="dropdown-item" href="settings.php#billing">Billing</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="login.php">Log out</a></li>
          </ul>
        </div>
      </div>
    </header>
    <main class="main-scroll flex-grow-1">
      <div class="content">
