window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<meta name="theme-color" content="#007bff">
<title>随机抽题系统</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --primary:#007bff;--primary-dark:#0056b3;--success:#28a745;
  --danger:#dc3545;--warning:#fd7e14;--gray:#6c757d;
  --bg:#f8f9fa;--text:#212529;--muted:#6c757d;--border:#dee2e6;
}
html,body{height:100%;overflow:hidden}
body{
  font-family:-apple-system,"Microsoft YaHei","PingFang SC",sans-serif;
  background:var(--bg);color:var(--text);
  display:flex;flex-direction:column;
}
.hidden{display:none!important}

/* ============ 通用按钮 ============ */
.btn{border:none;border-radius:8px;cursor:pointer;font-size:15px;
     padding:12px 18px;font-family:inherit;font-weight:600;
     transition:background .15s,transform .05s;user-select:none}
.btn:active{transform:scale(.97)}
.btn.primary{background:var(--primary);color:#fff}
.btn.primary:active{background:var(--primary-dark)}
.btn.secondary{background:var(--gray);color:#fff}
.btn.danger{background:var(--danger);color:#fff}
.btn.warning{background:var(--warning);color:#fff}
.btn.link{background:transparent;color:var(--muted);font-size:13px;
          text-decoration:underline;padding:6px;font-weight:400}
.btn:disabled{background:#adb5bd!important;color:#fff!important;cursor:not-allowed}
.btn:disabled:active{transform:none}

/* ============ 登录界面 ============ */
#loginView{
  position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,#e3f0ff 0%,#f8f9fa 100%);padding:20px;z-index:10;
}
.login-card{
  width:100%;max-width:400px;background:#fff;border-radius:16px;
  padding:32px 24px;box-shadow:0 8px 32px rgba(0,123,255,.12);
}
.login-card h1{
  text-align:center;color:var(--primary);font-size:22px;margin-bottom:24px;
}
.field{margin-bottom:16px}
.field label{display:block;font-size:13px;color:var(--muted);margin-bottom:6px}
.field input{
  width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;
  font-size:15px;font-family:inherit;background:#fff;
}
.field input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(0,123,255,.1)}
.checkbox-row{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-bottom:16px}
.err-msg{color:var(--danger);font-size:13px;min-height:18px;margin-bottom:8px}
.ok-msg{color:var(--success);font-size:13px;font-weight:600;min-height:18px;margin-bottom:8px}
.login-btns{display:flex;flex-direction:column;gap:10px;margin-top:8px}
.login-btns .row{display:flex;gap:10px}
.login-btns .row .btn{flex:1}

/* ============ 主界面 ============ */
#mainView{display:flex;flex-direction:column;height:100vh;height:100dvh}
.topbar{
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 16px;background:#fff;border-bottom:1px solid var(--border);
  box-shadow:0 1px 3px rgba(0,0,0,.04);flex-shrink:0;
}
.brand{font-weight:700;font-size:16px;color:var(--text)}
.icon-btn{
  width:40px;height:40px;border:none;background:transparent;border-radius:8px;
  font-size:22px;color:var(--gray);cursor:pointer;display:flex;
  align-items:center;justify-content:center;
}
.icon-btn:active{background:#e9ecef}
.result-area{
  flex:1;overflow:hidden;padding:12px;display:flex;flex-direction:column;min-height:0;
}
.result-box{
  flex:1;overflow-y:auto;background:#fff;border:3px solid var(--primary);
  border-radius:12px;padding:20px;line-height:1.6;
  font-family:-apple-system,"Microsoft YaHei",sans-serif;
  font-size:24px;font-weight:700;color:var(--text);
  -webkit-overflow-scrolling:touch;
}
.result-box .placeholder{
  color:#adb5bd;font-size:16px;font-weight:400;text-align:center;
  display:flex;align-items:center;justify-content:center;height:100%;
}
.q-item{margin-bottom:24px;padding-bottom:20px;border-bottom:1px dashed #e9ecef}
.q-item:last-child{border-bottom:none;margin-bottom:0}
.q-num{font-size:0.65em;color:var(--primary);margin-bottom:6px;font-weight:600}
.q-text{word-wrap:break-word;white-space:pre-wrap}
.bottom-bar{
  display:flex;gap:10px;padding:12px 16px;background:#fff;
  border-top:1px solid var(--border);flex-shrink:0;
  padding-bottom:calc(12px + env(safe-area-inset-bottom));
}
.bottom-bar .btn{flex:1;font-size:20px;padding:20px 12px;border-radius:12px}
.bottom-bar .btn.draw{flex:3;background:var(--primary);color:#fff}
.bottom-bar .btn.draw:active{background:var(--primary-dark)}
.bottom-bar .btn.undo{flex:1;background:var(--gray);color:#fff;font-size:16px}
.bottom-bar .btn.undo:active{background:#5a6268}

/* ============ 抽屉 ============ */
.drawer-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:100;
  display:flex;justify-content:flex-end;animation:fadeIn .2s;
}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.drawer{
  width:280px;max-width:85vw;background:#fff;height:100%;overflow-y:auto;
  padding:20px 0;animation:slideIn .25s ease-out;
}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
.drawer-header{padding:0 20px 16px;border-bottom:1px solid var(--border);margin-bottom:8px}
.drawer-header .acc-label{font-size:13px;color:var(--muted)}
.drawer-header .acc-name{font-size:18px;font-weight:700;color:var(--text);margin-top:4px}
.drawer-item{
  display:flex;align-items:center;gap:12px;padding:14px 20px;
  font-size:15px;color:var(--text);cursor:pointer;border:none;
  background:transparent;width:100%;text-align:left;font-family:inherit;
}
.drawer-item:active{background:#f1f3f5}
.drawer-item.danger{color:var(--danger)}
.drawer-item .ico{font-size:20px;width:24px;text-align:center}
.drawer-sep{height:1px;background:var(--border);margin:8px 0}

/* ============ 弹窗 ============ */
.modal-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;
  display:flex;align-items:center;justify-content:center;padding:16px;
  animation:fadeIn .2s;
}
.modal{
  width:100%;max-width:420px;max-height:88vh;overflow-y:auto;
  background:#fff;border-radius:14px;padding:24px;
  animation:popIn .25s ease-out;
}
@keyframes popIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
.modal h2{font-size:18px;color:var(--text);margin-bottom:18px;font-weight:700}
.modal .section{margin-bottom:18px}
.modal .section-title{
  font-size:13px;color:var(--muted);font-weight:600;margin-bottom:10px;
  text-transform:uppercase;letter-spacing:.5px;
}
.modal label.radio-row,.modal label.check-row{
  display:flex;align-items:center;gap:10px;padding:10px 0;
  font-size:14px;cursor:pointer;
}
.modal input[type=radio],.modal input[type=checkbox]{width:18px;height:18px;cursor:pointer}
.modal input[type=number],.modal select{
  width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;
  font-size:15px;font-family:inherit;background:#fff;
}
.modal input[type=range]{width:100%}
.modal .range-row{display:flex;align-items:center;gap:12px}
.modal .range-row .val{min-width:60px;text-align:right;font-weight:600;color:var(--primary)}
.modal-btns{display:flex;gap:10px;justify-content:flex-end;margin-top:20px}
.modal-btns .btn{min-width:80px;padding:10px 16px;font-size:14px}

/* 历史记录列表 */
.history-list{max-height:50vh;overflow-y:auto;background:var(--bg);
              border-radius:8px;padding:10px;font-size:13px}
.history-item{padding:8px 10px;border-bottom:1px solid #e9ecef;color:#495057}
.history-item:last-child{border-bottom:none}
.history-item .time{color:var(--muted);font-size:12px}
.history-item .mode-tag{
  display:inline-block;background:var(--primary);color:#fff;
  font-size:11px;padding:2px 6px;border-radius:4px;margin-left:6px;
}
.empty-hint{color:#adb5bd;text-align:center;padding:30px;font-size:14px}

/* toast */
#toast{
  position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
  background:rgba(33,37,41,.92);color:#fff;padding:10px 20px;
  border-radius:20px;font-size:14px;z-index:999;
  opacity:0;transition:opacity .25s;pointer-events:none;max-width:80vw;
  text-align:center;
}
#toast.show{opacity:1}

/* 版权 */
.copyright-box{text-align:center;font-size:14px;line-height:1.9;color:#333}
.copyright-box strong{font-size:16px;color:var(--primary)}

/* 宽屏（电脑浏览器/平板）优化 */
@media (min-width:600px){
  .result-box{font-size:28px}
  .login-card{padding:40px 32px}
}
</style>
</head>
<body>

<!-- ================= 登录界面 ================= -->
<div id="loginView">
  <div class="login-card">
    <h1>随机抽题系统</h1>
    <div class="field">
      <label>用户名</label>
      <input id="loginUser" placeholder="请输入用户名" autocomplete="off">
    </div>
    <div class="field">
      <label>密码</label>
      <input id="loginPwd" type="password" placeholder="请输入密码">
    </div>
    <div class="checkbox-row">
      <input type="checkbox" id="showPwdCb">
      <label for="showPwdCb" style="margin:0;cursor:pointer">显示密码</label>
    </div>
    <div id="loginMsg" class="err-msg"></div>
    <div class="login-btns">
      <button class="btn primary" id="btnLogin">登 录</button>
      <div class="row">
        <button class="btn secondary" id="btnRegister">注册新账号</button>
        <button class="btn link" id="btnMasterReset" style="flex:1">找回/重置密码</button>
      </div>
    </div>
  </div>
</div>

<!-- ================= 主界面 ================= -->
<div id="mainView" class="hidden">
  <header class="topbar">
    <div class="brand">随机抽题系统</div>
    <button class="icon-btn" id="btnMenu" aria-label="菜单">☰</button>
  </header>

  <main class="result-area">
    <div id="resultBox" class="result-box">
      <div class="placeholder">点击下方「抽 取」按钮开始抽题</div>
    </div>
  </main>

  <div class="bottom-bar">
    <button class="btn draw" id="btnDraw">🎲 抽 取</button>
    <button class="btn undo" id="btnUndo">⟲ 上一题</button>
  </div>
</div>

<!-- 隐藏文件输入 -->
<input type="file" id="fileInput" accept=".txt,.csv,.docx,.xlsx,.xlsm" style="display:none">

<!-- ================= 抽屉 ================= -->
<div id="drawerOverlay" class="drawer-overlay hidden">
  <div class="drawer">
    <div class="drawer-header">
      <div class="acc-label">当前账号</div>
      <div class="acc-name" id="accountName">-</div>
    </div>
    <button class="drawer-item" id="btnImport"><span class="ico">📥</span>导入题库</button>
    <button class="drawer-item" id="btnSettings"><span class="ico">⚙️</span>设置</button>
    <button class="drawer-item" id="btnHistory"><span class="ico">📋</span>抽取记录</button>
    <button class="drawer-item" id="btnResetProgress"><span class="ico">🔄</span>重置进度</button>
    <div class="drawer-sep"></div>
    <button class="drawer-item" id="btnCopyright"><span class="ico">©</span>版权信息</button>
    <button class="drawer-item danger" id="btnLogout"><span class="ico">🚪</span>登出</button>
  </div>
</div>

<!-- ================= 设置弹窗 ================= -->
<div id="settingsModal" class="modal-overlay hidden">
  <div class="modal">
    <h2>设置</h2>
    <div class="section">
      <div class="section-title">抽取模式</div>
      <div id="modeRadios"></div>
    </div>
    <div class="section">
      <div class="section-title">抽取数量</div>
      <input type="number" id="setCount" min="1" value="1">
      <div style="font-size:12px;color:var(--muted);margin-top:6px" id="countHint"></div>
      <label class="check-row" style="margin-top:10px">
        <input type="checkbox" id="setAutoReset"> 抽完一轮后自动重置进度
      </label>
    </div>
    <div class="section">
      <div class="section-title">结果显示字体</div>
      <select id="setFontFamily">
        <option value="">系统默认</option>
        <option value="Microsoft YaHei">微软雅黑</option>
        <option value="SimSun">宋体</option>
        <option value="SimHei">黑体</option>
        <option value="KaiTi">楷体</option>
        <option value="FangSong">仿宋</option>
      </select>
    </div>
    <div class="section">
      <div class="section-title">字号</div>
      <div class="range-row">
        <input type="range" id="setFontSize" min="10" max="80" step="2" value="24">
        <div class="val" id="fontSizeVal">24px</div>
      </div>
    </div>
    <div class="modal-btns">
      <button class="btn secondary" id="btnSettingsCancel">取消</button>
      <button class="btn primary" id="btnSettingsSave">保存</button>
    </div>
  </div>
</div>

<!-- ================= 历史记录弹窗 ================= -->
<div id="historyModal" class="modal-overlay hidden">
  <div class="modal">
    <h2>抽取记录</h2>
    <div id="historyList" class="history-list"></div>
    <div class="modal-btns">
      <button class="btn secondary" id="btnExportTxt">导出 TXT</button>
      <button class="btn secondary" id="btnExportCsv">导出 CSV</button>
      <button class="btn primary" id="btnHistoryClose">关闭</button>
    </div>
  </div>
</div>

<!-- ================= 密码验证弹窗 ================= -->
<div id="pwdModal" class="modal-overlay hidden">
  <div class="modal">
    <h2>身份验证</h2>
    <p style="font-size:14px;color:var(--muted);margin-bottom:16px" id="pwdTip"></p>
    <input type="password" id="pwdInput" placeholder="请输入登录密码"
           style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;font-size:15px">
    <div id="pwdErr" class="err-msg" style="margin-top:8px"></div>
    <div class="modal-btns">
      <button class="btn secondary" id="btnPwdCancel">取消</button>
      <button class="btn primary" id="btnPwdOk">验 证</button>
    </div>
  </div>
</div>

<!-- ================= 重置密码弹窗 ================= -->
<div id="resetModal" class="modal-overlay hidden">
  <div class="modal">
    <h2>重置用户密码</h2>
    <div class="section">
      <div class="section-title">管理员身份验证</div>
      <div class="field"><label>管理账号</label><input id="resetAdminUser" placeholder="请输入管理账号"></div>
      <div class="field"><label>管理密码</label><input id="resetAdminPwd" type="password" placeholder="请输入管理密码"></div>
    </div>
    <div class="section">
      <div class="section-title">目标账号重置</div>
      <div class="field"><label>目标账号</label><input id="resetTargetUser" placeholder="要重置密码的用户名"></div>
      <div class="field"><label>新密码</label><input id="resetNewPwd" type="password" placeholder="为该用户设置新密码"></div>
    </div>
    <div id="resetErr" class="err-msg"></div>
    <div class="modal-btns">
      <button class="btn secondary" id="btnResetCancel">取消</button>
      <button class="btn danger" id="btnResetOk">确认重置</button>
    </div>
  </div>
</div>

<!-- ================= 版权弹窗 ================= -->
<div id="copyrightModal" class="modal-overlay hidden">
  <div class="modal">
    <h2>版权信息</h2>
    <div class="copyright-box">
      <p><strong>软件版权声明</strong></p>
      <p style="margin-top:14px">该软件归西安电子科技大学数学与统计学院<br>
      刘云瑞所有</p>
      <p style="margin-top:14px">南校区：陕西省西安市西沣路兴隆段 266 号（710126）<br>
      电话：029-81891379　邮箱：math@xidian.edu.cn</p>
      <p style="margin-top:18px;color:var(--muted)">© 2026 版权所有</p>
    </div>
    <div class="modal-btns">
      <button class="btn primary" id="btnCopyrightClose">关闭</button>
    </div>
  </div>
</div>

<div id="toast"></div>

<script>
/* ============================================================
 * 随机抽题系统 - 网页版 v1.0
 * 纯前端单文件，数据保存在浏览器 localStorage
 * ============================================================ */

const $ = s => document.querySelector(s);

/* ---------- 存储工具 ---------- */
const Store = {
  get(k, def) {
    try { const v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); }
    catch (e) { return def; }
  },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

/* ---------- 简单哈希（用于密码存储） ---------- */
function simpleHash(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}
const SALT = 'XidianMath_2026_Salt_';
const hashPwd = pwd => simpleHash(SALT + pwd);

/* ---------- 账号管理 ---------- */
const Auth = {
  MASTER_USER: '刘云瑞',
  MASTER_PWD: '19940330',
  users() { return Store.get('qd_users', {}); },
  register(u, p) {
    if (u === this.MASTER_USER) return { ok: false, msg: '该用户名为系统保留关键字，无法注册' };
    Store.set('qd_users', { [u]: hashPwd(p) });
    this.clearSession();
    return { ok: true };
  },
  verify(u, p) { return this.users()[u] === hashPwd(p); },
  reset(target, newPwd) {
    const users = this.users();
    if (!users[target]) return { ok: false, msg: '该目标账号不存在' };
    users[target] = hashPwd(newPwd);
    Store.set('qd_users', users);
    return { ok: true };
  },
  saveSession(u) { Store.set('qd_session', u); },
  loadSession() {
    const u = Store.get('qd_session', null);
    return (u && this.users()[u]) ? u : null;
  },
  clearSession() { Store.del('qd_session'); }
};

/* ---------- 全局状态 ---------- */
const state = {
  user: null,
  questions: [],
  fileName: '未导入',
  mode: 'sequential',
  drawCount: 1,
  autoReset: false,
  fontFamily: '',
  fontSize: 24,
  seqIndex: 0,
  shufflePool: [],
  shuffleIndex: 0,
  uniquePool: [],
  history: [],
  drawStack: []
};

const MODES = {
  sequential: { name: '顺序抽取', desc: '按题库原顺序依次抽取，抽到末尾需重置进度' },
  unique:     { name: '随机不重复', desc: '每次从剩余题目中随机抽取，抽过的题不再出现' },
  repeat:     { name: '随机可重复', desc: '每次都从全部题目中随机抽取，允许重复' },
  shuffle:    { name: '洗牌抽取', desc: '先打乱全部题目，再按新顺序依次抽取' }
};

const bankKey = () => 'qd_bank_' + state.user;
const historyKey = () => 'qd_history_' + state.user;

/* ---------- 配置 ---------- */
function loadConfig() {
  const cfg = Store.get('qd_config', {});
  state.mode = MODES[cfg.mode] ? cfg.mode : 'sequential';
  state.drawCount = Math.max(1, parseInt(cfg.drawCount) || 1);
  state.autoReset = !!cfg.autoReset;
  state.fontFamily = cfg.fontFamily || '';
  state.fontSize = Math.max(10, Math.min(80, parseInt(cfg.fontSize) || 24));
}
function saveConfig() {
  Store.set('qd_config', {
    mode: state.mode, drawCount: state.drawCount, autoReset: state.autoReset,
    fontFamily: state.fontFamily, fontSize: state.fontSize
  });
}

/* ---------- Toast ---------- */
let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ============================================================
 * 题库解析
 * ============================================================ */
const QNUM_PATTERN = /(?<!\d)\d{1,4}\s*[.、\-—．\)）:：](?!\d)/g;
const HEAD_NUM_PATTERN = /^\s*(?:[（(]\s*\d{1,4}\s*[）)]|\d{1,4}\s*[.、\-—．\)）:：](?!\d))\s*/;

function clean(s) { return s.trim().replace(/[ \t]+/g, ' '); }

function splitLineToQuestions(line) {
  line = line.trim();
  if (!line) return [];
  const matches = [...line.matchAll(QNUM_PATTERN)];
  if (matches.length >= 2) {
    const out = [];
    let start = 0;
    for (const m of matches) {
      const seg = line.slice(start, m.index).trim();
      if (seg) out.push(clean(seg));
      start = m.index + m[0].length;
    }
    const seg = line.slice(start).trim();
    if (seg) out.push(clean(seg));
    return out.filter(Boolean);
  }
  const m = line.match(HEAD_NUM_PATTERN);
  if (m) line = line.slice(m[0].length).trim();
  return line ? [clean(line)] : [];
}

/* 动态加载第三方库（离线时给出提示） */
function ensureScript(src, globalName) {
  return new Promise((resolve, reject) => {
    if (window[globalName]) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('无法加载解析库（可能无网络），请先把文件转成 .txt 再导入'));
    document.head.appendChild(s);
  });
}

/* 解析文件 → 题目数组 */
async function parseFile(file) {
  const name = file.name.toLowerCase();
  let lines = [];

  if (name.endsWith('.txt')) {
    const text = await file.text();
    lines = text.replace(/\r\n?/g, '\n').replace(/\v/g, '\n')
                .replace(/\u3000/g, ' ').split('\n');

  } else if (name.endsWith('.csv')) {
    // 用 SheetJS 解析 CSV 最稳
    try {
      await ensureScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js', 'XLSX');
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      for (const sn of wb.SheetNames) {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, raw: false });
        for (const row of rows) {
          for (const v of row) {
            if (v == null) continue;
            for (const ln of String(v).split('\n')) if (ln.trim()) lines.push(ln);
          }
        }
      }
    } catch (e) {
      // 兜底：按文本行读取
      const text = await file.text();
      lines = text.replace(/\r\n?/g, '\n').split('\n');
    }

  } else if (name.endsWith('.xlsx') || name.endsWith('.xlsm') || name.endsWith('.xls')) {
    await ensureScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js', 'XLSX');
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });
    for (const sn of wb.SheetNames) {
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, raw: false });
      for (const row of rows) {
        for (const v of row) {
          if (v == null) continue;
          for (const ln of String(v).split('\n')) if (ln.trim()) lines.push(ln);
        }
      }
    }

  } else if (name.endsWith('.docx')) {
    await ensureScript('https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js', 'mammoth');
    const buf = await file.arrayBuffer();
    const res = await mammoth.extractRawText({ arrayBuffer: buf });
    lines = res.value.split('\n');

  } else {
    throw new Error('不支持的文件类型：' + name + '（请使用 .txt / .csv / .docx / .xlsx）');
  }

  // 拆题 + 去重
  const all = [];
  for (const ln of lines) all.push(...splitLineToQuestions(ln));
  const seen = new Set(); const out = [];
  for (const q of all) { if (!seen.has(q)) { seen.add(q); out.push(q); } }
  return out;
}

