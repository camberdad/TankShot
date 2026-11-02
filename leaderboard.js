/* TankShot high scores, following the CastleRangersV35 JSONBin pattern. */
(function () {
  'use strict';
  // Configure with a dedicated TankShot JSONBin to keep Castle Rangers' board separate.
  var CONFIG = window.TANKSHOT_JSONBIN_CONFIG || {};
  var BIN_ID = String(CONFIG.BIN_ID || '');
  var ACCESS_KEY = String(CONFIG.ACCESS_KEY || '');
  var URL = 'https://api.jsonbin.io/v3/b/' + encodeURIComponent(BIN_ID);
  var LOCAL_KEY = 'tankshot.highscores.v1';
  var headers = { 'Content-Type': 'application/json', 'X-Bin-Meta': 'false' };
  if (ACCESS_KEY) headers['X-Access-Key'] = ACCESS_KEY;

  function clean(row) {
    var mission = Math.max(0, Math.min(100, Math.floor(Number(row.highestMissionCompleted != null ? row.highestMissionCompleted : row.level) || 0)));
    var kills = Math.max(0, Math.floor(Number(row.totalKills != null ? row.totalKills : row.kills) || 0));
    return { game: 'TankShot', name: String(row.name || 'Guest').trim().slice(0, 16) || 'Guest',
      highestMissionCompleted: mission, totalKills: kills,
      level: mission, shots: Math.max(0, Math.floor(Number(row.shots) || 0)), kills: kills,
      score: Math.max(0, Math.floor(Number(row.score) || 0)), t: Number(row.t) || Date.now() };
  }
  function cached() { try { var x = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{"scores":[]}'); return Array.isArray(x.scores) ? x.scores : []; } catch (e) { return []; } }
  function saveLocal(rows) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ scores: rows })); } catch (e) {} }
  function checkResponse(response) {
    if (response.ok) return response;
    return response.text().then(function (body) {
      var message = '';
      try { var parsed = JSON.parse(body); message = parsed.message || ''; } catch (e) {}
      throw new Error('JSONBin HTTP ' + response.status + (message ? ': ' + message : ''));
    });
  }
  function rank(rows) {
    var best = Object.create(null);
    rows.map(clean).forEach(function (r) {
      var k = r.name.toLowerCase(), old = best[k];
      if (!old) best[k] = r;
      else {
        var mission = Math.max(old.highestMissionCompleted, r.highestMissionCompleted);
        var kills = Math.max(old.totalKills, r.totalKills);
        var chosen = r.score > old.score || (r.score === old.score && r.level > old.level) ? r : old;
        chosen.highestMissionCompleted = mission; chosen.totalKills = kills; chosen.level = mission; chosen.kills = kills;
        best[k] = chosen;
      }
    });
    return Object.keys(best).map(function (k) { return best[k]; }).sort(function (a, b) { return b.score - a.score || b.highestMissionCompleted - a.highestMissionCompleted || b.totalKills - a.totalKills; });
  }
  function readRemote() {
    if (!BIN_ID || !ACCESS_KEY) return Promise.reject(new Error('JSONBin X-Access-Key is not configured'));
    return fetch(URL + '/latest', { headers: headers, cache: 'no-store' }).then(checkResponse).then(function (r) { return r.json(); })
      .then(function (d) { var record = d && d.record; return Array.isArray(record) ? { record: record, scores: record } : { record: record || {}, scores: record && Array.isArray(record.scores) ? record.scores : [] }; });
  }
  function fetchScores(cb) {
    var local = rank(cached());
    readRemote().then(function (data) { var gameRows = rank(data.scores); saveLocal(gameRows); cb(gameRows, true); })
      .catch(function () { cb(local, false); });
  }
  function checkUsername(name, cb) {
    var wanted = String(name || '').trim().toLowerCase();
    if (!wanted) { cb({ available: false, online: true }); return; }
    readRemote().then(function (data) {
      var taken = data.scores.some(function (row) { return String(row.name || '').trim().toLowerCase() === wanted; });
      cb({ available: !taken, online: true });
    }).catch(function () { cb({ available: false, online: false }); });
  }
  var submitQueue = Promise.resolve();
  function submit(entry, cb) {
    var row = clean(entry), local = rank(cached().concat([row])); saveLocal(local);
    submitQueue = submitQueue.then(function () {
      return readRemote().then(function (data) {
        var merged = rank(data.scores.concat([row]));
        return fetch(URL, { method: 'PUT', headers: headers, body: JSON.stringify({ scores: merged }) })
          .then(checkResponse).then(function () { saveLocal(merged); return { ok: true }; });
      });
    }).catch(function (error) { return { ok: false, error: error && error.message || 'Unknown JSONBin error' }; });
    if (typeof cb === 'function') submitQueue.then(cb);
  }
  window.TankShotScores = { fetch: fetchScores, submit: submit, checkUsername: checkUsername, configured: !!(BIN_ID && ACCESS_KEY) };
})();

