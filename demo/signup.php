<?php require __DIR__ . '/partials/icons.php'; ?>
<!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Create account · Acme</title>
  <link rel="stylesheet" href="/dist/css/bootstrap-shadcn.min.css">
  <link rel="stylesheet" href="/demo/demo.css">
</head>
<body>
<div class="auth-wrap">
  <div class="auth-card">
    <div class="text-center mb-4">
      <span class="brand-mark mx-auto mb-3" style="width:2.5rem;height:2.5rem;font-size:1.25rem"><?= icon('activity') ?></span>
      <h1 class="h4 mb-1" style="letter-spacing:-0.02em">Create your account</h1>
      <p class="page-sub">Start your 14-day free trial. No card required.</p>
    </div>
    <div class="card">
      <div class="card-body p-4">
        <form onsubmit="location.href='dashboard.php';return false">
          <div class="mb-3">
            <label class="form-label" for="s-name">Name</label>
            <input class="form-control" id="s-name" placeholder="Sofia Chen" required>
          </div>
          <div class="mb-3">
            <label class="form-label" for="s-email">Email</label>
            <input class="form-control" id="s-email" type="email" placeholder="you@acme.com" required>
          </div>
          <div class="mb-3">
            <label class="form-label" for="s-pass">Password</label>
            <input class="form-control" id="s-pass" type="password" placeholder="At least 8 characters" required>
            <div class="form-text">Use 8 or more characters with a mix of letters and numbers.</div>
          </div>
          <button class="btn btn-primary w-100" type="submit">Create account</button>
        </form>
        <div class="auth-divider my-3">or</div>
        <button class="btn btn-outline-secondary w-100"><?= icon('github') ?>&nbsp;Sign up with GitHub</button>
      </div>
    </div>
    <p class="text-center page-sub mt-3">
      Already have an account? <a href="login.php">Sign in</a>
    </p>
  </div>
</div>
<script src="/dist/js/bootstrap.bundle.min.js"></script>
<script src="/demo/demo.js"></script>
</body>
</html>