/* ============================================================
 * 抽取逻辑
 * ============================================================ */
function resetPools(clearDisplay, clearHistory) {
  state.seqIndex = 0;
  state.shufflePool = state.questions.map((_, i) => i);
  for (let i = state.shufflePool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.shufflePool[i], state.shufflePool[j]] = [state.shufflePool[j], state.shufflePool[i]];
  }
  state.shuffleIndex = 0;
  state.uniquePool = state.questions.map((_, i) => i);
  if (clearDisplay) {
    $('#resultBox').innerHTML = '<div class="placeholder">点击下方「抽 取」按钮开始抽题</div>';
  }
  if (clearHistory) { state.history = []; saveHistory(); renderHistory(); }
}

function drawQuestions(mode, count) {
  const qs = state.questions;
  const result = []; let undo = { type: 'noop' };

  if (mode === 'sequential') {
    for (let i = 0; i < count; i++) {
      if (state.seqIndex >= qs.length) break;
      result.push({ num: state.seqIndex + 1, text: qs[state.seqIndex] });
      state.seqIndex++;
    }
    undo = { type: 'seq', n: result.length };

  } else if (mode === 'unique') {
    const popped = [];
    for (let i = 0; i < count; i++) {
      if (state.uniquePool.length === 0) break;
      const j = Math.floor(Math.random() * state.uniquePool.length);
      const idx = state.uniquePool.splice(j, 1)[0];
      popped.push({ pos: j, idx });
      result.push({ num: idx + 1, text: qs[idx] });
    }
    undo = { type: 'unique', popped };

  } else if (mode === 'repeat') {
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * qs.length);
      result.push({ num: idx + 1, text: qs[idx] });
    }
    undo = { type: 'repeat' };

  } else if (mode === 'shuffle') {
    for (let i = 0; i < count; i++) {
      if (state.shuffleIndex >= state.shufflePool.length) break;
      const idx = state.shufflePool[state.shuffleIndex];
      state.shuffleIndex++;
      result.push({ num: idx + 1, text: qs[idx] });
    }
    undo = { type: 'shuffle', n: result.length };
  }
  return { result, undo };
}

