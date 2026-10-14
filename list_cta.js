const fs = require('fs');

['agent-dashboard.html', 'admin-dashboard.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  const regex = /<(button|a)[^>]*class=["'][^"']*(btn-cta|action-cta|btn|data-cta)[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(c)) !== null) {
    const txt = match[3].replace(/<[^>]+>/g, '').trim();
    if (txt && !match[0].includes('sidebar-link') && !match[0].includes('sidebar-logo')) {
      console.log('  ', txt);
    }
  }
});
