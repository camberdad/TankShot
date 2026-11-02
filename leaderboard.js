/* TankShot high scores, following the CastleRangersV35 JSONBin pattern. */
(function () {
  'use strict';
  // Configure with a dedicated TankShot JSONBin to keep Castle Rangers' board separate.
  var CONFIG = window.TANKSHOT_JSONBIN_CONFIG || {};
  var BIN_ID = String(CONFIG.BIN_ID || '');
  var MASTER_KEY = String(CONFIG.MASTER_KEY || '');
  var URL = 'https://api.jsonbin.io/v3/b/' + encodeURIComponent(BIN_ID);
  var LOCAL_KEY = 'tankshot.highscores.v1';
  var headers = { 'Content-Type': 'application/json', 'X-Bin-Meta': 'false', 'X-Master-Key': MASTER_KEY };

  function clean(row) {
    return { game: 'TankShot', name: String(row.name || 'Guest').trim().slice(0, 16) || 'Guest',
      level: Math.max(1, Math.min(100, Math.floor(Number(row.level) || 1))),
      shots: Math.max(0, Math.floor(Number(row.shots) || 0)), kills: Math.max(0, Math.floor(Number(row.kills) || 0)),
      score: Math.max(0, Math.floor(Number(row.score) || 0)), t: Number(row.t) || Date.now() };
  }
  function cached() { try { var x = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{"scores":[]}'); return Array.isArray(x.scores) ? x.scores : []; } catch (e) { return []; } }
  function saveLocal(rows) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ scores: rows })); } catch (e) {} }
  function rank(rows) {
    var best = Object.create(null);
    rows.map(clean).forEach(function (r) {
      var k = r.name.toLowerCase(), old = best[k];
      if (!old || r.score > old.score || (r.score === old.score && r.level > old.level)) best[k] = r;
      else { old.level = Math.max(old.level, r.level); old.kills = Math.max(old.kills, r.kills); }
    });
    return Object.keys(best).map(function (k) { return best[k]; }).sort(function (a, b) { return b.score - a.score || b.level - a.level || b.kills - a.kills; });
  }
  function readRemote() {
    if (!BIN_ID || !MASTER_KEY) return Promise.reject(new Error('offline'));
    return fetch(URL, { headers: headers, cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (d) { var record = d && d.record && typeof d.record === 'object' ? d.record : (d || {}); return { record: record, scores: Array.isArray(record.scores) ? record.scores : [] }; });
  }
  function fetchScores(cb) {
    var local = rank(cached());
    readRemote().then(function (data) { var gameRows = rank(data.scores.concat(local)); saveLocal(gameRows); cb(gameRows, true); })
      .catch(function () { cb(local, false); });
  }
  function submit(entry) {
    var row = clean(entry), local = rank(cached().concat([row])); saveLocal(local);
    readRemote().then(function (data) {
      var merged = rank(data.scores.concat([row]));
      return fetch(URL, { method: 'PUT', headers: headers, body: JSON.stringify({ scores: merged }) }).then(function (r) { if (!r.ok) throw new Error('http ' + r.status); saveLocal(merged); });
    }).catch(function () {});
  }
  window.TankShotScores = { fetch: fetchScores, submit: submit };
})();