function applyUndo(undo) {
  if (undo.type === 'seq') state.seqIndex = Math.max(0, state.seqIndex - undo.n);
  else if (undo.type === 'unique') {
    for (let i = undo.popped.length - 1; i >= 0; i--) {
      const { pos, idx } = undo.popped[i];
      state.uniquePool.splice(Math.min(pos, state.uniquePool.length), 0, idx);
    }
  } else if (undo.type === 'shuffle') {
    state.shuffleIndex = Math.max(0, state.shuffleIndex - undo.n);
  }
}

/* ============================================================
 * UI 渲染
 * ============================================================ */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function applyDisplayStyle() {
  const box = $('#resultBox');
  box.style.fontFamily = state.fontFamily || '';
  box.style.fontSize = state.fontSize + 'px';
}

function showResult(items) {
  const box = $('#resultBox');
  box.innerHTML = items.map(it => `
    <div class="q-item">
      <div class="q-num">第 ${it.num} 题</div>
      <div class="q-text">${escapeHtml(it.text)}</div>
    </div>`).join('');
  box.scrollTop = 0;
}

function refreshState() {
  const hasQ = state.questions.length > 0;
  $('#btnDraw').disabled = !hasQ;
  $('#btnUndo').disabled = state.drawStack.length === 0;

  // 更新设置弹窗里的数量提示
  const hint = $('#countHint');
  if (hint) {
    hint.textContent = hasQ
      ? `题库共 ${state.questions.length} 题（当前文件：${state.fileName}）`
      : '尚未导入题库，导入后再设置';
  }
}

