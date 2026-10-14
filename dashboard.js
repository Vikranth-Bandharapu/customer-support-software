document.addEventListener('DOMContentLoaded', () => {
  // 0. Display entered user email in sidebar
  const savedEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
  if (savedEmail) {
    document.querySelectorAll('.sidebar-user-email').forEach(el => {
      el.textContent = savedEmail;
      el.title = savedEmail;
    });
  }

  // 1. Mobile Sidebar Toggle & Background Scroll Lock
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  // Ensure overlay exists
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  function openMobileSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('open');
    document.body.classList.add('sidebar-open');
    document.documentElement.classList.add('sidebar-open');
    if (overlay) overlay.classList.add('active');
    if (sidebarToggle) {
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid fa-xmark';
      }
    }
  }

  function closeMobileSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
    document.documentElement.classList.remove('sidebar-open');
    if (overlay) overlay.classList.remove('active');
    if (sidebarToggle) {
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid fa-bars';
      }
    }
  }

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileSidebar);
    overlay.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  // Close sidebar on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      closeMobileSidebar();
    }
  });

  // Auto close mobile sidebar on screen resize above tablet breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && sidebar && sidebar.classList.contains('open')) {
      closeMobileSidebar();
    }
  });

  // 2. 5-Section Tab Navigation
  const navTabs = document.querySelectorAll('.sidebar-link[data-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-tab');
      if (!targetId) return;

      // Update active state in sidebar
      navTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Update active section view
      tabPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      // Auto close mobile sidebar and unlock background
      closeMobileSidebar();

      // Always reset scroll to the very top so section opens from the starting
      window.scrollTo(0, 0);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const mainContent = document.querySelector('.main-content');
      if (mainContent) mainContent.scrollTop = 0;

      const dashContent = document.querySelector('.dashboard-content');
      if (dashContent) dashContent.scrollTop = 0;

      const activePane = document.getElementById(targetId);
      if (activePane) {
        activePane.scrollTop = 0;
        try {
          activePane.scrollIntoView({ behavior: 'instant', block: 'start' });
        } catch (_) {}
      }

      // Reinforce on next animation frame after DOM repaint
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (mainContent) mainContent.scrollTop = 0;
        if (dashContent) dashContent.scrollTop = 0;
      });
    });
  });

  // -------------------------------------------------------------
  // 3. INTERACTIVE TICKET QUEUE & INSPECTOR (AGENT TAB 1)
  // -------------------------------------------------------------
  const ticketsData = [
    {
      id: '#TK-8021',
      badgeClass: 'urgent',
      badgeText: 'SLA URGENT',
      title: 'SSO SAML Authentication Failing (Loop 500)',
      customerHtml: 'Customer: <strong style="color:var(--secondary-color);">Alex Rivera</strong> (alex.rivera@cloudtech.corp) • Tier: Enterprise Plus',
      messages: [
        {
          sender: 'Alex Rivera (Customer)',
          time: 'Today, 10:42 AM',
          isAgent: false,
          text: 'Hello Support Team. We updated our Okta SSO certificate at 10:00 AM. Since then, none of our 450 engineers can log into our workspace. They receive error <code>HTTP 500: SAML signature validation failed</code>. This is blocking our entire team!'
        },
        {
          sender: 'Sarah Jenkins (You)',
          time: 'Today, 10:48 AM',
          isAgent: true,
          text: 'Hi Alex, I am actively diagnosing this right now. Our auth logs show your new public X.509 cert fingerprint needs to be refreshed in your tenant configuration. I am drafting the cache purge and updating your fingerprint.'
        }
      ]
    },
    {
      id: '#TK-8019',
      badgeClass: 'high',
      badgeText: 'SLA HIGH',
      title: 'Stripe Webhook Duplicate Charges on Enterprise Renewal',
      customerHtml: 'Customer: <strong style="color:var(--secondary-color);">Elena Rostova</strong> (elena@rostova-holdings.com) • Tier: Enterprise',
      messages: [
        {
          sender: 'Elena Rostova (Customer)',
          time: 'Today, 10:18 AM',
          isAgent: false,
          text: 'Our accounting department noticed duplicate charges of $12,500 on our corporate AMEX card this morning during our annual subscription rollover. Please investigate the invoice idempotency key and reverse the second charge immediately.'
        },
        {
          sender: 'Sarah Jenkins (You)',
          time: 'Today, 10:25 AM',
          isAgent: true,
          text: 'Hi Elena, thank you for flagging this. I have pulled up Stripe billing logs. The duplicate occurred due to a network timeout during the webhook retry. I have initiated a full refund of $12,500 back to your card and sent the receipt to your billing email.'
        }
      ]
    },
    {
      id: '#TK-8014',
      badgeClass: 'normal',
      badgeText: 'SLA NORMAL',
      title: 'Custom Webhook Payload Formatting & Schema Docs',
      customerHtml: 'Customer: <strong style="color:var(--secondary-color);">Marcus Chen</strong> (marcus.chen@fintech-matrix.io) • Tier: Growth Pro',
      messages: [
        {
          sender: 'Marcus Chen (Customer)',
          time: 'Today, 9:30 AM',
          isAgent: false,
          text: 'We are connecting our custom internal telemetry pipeline with SupportX event streams. We need the formal JSON schema documentation for the <code>ticket.resolved</code> and <code>ticket.escalated</code> webhook callbacks.'
        },
        {
          sender: 'Sarah Jenkins (You)',
          time: 'Today, 9:45 AM',
          isAgent: true,
          text: 'Hi Marcus! All webhook schemas are fully documented in our API docs portal under /v2/webhooks. I have also verified your test webhook ping was received and delivered successfully with HTTP 200.'
        }
      ]
    },
    {
      id: '#TK-8007',
      badgeClass: 'away',
      badgeText: 'WAITING ON CUSTOMER',
      title: 'Seat Reallocation Permission Error in Admin Console',
      customerHtml: 'Customer: <strong style="color:var(--secondary-color);">Laura Bennett</strong> (laura.b@apexlogistics.com) • Tier: Business Standard',
      messages: [
        {
          sender: 'Laura Bennett (Customer)',
          time: 'Today, 8:15 AM',
          isAgent: false,
          text: 'When our secondary administrator tries to assign 5 new support licenses to the APAC region team, the portal throws <code>ERR_PERM_DENIED: Insufficient license allocation privilege</code>. Can you check our subscription seat limits?'
        },
        {
          sender: 'Sarah Jenkins (You)',
          time: 'Today, 8:40 AM',
          isAgent: true,
          text: 'Hi Laura, I looked into your permission groups. Only the primary Account Owner can reallocate cross-regional seat quotas. I have triggered an authorization confirmation email to your account owner for one-click approval.'
        }
      ]
    }
  ];

  let currentTicketIdx = 0;

  function renderTicketInspector(idx) {
    currentTicketIdx = idx;
    const ticket = ticketsData[idx];
    if (!ticket) return;

    const badge = document.getElementById('ticketInspectorBadge');
    if (badge) {
      badge.className = `badge-status ${ticket.badgeClass}`;
      badge.textContent = ticket.badgeText;
    }

    const idElem = document.getElementById('ticketInspectorId');
    if (idElem) idElem.textContent = `TICKET ${ticket.id}`;

    const titleElem = document.getElementById('ticketInspectorTitle');
    if (titleElem) titleElem.textContent = ticket.title;

    const customerElem = document.getElementById('ticketInspectorCustomer');
    if (customerElem) customerElem.innerHTML = ticket.customerHtml;

    const timeline = document.getElementById('ticketInspectorTimeline');
    if (timeline) {
      timeline.innerHTML = ticket.messages.map(msg => `
        <div style="margin-bottom:1.25rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:0.35rem;">
            <strong style="${msg.isAgent ? 'color:var(--primary-color);' : ''}"><i class="${msg.isAgent ? 'fa-solid fa-headset mr-1' : 'fa-solid fa-user-circle mr-1'}"></i> ${msg.sender}</strong>
            <span class="text-light">${msg.time}</span>
          </div>
          <div style="${msg.isAgent ? 'background:#eff6ff; border:1px solid #bfdbfe;' : 'background:white; border:1px solid var(--border-color);'} padding:0.85rem 1rem; border-radius:0.5rem; font-size:0.9rem; line-height:1.5;">
            ${msg.text}
          </div>
        </div>
      `).join('');
      timeline.scrollTop = timeline.scrollHeight;
    }
  }

  // Handle ticket item click
  const ticketItems = document.querySelectorAll('.ticket-queue-item');
  ticketItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      ticketItems.forEach(t => t.classList.remove('active'));
      item.classList.add('active');
      renderTicketInspector(idx);
    });
  });

  // Handle Ticket Reply Form Submission
  // First validates data with error messages. After that ONLY, redirects to 404.html
  const ticketReplyForm = document.getElementById('ticketInspectorForm');
  if (ticketReplyForm) {
    ticketReplyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = window.validationUtils ? window.validationUtils.validateForm(ticketReplyForm) : true;
      const noteInput = document.getElementById('resolutionNote');
      const note = noteInput ? noteInput.value.trim() : '';

      if (!isValid || !note) {
        if (!note && window.validationUtils && noteInput) {
          window.validationUtils.showFieldError(noteInput, 'Resolution message is required.');
        }
        if (typeof showToast === 'function') {
          showToast('Please fill in all required fields before submitting response.', 'error');
        }
        if (noteInput && !note) noteInput.focus();
        return; // DO NOT REDIRECT WHEN INVALID!
      }

      const statusSelect = document.getElementById('ticketStatusUpdate');
      const statusText = statusSelect && statusSelect.selectedOptions[0] ? statusSelect.selectedOptions[0].text : 'Updated';

      // Append new message to local UI
      const ticket = ticketsData[currentTicketIdx];
      if (ticket) {
        ticket.messages.push({
          sender: 'Sarah Jenkins (You)',
          time: 'Just now',
          isAgent: true,
          text: note
        });
        renderTicketInspector(currentTicketIdx);
      }

      if (typeof showToast === 'function') {
        showToast(`Response validated! Status set to "${statusText}". Redirecting...`, 'success');
      }
      setTimeout(() => {
        window.location.href = '404.html';
      }, 600);
    });
  }

  // -------------------------------------------------------------
  // 4. INTERACTIVE LIVE CHAT & OMNICHANNEL (AGENT TAB 2)
  // -------------------------------------------------------------
  const chatsData = [
    {
      id: 'chat-1',
      name: 'David Kim',
      avatar: 'assets/user-1.webp',
      meta: 'Customer ID: #CUST-9921 • Pro Plan ($49/mo)',
      messages: [
        {
          type: 'customer',
          text: 'Hi Sarah! I am trying to export all customer contacts from the dashboard to a CSV file, but the download link returns a blank page.',
          time: '11:15 AM'
        },
        {
          type: 'agent',
          text: 'Hello David! Thanks for reaching out. Let me look up your workspace permissions to see if the contact export role is enabled for your profile.',
          time: '11:16 AM'
        },
        {
          type: 'customer',
          text: 'I am the team administrator, so I should have full permissions. Here is a screenshot of the popup error.',
          attachment: 'screenshot-error-403.png (1.2 MB)',
          time: '11:17 AM'
        }
      ]
    },
    {
      id: 'chat-2',
      name: 'Maria Garcia',
      avatar: 'assets/user-2.webp',
      meta: 'Customer ID: #CUST-7740 • Enterprise Tier ($299/mo)',
      messages: [
        {
          type: 'customer',
          text: 'Hi! I was having trouble applying our enterprise renewal discount promo code FALL2026 at checkout on WhatsApp.',
          time: '11:20 AM'
        },
        {
          type: 'agent',
          text: 'Hello Maria! Glad to assist. I just refreshed your organization billing profile and applied the 20% annual discount directly to your account invoice.',
          time: '11:22 AM'
        },
        {
          type: 'customer',
          text: 'Thank you! The coupon code worked perfectly now. Invoice is settled and payment receipt received!',
          time: '11:24 AM'
        },
        {
          type: 'agent',
          text: 'Wonderful to hear, Maria! Is there anything else with your WhatsApp integration or team setup I can assist with today?',
          time: '11:25 AM'
        }
      ]
    },
    {
      id: 'chat-3',
      name: 'James Wilson',
      avatar: 'assets/user-3.webp',
      meta: 'Customer ID: #CUST-5518 • Starter Plan ($19/mo)',
      messages: [
        {
          type: 'customer',
          text: 'App crashes when clicking billing tab inside our iOS mobile app integration.',
          time: '11:10 AM'
        },
        {
          type: 'agent',
          text: 'Hi James, thanks for reaching out. Are you running the latest SDK version v2.4.1 that addressed the iOS 18 view lifecycle updates?',
          time: '11:12 AM'
        },
        {
          type: 'customer',
          text: 'We are currently on v2.3.8. Let me pull the update from CocoaPods and test on TestFlight.',
          time: '11:13 AM'
        },
        {
          type: 'agent',
          text: 'Sounds great James! Once you update the CocoaPod, the crash will be completely resolved. Let me know if you need any help with migration.',
          time: '11:14 AM'
        }
      ]
    }
  ];

  let currentChatIdx = 0;

  function renderChatWindow(idx) {
    currentChatIdx = idx;
    const chat = chatsData[idx];
    if (!chat) return;

    const avatar = document.getElementById('liveChatAvatar');
    if (avatar) {
      avatar.src = chat.avatar;
      avatar.alt = chat.name;
    }

    const nameElem = document.getElementById('liveChatCustomerName');
    if (nameElem) nameElem.textContent = chat.name;

    const metaElem = document.getElementById('liveChatCustomerMeta');
    if (metaElem) metaElem.textContent = chat.meta;

    const stream = document.getElementById('liveChatStream');
    if (stream) {
      stream.innerHTML = chat.messages.map(msg => `
        <div class="chat-bubble ${msg.type}">
          <p>${msg.text}</p>
          ${msg.attachment ? `
            <div style="display:inline-flex; align-items:center; gap:0.5rem; background:#f1f5f9; padding:0.4rem 0.75rem; border-radius:0.5rem; font-size:0.8rem; margin-top:0.35rem; color:var(--secondary-color);">
              <i class="fa-solid fa-image"></i> ${msg.attachment}
            </div>
          ` : ''}
          <span style="font-size:0.7rem; color:${msg.type === 'agent' ? 'rgba(255,255,255,0.7)' : '#94a3b8'}; display:block; margin-top:0.35rem;">${msg.time}</span>
        </div>
      `).join('');
      stream.scrollTop = stream.scrollHeight;
    }
  }

  // Handle chat session click
  const chatItems = document.querySelectorAll('.chat-session-item');
  chatItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      chatItems.forEach(c => c.classList.remove('active'));
      item.classList.add('active');
      renderChatWindow(idx);
    });
  });

  // Handle Live Chat Form Submission
  // First validates data with error messages. After that ONLY, redirects to 404.html
  const liveChatForm = document.getElementById('liveChatForm');
  if (liveChatForm) {
    liveChatForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = window.validationUtils ? window.validationUtils.validateForm(liveChatForm) : true;
      const payloadInput = document.getElementById('liveChatPayload');
      const text = payloadInput ? payloadInput.value.trim() : '';

      if (!isValid || !text) {
        if (!text && window.validationUtils && payloadInput) {
          window.validationUtils.showFieldError(payloadInput, 'Message cannot be empty.');
        }
        if (typeof showToast === 'function') {
          showToast('Please fill in all required fields before sending message.', 'error');
        }
        if (payloadInput && !text) payloadInput.focus();
        return; // DO NOT REDIRECT WHEN INVALID!
      }

      const chat = chatsData[currentChatIdx];
      if (chat) {
        chat.messages.push({
          type: 'agent',
          text: text,
          time: 'Just now'
        });
        renderChatWindow(currentChatIdx);
      }

      if (typeof showToast === 'function') {
        showToast(`Live message validated! Sent to ${chat ? chat.name : 'customer'}. Redirecting...`, 'success');
      }
      setTimeout(() => {
        window.location.href = '404.html';
      }, 600);
    });
  }

  // -------------------------------------------------------------
  // 5. DASHBOARD CTA BUTTON ACTIONS -> REDIRECT TO 404.HTML
  // -------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .btn-cta, .action-cta, a.btn, [data-cta]');
    if (!btn) return;

    // Ignore tabs, sidebar toggles, submits, and sidebar navigation
    if (btn.classList.contains('sidebar-link') ||
        btn.classList.contains('sidebar-toggle') ||
        btn.closest('.sidebar')) {
      return;
    }

    // If it's a form submit button inside a form, let form submit & validation handle it
    if (btn.closest('form') && (btn.type === 'submit' || !btn.getAttribute('type'))) {
      return;
    }

    // Only process inside dashboard
    const isDashboard = btn.closest('.dashboard-content, .dashboard-wrapper, .main-content');
    if (!isDashboard) return;

    e.preventDefault();
    e.stopPropagation();

    // Redirect to 404 as requested
    window.location.href = '404.html';
  });

  // 6. Generic forms in Dashboard (Admin invites, SLAs, settings, macros, verification, handover)
  // First validates data with error messages. After that ONLY, redirects to 404.html
  document.querySelectorAll('.dashboard-content form, .main-content form, form').forEach(form => {
    if (form.id === 'loginForm' || form.id === 'signupForm' || form.id === 'contactForm') return;
    if (form.id === 'ticketInspectorForm' || form.id === 'liveChatForm') {
      return; // Already specifically handled above
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const isValid = window.validationUtils ? window.validationUtils.validateForm(form) : true;
      if (!isValid) {
        if (typeof showToast === 'function') {
          showToast('Please fill in all required fields correctly before submitting.', 'error');
        }
        return; // DO NOT REDIRECT WHEN INVALID!
      }
      if (typeof showToast === 'function') {
        showToast('Form data validated successfully! Redirecting...', 'success');
      }
      setTimeout(() => {
        window.location.href = '404.html';
      }, 600);
    });
  });

  // 7. Search Bar in Top Header: displays search feedback
  const topSearchInput = document.querySelector('.search-bar input');
  if (topSearchInput) {
    topSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = topSearchInput.value.trim();
        if (query) {
          if (typeof showToast === 'function') {
            showToast(`Filtering workspace for "${query}"...`, 'info');
          }
        }
      }
    });
  }
});
