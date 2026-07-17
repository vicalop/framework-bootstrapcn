<?php require __DIR__ . '/partials/icons.php'; ?>
<!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sign in · Acme</title>
  <link rel="stylesheet" href="/dist/css/bootstrap-shadcn.min.css">
  <link rel="stylesheet" href="/demo/demo.css">
</head>
<body>
<div class="auth-wrap">
  <div class="auth-card">
    <div class="text-center mb-4">
      <span class="brand-mark mx-auto mb-3" style="width:2.5rem;height:2.5rem;font-size:1.25rem"><?= icon('activity') ?></span>
      <h1 class="h4 mb-1" style="letter-spacing:-0.02em">Welcome back</h1>
      <p class="page-sub">Sign in to your Acme account</p>
    </div>
    <div class="card">
      <div class="card-body p-4">
        <form onsubmit="location.href='dashboard.php';return false">
          <div class="mb-3">
            <label class="form-label" for="l-email">Email</label>
            <input class="form-control" id="l-email" type="email" placeholder="you@acme.com" required>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between">
              <label class="form-label" for="l-pass">Password</label>
              <a href="#" class="small">Forgot password?</a>
            </div>
            <input class="form-control" id="l-pass" type="password" placeholder="••••••••" required>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="l-remember">
            <label class="form-check-label small" for="l-remember">Remember me for 30 days</label>
          </div>
          <button class="btn btn-primary w-100" type="submit">Sign in</button>
        </form>
        <div class="auth-divider my-3">or</div>
        <button class="btn btn-outline-secondary w-100"><?= icon('github') ?>&nbsp;Continue with GitHub</button>
      </div>
    </div>
    <p class="text-center page-sub mt-3">
      Don’t have an account? <a href="signup.php">Sign up</a>
    </p>
  </div>
</div>
<script src="/dist/js/bootstrap.bundle.min.js"></script>
<script src="/demo/demo.js"></script>
</body>
</html>