function saveHistory() { Store.set(historyKey(), state.history); }
function loadHistory() { state.history = Store.get(historyKey(), []); }

function renderHistory() {
  const list = $('#historyList');
  if (!list) return;
  if (!state.history.length) {
    list.innerHTML = '<div class="empty-hint">暂无抽取记录</div>';
    return;
  }
  list.innerHTML = state.history.slice().reverse().map(rec => {
    const nums = rec.items.map(it => '第' + it.num + '题').join('、');
    return `<div class="history-item">
      <div><span class="time">${escapeHtml(rec.time)}</span>
      <span class="mode-tag">${escapeHtml(rec.mode)}</span></div>
      <div style="margin-top:4px;color:#212529">${escapeHtml(nums)}</div>
    </div>`;
  }).join('');
}

function addHistory(items) {
  state.history.push({
    time: new Date().toLocaleString('zh-CN'),
    mode: MODES[state.mode].name,
    items: items.map(it => ({ num: it.num, text: it.text }))
  });
  saveHistory();
  renderHistory();
}

/* ============================================================
 * 抽取动作
 * ============================================================ */
function doDraw() {
  if (!state.questions.length) { toast('请先导入题库'); return; }
  const count = Math.min(state.drawCount, state.questions.length);
  let { result, undo } = drawQuestions(state.mode, count);

  if (!result.length && state.autoReset) {
    resetPools(false, false);
    ({ result, undo } = drawQuestions(state.mode, count));
    if (result.length) toast('本轮已抽完，已自动重置进度并继续抽取');
  }

  if (!result.length) {
    if (state.mode === 'sequential') toast('顺序抽取已到末尾，请点击菜单中的「重置进度」');
    else if (state.mode === 'unique') toast('随机不重复池已抽完，请点击「重置进度」');
    else if (state.mode === 'shuffle') toast('本轮洗牌已抽完，请点击「重置进度」');
    refreshState();
    return;
  }

  state.drawStack.push({ items: result, undo });
  showResult(result);
  addHistory(result);
  refreshState();

  if (result.length < count) toast(`本次仅抽到 ${result.length} 道题（剩余不足）`);
  else toast(`本次抽取 ${result.length} 道题`);
}

