const SECRET_TOKEN = 'change-this-to-your-secret-passphrase';
const SHEET_NAME = 'CourseVault';

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['id','title','platform','category','url','loginHint','status','progress','deadline','certificateUrl','pinned','notes','updatedAt','deleted']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (!e || !e.parameter || e.parameter.token !== SECRET_TOKEN) {
    return jsonOut_({ ok: false, error: 'Unauthorized: invalid token' });
  }
  const sheet = getOrCreateSheet_();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return jsonOut_({ ok: true, courses: [] });
  const headers = rows[0];
  const courses = rows.slice(1).filter(r => r[0]).map(r => {
    const item = {};
    headers.forEach((h, i) => { item[h] = r[i]; });
    item.progress = Number(item.progress) || 0;
    item.pinned = item.pinned === true || item.pinned === 'true' || item.pinned === 'TRUE';
    item.deleted = item.deleted === true || item.deleted === 'true' || item.deleted === 'TRUE';
    item.updatedAt = Number(item.updatedAt) || 0;
    return item;
  });
  return jsonOut_({ ok: true, courses: courses });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.token !== SECRET_TOKEN) {
      return jsonOut_({ ok: false, error: 'Unauthorized: invalid token' });
    }
    const incoming = Array.isArray(body.courses) ? body.courses : [];
    const sheet = getOrCreateSheet_();
    const headers = ['id','title','platform','category','url','loginHint','status','progress','deadline','certificateUrl','pinned','notes','updatedAt','deleted'];
    const existingRows = sheet.getDataRange().getValues();
    const map = {};
    if (existingRows.length > 1) {
      const h = existingRows[0];
      existingRows.slice(1).filter(r => r[0]).forEach(r => {
        const obj = {};
        h.forEach((k, i) => { obj[k] = r[i]; });
        obj.updatedAt = Number(obj.updatedAt) || 0;
        map[String(obj.id)] = obj;
      });
    }
    incoming.forEach(c => {
      if (!c || !c.id) return;
      const key = String(c.id);
      const prev = map[key];
      if (!prev || (Number(c.updatedAt) || 0) >= (Number(prev.updatedAt) || 0)) {
        map[key] = c;
      }
    });
    const merged = Object.keys(map).map(k => map[k]);
    sheet.clearContents();
    const outRows = [headers].concat(merged.map(c => headers.map(h => c[h] !== undefined ? c[h] : '')));
    sheet.getRange(1, 1, outRows.length, headers.length).setValues(outRows);
    return jsonOut_({ ok: true, courses: merged, syncedAt: Date.now() });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}