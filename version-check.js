(function () {
  'use strict';
  var CURRENT_VERSION = '10';
  var latestVersion = '';
  var checkInProgress = false;
  var applyingUpdate = false;

  function safeToReload() {
    var titleScreen = document.getElementById('ovTitle');
    return !!titleScreen && !titleScreen.hidden;
  }

  function reloadToVersion(version) {
    if (applyingUpdate) return;
    var nextUrl = new URL(window.location.href);
    applyingUpdate = true;
    showUpdateProgress(function () {
      nextUrl.searchParams.set('v', version);
      nextUrl.searchParams.set('update', String(Date.now()));
      window.location.replace(nextUrl.toString());
    });
  }

  function showUpdateProgress(onComplete) {
    var old = document.getElementById('gameUpdateNotice');
    if (old) old.remove();
    var notice = document.createElement('div');
    notice.id = 'gameUpdateNotice';
    notice.className = 'gameUpdateNotice';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    notice.innerHTML = '<div class="updateTitle">Updating TankShot</div>' +
      '<div class="updateTrack"><div class="updateFill"></div></div>' +
      '<div class="updateStatus">Loading the latest game…</div>';
    document.body.appendChild(notice);
    window.setTimeout(function () {
      var fill = notice.querySelector('.updateFill');
      if (fill) fill.style.width = '100%';
    }, 40);
    window.setTimeout(function () {
      notice.classList.add('updateDone');
      var status = notice.querySelector('.updateStatus');
      if (status) status.innerHTML = '<span class="updateCheck" aria-hidden="true">✓</span> Update complete';
    }, 850);
    window.setTimeout(onComplete, 1500);
  }

  function showUpdateNotice() {
    if (document.getElementById('gameUpdateNotice')) return;
    var notice = document.createElement('div');
    notice.id = 'gameUpdateNotice';
    notice.className = 'gameUpdateNotice updatePending';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    notice.textContent = 'A TankShot update is ready. Return to the title screen to install it automatically.';
    document.body.appendChild(notice);
  }

  function checkVersion() {
    if (checkInProgress || document.hidden || window.location.protocol === 'file:') return;
    checkInProgress = true;
    fetch('version.json?check=' + Date.now(), { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('version check failed');
        return response.json();
      })
      .then(function (info) {
        var remote = String(info && info.version || '');
        if (!/^\d+$/.test(remote) || Number(remote) <= Number(CURRENT_VERSION)) return;
        latestVersion = remote;
        if (safeToReload()) reloadToVersion(remote);
        else showUpdateNotice();
      })
      .catch(function () {})
      .then(function () { checkInProgress = false; });
  }

  window.addEventListener('tankshot-title-screen', function () {
    if (latestVersion) reloadToVersion(latestVersion);
    else checkVersion();
  });

  window.setInterval(function () {
    if (latestVersion && safeToReload()) reloadToVersion(latestVersion);
    else checkVersion();
  }, 30000);
  document.addEventListener('visibilitychange', checkVersion);
  checkVersion();
})();