function doUndo() {
  if (!state.drawStack.length) return;
  const rec = state.drawStack.pop();
  applyUndo(rec.undo);
  if (state.history.length) { state.history.pop(); saveHistory(); renderHistory(); }
  if (state.drawStack.length) showResult(state.drawStack[state.drawStack.length - 1].items);
  else $('#resultBox').innerHTML = '<div class="placeholder">点击下方「抽 取」按钮开始抽题</div>';
  refreshState();
  toast('已撤销上一次抽取');
}

/* ============================================================
 * 导入题库
 * ============================================================ */
async function importFile(file) {
  try {
    toast('正在解析题库...');
    const questions = await parseFile(file);
    if (!questions.length) { alert('未从文件中解析到任何题目'); return; }

    state.questions = questions;
    state.fileName = file.name;
    if (state.drawCount > questions.length) {
      state.drawCount = questions.length;
      saveConfig();
    }
    state.drawStack = [];
    resetPools(true, true);
    refreshState();

    Store.set(bankKey(), { fileName: state.fileName, questions });
    alert(`导入成功！\n题库：${file.name}\n题目数：${questions.length} 题`);
  } catch (e) {
    alert('导入失败：' + (e.message || e));
  }
}

/* ============================================================
 * 界面切换 & 事件绑定
 * ============================================================ */
