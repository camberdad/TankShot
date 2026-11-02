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
    var mission = Math.max(0, Math.min(100, Math.floor(Number(row.highestMissionCompleted != null ? row.highestMissionCompleted : row.level) || 0)));
    var kills = Math.max(0, Math.floor(Number(row.totalKills != null ? row.totalKills : row.kills) || 0));
    return { game: 'TankShot', name: String(row.name || 'Guest').trim().slice(0, 16) || 'Guest',
      highestMissionCompleted: mission, totalKills: kills,
      level: mission, shots: Math.max(0, Math.floor(Number(row.shots) || 0)), kills: kills,
      score: Math.max(0, Math.floor(Number(row.score) || 0)), t: Number(row.t) || Date.now() };
  }
  function cached() { try { var x = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{"scores":[]}'); return Array.isArray(x.scores) ? x.scores : []; } catch (e) { return []; } }
  function saveLocal(rows) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ scores: rows })); } catch (e) {} }
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