function showLogin() {
  $('#loginView').classList.remove('hidden');
  $('#mainView').classList.add('hidden');
  $('#loginUser').focus();
}

function enterMain() {
  $('#loginView').classList.add('hidden');
  $('#mainView').classList.remove('hidden');
  $('#accountName').textContent = state.user;

  // 加载该账号的题库
  const data = Store.get(bankKey(), null);
  if (data && Array.isArray(data.questions) && data.questions.length) {
    state.questions = data.questions;
    state.fileName = data.fileName || '已导入题库';
    if (state.drawCount > state.questions.length) state.drawCount = state.questions.length;
    resetPools(true, false);
  } else {
    state.questions = [];
    state.fileName = '未导入';
    $('#resultBox').innerHTML = '<div class="placeholder">请先通过菜单导入题库</div>';
  }

  loadHistory();
  renderHistory();
  applyDisplayStyle();
  refreshState();
}

/* ---------- 登录界面事件 ---------- */
$('#showPwdCb').addEventListener('change', e => {
  $('#loginPwd').type = e.target.checked ? 'text' : 'password';
});

$('#btnLogin').addEventListener('click', () => {
  const u = $('#loginUser').value.trim();
  const p = $('#loginPwd').value;
  const msg = $('#loginMsg');
  if (!u || !p) { msg.className = 'err-msg'; msg.textContent = '请输入用户名和密码'; return; }
  if (!Auth.verify(u, p)) { msg.className = 'err-msg'; msg.textContent = '用户名或密码错误'; return; }
  state.user = u;
  Auth.saveSession(u);
  msg.textContent = '';
  enterMain();
});

$('#btnRegister').addEventListener('click', () => {
  const u = $('#loginUser').value.trim();
  const p = $('#loginPwd').value;
  const msg = $('#loginMsg');
  if (!u || !p) { msg.className = 'err-msg'; msg.textContent = '用户名和密码不能为空'; return; }
  const r = Auth.register(u, p);
  if (!r.ok) { msg.className = 'err-msg'; msg.textContent = r.msg; return; }
  msg.className = 'ok-msg';
  msg.textContent = `注册成功！请牢记账号「${u}」的密码，旧账号已失效`;
  $('#loginPwd').value = '';
  $('#showPwdCb').checked = false;
  $('#loginPwd').type = 'password';
});

$('#btnMasterReset').addEventListener('click', () => {
  $('#resetErr').textContent = '';
  $('#resetAdminUser').value = '';
  $('#resetAdminPwd').value = '';
  $('#resetTargetUser').value = '';
  $('#resetNewPwd').value = '';
  $('#resetModal').classList.remove('hidden');
});

/* ---------- 重置密码弹窗 ---------- */
$('#btnResetCancel').addEventListener('click', () => $('#resetModal').classList.add('hidden'));
$('#btnResetOk').addEventListener('click', () => {
  const mu = $('#resetAdminUser').value.trim();
  const mp = $('#resetAdminPwd').value;
  const tu = $('#resetTargetUser').value.trim();
  const np = $('#resetNewPwd').value;
  const err = $('#resetErr');
  err.textContent = '';

  if (!mu || !mp) { err.textContent = '请输入管理员账号和密码'; return; }
  if (mu !== Auth.MASTER_USER || mp !== Auth.MASTER_PWD) {
    err.textContent = '管理员账号或密码错误，无权重置！'; return;
  }
  if (!tu || !np) { err.textContent = '目标账号和新密码不能为空'; return; }

  const r = Auth.reset(tu, np);
  if (!r.ok) { err.textContent = r.msg; return; }
  alert(`账号 ${tu} 的密码已成功重置！`);
  $('#resetModal').classList.add('hidden');
});

/* ---------- 主界面：底部按钮 ---------- */
$('#btnDraw').addEventListener('click', doDraw);
$('#btnUndo').addEventListener('click', doUndo);

/* ---------- 抽屉 ---------- */
function openDrawer() { $('#drawerOverlay').classList.remove('hidden'); }
function closeDrawer() { $('#drawerOverlay').classList.add('hidden'); }

$('#btnMenu').addEventListener('click', openDrawer);
$('#drawerOverlay').addEventListener('click', e => {
  if (e.target === $('#drawerOverlay')) closeDrawer();
});

/* ---------- 导入题库（需密码验证） ---------- */
$('#btnImport').addEventListener('click', () => {
  closeDrawer();
  $('#pwdTip').textContent = `您正在尝试【导入题库】，请验证 ${state.user} 的登录密码：`;
  $('#pwdInput').value = '';
  $('#pwdErr').textContent = '';
  $('#pwdModal').classList.remove('hidden');
  setTimeout(() => $('#pwdInput').focus(), 100);
});

$('#btnPwdCancel').addEventListener('click', () => $('#pwdModal').classList.add('hidden'));
$('#btnPwdOk').addEventListener('click', () => {
  const pwd = $('#pwdInput').value;
  if (!pwd) { $('#pwdErr').textContent = '请输入密码'; return; }
  if (!Auth.verify(state.user, pwd)) { $('#pwdErr').textContent = '密码错误，无权限执行该操作'; return; }
  $('#pwdModal').classList.add('hidden');
  // 触发文件选择
  $('#fileInput').value = '';
  $('#fileInput').click();
});

$('#fileInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) importFile(file);
});

/* ---------- 设置 ---------- */
$('#btnSettings').addEventListener('click', () => {
  closeDrawer();
  renderSettingsModal();
  $('#settingsModal').classList.remove('hidden');
});

function renderSettingsModal() {
  // 模式单选
  const container = $('#modeRadios');
  container.innerHTML = Object.entries(MODES).map(([key, m]) => `
    <label class="radio-row">
      <input type="radio" name="modeRadio" value="${key}" ${state.mode === key ? 'checked' : ''}>
      <div>
        <div style="font-weight:600">${m.name}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">${m.desc}</div>
      </div>
    </label>`).join('');

  // 数量
  const maxCount = Math.max(1, state.questions.length || 1);
  $('#setCount').max = maxCount;
  $('#setCount').value = Math.min(state.drawCount, maxCount);

  $('#setAutoReset').checked = state.autoReset;

  // 字体
  const sel = $('#setFontFamily');
  if (![...sel.options].some(o => o.value === state.fontFamily)) {
    // 自定义字体不在列表里就加一个
    const opt = document.createElement('option');
    opt.value = state.fontFamily; opt.textContent = state.fontFamily || '系统默认';
    sel.appendChild(opt);
  }
  sel.value = state.fontFamily;

  // 字号
  $('#setFontSize').value = state.fontSize;
  $('#fontSizeVal').textContent = state.fontSize + 'px';
}

$('#setFontSize').addEventListener('input', e => {
  $('#fontSizeVal').textContent = e.target.value + 'px';
});

$('#btnSettingsCancel').addEventListener('click', () => $('#settingsModal').classList.add('hidden'));
$('#btnSettingsSave').addEventListener('click', () => {
  const modeEl = document.querySelector('input[name="modeRadio"]:checked');
  const newMode = modeEl ? modeEl.value : state.mode;
  if (newMode !== state.mode) state.drawStack = [];

  state.mode = newMode;
  state.drawCount = Math.max(1, parseInt($('#setCount').value) || 1);
  if (state.questions.length && state.drawCount > state.questions.length) {
    state.drawCount = state.questions.length;
  }
  state.autoReset = $('#setAutoReset').checked;
  state.fontFamily = $('#setFontFamily').value;
  state.fontSize = Math.max(10, Math.min(80, parseInt($('#setFontSize').value) || 24));

  saveConfig();
  applyDisplayStyle();
  refreshState();
  $('#settingsModal').classList.add('hidden');
  toast('设置已保存');
});

/* ---------- 历史记录 ---------- */
$('#btnHistory').addEventListener('click', () => {
  closeDrawer();
  renderHistory();
  $('#historyModal').classList.remove('hidden');
});
$('#btnHistoryClose').addEventListener('click', () => $('#historyModal').classList.add('hidden'));

function csvCell(s) {
  s = String(s);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function downloadText(content, mime, filename) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  return filename;
}

$('#btnExportTxt').addEventListener('click', () => {
  if (!state.history.length) { toast('暂无抽取记录'); return; }
  let out = '随机抽题系统 - 抽取记录\n';
  out += '导出时间：' + new Date().toLocaleString('zh-CN') + '\n';
  out += '题库：' + state.fileName + '（共 ' + state.questions.length + ' 题）\n';
  out += '='.repeat(40) + '\n\n';
  for (const rec of state.history) {
    out += `[${rec.time}] ${rec.mode}\n`;
    for (const it of rec.items) out += `  第${it.num}题：${it.text}\n`;
    out += '\n';
  }
  const fn = downloadText(out, 'text/plain;charset=utf-8', `抽题记录_${Date.now()}.txt`);
  toast('已导出：' + fn);
});

$('#btnExportCsv').addEventListener('click', () => {
  if (!state.history.length) { toast('暂无抽取记录'); return; }
  const rows = [['时间', '模式', '题号', '题目']];
  for (const rec of state.history)
    for (const it of rec.items)
      rows.push([rec.time, rec.mode, it.num, it.text]);
  const csv = '\uFEFF' + rows.map(r => r.map(csvCell).join(',')).join('\n');
  const fn = downloadText(csv, 'text/csv;charset=utf-8', `抽题记录_${Date.now()}.csv`);
  toast('已导出：' + fn);
});

/* ---------- 重置进度 ---------- */
$('#btnResetProgress').addEventListener('click', () => {
  closeDrawer();
  if (!state.questions.length) { toast('尚未导入题库'); return; }
  state.drawStack = [];
  resetPools(true, false);
  refreshState();
  toast('已重置抽取进度（历史记录保留）');
});

/* ---------- 版权 ---------- */
$('#btnCopyright').addEventListener('click', () => {
  closeDrawer();
  $('#copyrightModal').classList.remove('hidden');
});
$('#btnCopyrightClose').addEventListener('click', () => $('#copyrightModal').classList.add('hidden'));

/* ---------- 登出 ---------- */
$('#btnLogout').addEventListener('click', () => {
  closeDrawer();
  // 简易二次确认，避免误触
  if (!confirm('确定要登出吗？')) return;
  Auth.clearSession();
  state.user = null;
  state.questions = [];
  state.history = [];
  state.drawStack = [];
  state.fileName = '未导入';
  showLogin();
  toast('已登出');
});

/* ---------- 快捷键（电脑浏览器调试方便，手机上无影响） ---------- */
document.addEventListener('keydown', e => {
  if ($('#mainView').classList.contains('hidden')) return;
  if ($('#settingsModal').classList.contains('hidden') === false) return;
  if ($('#pwdModal').classList.contains('hidden') === false) return;
  if (e.key === ' ') { e.preventDefault(); if (!$('#btnDraw').disabled) doDraw(); }
  else if (e.ctrlKey && e.key.toLowerCase() === 'z') { e.preventDefault(); doUndo(); }
  else if (e.key.toLowerCase() === 'r') { if (state.questions.length) { state.drawStack = []; resetPools(true, false); refreshState(); toast('已重置进度'); } }
  else if (e.key === 'Escape') {
    if ($('#resultBox')) $('#resultBox').innerHTML = '<div class="placeholder">点击下方「抽 取」按钮开始抽题</div>';
  }
});

/* ============================================================
 * 启动
 * ============================================================ */
(function init() {
  loadConfig();
  const u = Auth.loadSession();
  if (u) {
    state.user = u;
    enterMain();
  } else {
    showLogin();
  }
})();
</script>
</body>
</html>