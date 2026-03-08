(function(){
  /* ========== DEMO CREDENTIALS ========== */
  const DEMO_USER = "FalconOT-Demo01";
  const DEMO_PASS = "FalconOT";

  const state = {
    lang: "en",
    useApi: false,
    assets: [], findings: [], sortKey: "name", sortDir: "asc",
    loggedIn: false, username: ""
  };

  /* ========== EMBEDDED DEMO DATA ========== */
  const DEMO_ASSETS = [{"id":"controller-1","name":"Controller 01","ip":"192.168.11.11","type":"Controller","purdue":"L2","ports":[22,20000],"tags":["OT","ICS"]},{"id":"sensor-2","name":"Sensor 02","ip":"192.168.12.12","type":"Sensor","purdue":"DMZ","ports":[1883,5020],"tags":["IoT"]},{"id":"controller-3","name":"Controller 03","ip":"192.168.13.13","type":"Controller","purdue":"L1","ports":[102,443],"tags":["OT","ICS"]},{"id":"camera-4","name":"Camera 04","ip":"192.168.14.14","type":"Camera","purdue":"DMZ","ports":[443,1883],"tags":["IoT"]},{"id":"robot-5","name":"Robot 05","ip":"192.168.15.15","type":"Robot","purdue":"DMZ","ports":[554],"tags":[]},{"id":"broker-6","name":"Broker 06","ip":"192.168.16.16","type":"Broker","purdue":"L3","ports":[80,443],"tags":["IoT"]},{"id":"hmi-7","name":"HMI 07","ip":"192.168.17.17","type":"HMI","purdue":"DMZ","ports":[20000],"tags":[]},{"id":"sensor-8","name":"Sensor 08","ip":"192.168.18.18","type":"Sensor","purdue":"DMZ","ports":[102,1883,20000],"tags":["IoT"]},{"id":"broker-9","name":"Broker 09","ip":"192.168.19.19","type":"Broker","purdue":"L1","ports":[1883],"tags":["IoT","ICS"]},{"id":"broker-10","name":"Broker 10","ip":"192.168.20.20","type":"Broker","purdue":"L2","ports":[1883],"tags":["IoT","ICS"]},{"id":"gateway-11","name":"Gateway 11","ip":"192.168.21.21","type":"Gateway","purdue":"L3","ports":[554,1883],"tags":[]},{"id":"historian-12","name":"Historian 12","ip":"192.168.22.22","type":"Historian","purdue":"L2","ports":[161,5020,20000],"tags":["ICS"]},{"id":"gateway-13","name":"Gateway 13","ip":"192.168.23.23","type":"Gateway","purdue":"DMZ","ports":[1883],"tags":[]},{"id":"controller-14","name":"Controller 14","ip":"192.168.24.24","type":"Controller","purdue":"L3","ports":[161,502,554],"tags":["OT"]},{"id":"broker-15","name":"Broker 15","ip":"192.168.25.25","type":"Broker","purdue":"L2","ports":[80],"tags":["IoT","ICS"]},{"id":"sensor-16","name":"Sensor 16","ip":"192.168.26.26","type":"Sensor","purdue":"L3","ports":[80,102,502],"tags":["IoT"]},{"id":"hmi-17","name":"HMI 17","ip":"192.168.27.27","type":"HMI","purdue":"L2","ports":[20000],"tags":["ICS"]},{"id":"plc-18","name":"PLC 18","ip":"192.168.28.28","type":"PLC","purdue":"L1","ports":[22,102,161],"tags":["OT","ICS"]},{"id":"historian-19","name":"Historian 19","ip":"192.168.29.29","type":"Historian","purdue":"L3","ports":[1883,5020],"tags":[]},{"id":"sensor-20","name":"Sensor 20","ip":"192.168.30.30","type":"Sensor","purdue":"L3","ports":[443],"tags":["IoT"]},{"id":"hmi-21","name":"HMI 21","ip":"192.168.31.31","type":"HMI","purdue":"L3","ports":[443,5020,20000],"tags":[]},{"id":"historian-22","name":"Historian 22","ip":"192.168.32.32","type":"Historian","purdue":"L3.5","ports":[20000],"tags":[]},{"id":"hmi-23","name":"HMI 23","ip":"192.168.33.33","type":"HMI","purdue":"L1","ports":[502],"tags":["ICS"]},{"id":"plc-24","name":"PLC 24","ip":"192.168.34.34","type":"PLC","purdue":"L1","ports":[102,554],"tags":["OT","ICS"]},{"id":"broker-25","name":"Broker 25","ip":"192.168.35.35","type":"Broker","purdue":"DMZ","ports":[5020],"tags":["IoT"]}];

  const DEMO_FINDINGS = [{"asset_id":"sensor-20","severity":"low","title":"Anonymous MQTT allowed","remediation":"Require auth and TLS for broker."},{"asset_id":"plc-24","severity":"critical","title":"Exposed Modbus TCP with no authentication","remediation":"Implement firewall rules; restrict to engineering VLAN; deploy Modbus-aware IDS."},{"asset_id":"plc-24","severity":"high","title":"Default credentials likely","remediation":"Rotate creds; enforce MFA on mgmt."},{"asset_id":"robot-5","severity":"high","title":"SNMP v2c public","remediation":"Use SNMPv3 with strong auth/priv; change community strings."},{"asset_id":"hmi-23","severity":"medium","title":"Default credentials likely","remediation":"Rotate creds; enforce MFA on mgmt."},{"asset_id":"broker-15","severity":"medium","title":"Default credentials likely","remediation":"Rotate creds; enforce MFA on mgmt."},{"asset_id":"gateway-13","severity":"high","title":"Default credentials likely","remediation":"Rotate creds; enforce MFA on mgmt."},{"asset_id":"historian-22","severity":"medium","title":"Default credentials likely","remediation":"Rotate creds; enforce MFA on mgmt."},{"asset_id":"sensor-20","severity":"low","title":"SNMP v2c public","remediation":"Use SNMPv3 with strong auth/priv; change community strings."},{"asset_id":"sensor-20","severity":"medium","title":"Anonymous MQTT allowed","remediation":"Require auth and TLS for broker."},{"asset_id":"hmi-7","severity":"low","title":"Legacy TLS","remediation":"Enforce TLS1.2+; disable weak ciphers."},{"asset_id":"camera-4","severity":"medium","title":"Modbus TCP exposed","remediation":"Restrict to engineering subnet; firewall; consider jump host."},{"asset_id":"plc-18","severity":"low","title":"Anonymous MQTT allowed","remediation":"Require auth and TLS for broker."},{"asset_id":"historian-19","severity":"low","title":"SNMP v2c public","remediation":"Use SNMPv3 with strong auth/priv; change community strings."},{"asset_id":"sensor-20","severity":"medium","title":"Legacy TLS","remediation":"Enforce TLS1.2+; disable weak ciphers."},{"asset_id":"controller-3","severity":"low","title":"Default credentials likely","remediation":"Rotate creds; enforce MFA on mgmt."},{"asset_id":"controller-1","severity":"critical","title":"SSH with password auth on OT controller","remediation":"Disable password auth; enforce key-based SSH; restrict source IPs."},{"asset_id":"broker-9","severity":"high","title":"Unauthenticated MQTT broker on L1","remediation":"Enable ACLs and TLS; move broker behind firewall."}];

  const I18N = {
    en: { assets:"Assets", topology:"Topology", findings:"Findings", actions:"Actions",
          refresh:"Refresh", planScan:"Plan safe scan", name:"Name", ip:"IP Address", type:"Type",
          purdue:"Purdue", ports:"Ports", tags:"Tags", planner:"Scan Planner", settings:"Settings" },
    ar: { assets:"الأصول", topology:"الخريطة", findings:"الملاحظات", actions:"الإجراءات",
          refresh:"تحديث", planScan:"خطة فحص آمن", name:"الاسم", ip:"عنوان IP", type:"النوع",
          purdue:"المستوى", ports:"المنافذ", tags:"الوسوم", planner:"مُخطِّط الفحص", settings:"الإعدادات" }
  };

  function t(k){ return (I18N[state.lang] && I18N[state.lang][k]) || k; }
  function applyI18n(){
    document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.getAttribute("data-i18n")));
    const ls = document.getElementById("langState"); if(ls) ls.textContent = state.lang.toUpperCase();
    document.body.classList.toggle("rtl", state.lang === "ar");
  }

  /* ========== LOGIN ========== */
  function initLogin(){
    const screen = document.getElementById("login-screen");
    const app = document.getElementById("app");
    const btn = document.getElementById("loginBtn");
    const userIn = document.getElementById("loginUser");
    const passIn = document.getElementById("loginPass");
    const errEl = document.getElementById("loginError");
    const toggleBtn = document.getElementById("togglePass");

    toggleBtn.addEventListener("click", () => {
      const isPass = passIn.type === "password";
      passIn.type = isPass ? "text" : "password";
      toggleBtn.textContent = isPass ? "🙈" : "👁";
    });

    function attemptLogin(){
      const u = userIn.value.trim();
      const p = passIn.value;
      if (u === DEMO_USER && p === DEMO_PASS){
        state.loggedIn = true;
        state.username = u;
        screen.classList.add("hidden");
        app.classList.remove("hidden");
        const su = document.getElementById("sessionUser"); if(su) su.textContent = u;
        bootApp();
      } else {
        errEl.textContent = "Invalid credentials. Use the demo credentials shown below.";
        errEl.classList.remove("hidden");
        passIn.value = "";
        passIn.focus();
      }
    }

    btn.addEventListener("click", attemptLogin);
    passIn.addEventListener("keydown", e => { if(e.key === "Enter") attemptLogin(); });
    userIn.addEventListener("keydown", e => { if(e.key === "Enter") passIn.focus(); });
    userIn.focus();
  }

  function logout(){
    state.loggedIn = false;
    state.username = "";
    document.getElementById("app").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPass").value = "";
    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("loginUser").focus();
  }

  /* ========== DATA ========== */
  async function loadData(){
    if (state.useApi){
      try {
        const [a, f] = await Promise.all([
          fetch("http://localhost:8000/api/assets").then(r=>r.json()),
          fetch("http://localhost:8000/api/assets/findings").then(r=>r.json())
        ]);
        state.assets = a; state.findings = f;
        return;
      } catch(e){
        console.warn("API not reachable, falling back to demo data.", e);
      }
    }
    state.assets = DEMO_ASSETS;
    state.findings = DEMO_FINDINGS;
  }

  /* ========== KPIs ========== */
  function renderKpis(){
    const total = state.assets.length;
    const sev = { critical:0, high:0, medium:0, low:0 };
    state.findings.forEach(f => { if(sev[f.severity] !== undefined) sev[f.severity]++; });
    const purdueZones = new Set(state.assets.map(a => a.purdue)).size;
    document.getElementById("kpis").innerHTML = `
      <div class="kpi"><h3>Total Assets</h3><div class="num">${total}</div></div>
      <div class="kpi kpi-danger"><h3>Critical</h3><div class="num">${sev.critical}</div></div>
      <div class="kpi kpi-danger"><h3>High</h3><div class="num">${sev.high}</div></div>
      <div class="kpi kpi-warn"><h3>Medium</h3><div class="num">${sev.medium}</div></div>
      <div class="kpi kpi-ok"><h3>Low</h3><div class="num">${sev.low}</div></div>
    `;
  }

  /* ========== CHARTS ========== */
  function drawBarChart(canvasId, labels, values, colors){
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = canvas.parentElement.clientWidth - 32;
    const H = canvas.height = 200;
    ctx.clearRect(0,0,W,H);
    const max = Math.max(...values, 1);
    const barW = Math.min(60, (W - 80) / labels.length - 12);
    const startX = 50;
    const baseY = H - 30;
    const chartH = baseY - 20;

    // Grid
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    for(let i = 0; i <= 4; i++){
      const y = baseY - (chartH / 4) * i;
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W, y); ctx.stroke();
      ctx.fillStyle = "#94a3b8"; ctx.font = "11px Inter, system-ui";
      ctx.textAlign = "right";
      ctx.fillText(Math.round(max / 4 * i), 36, y + 4);
    }

    labels.forEach((label, i) => {
      const x = startX + i * ((W - startX - 20) / labels.length) + barW / 2;
      const h = (values[i] / max) * chartH;
      const y = baseY - h;

      // Bar
      ctx.fillStyle = colors[i] || "#1d4ed8";
      ctx.beginPath();
      ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
      ctx.fill();

      // Value
      ctx.fillStyle = "#334155"; ctx.font = "bold 12px Inter, system-ui";
      ctx.textAlign = "center";
      ctx.fillText(values[i], x + barW / 2, y - 6);

      // Label
      ctx.fillStyle = "#64748b"; ctx.font = "11px Inter, system-ui";
      ctx.fillText(label, x + barW / 2, baseY + 16);
    });
  }

  function renderCharts(){
    // Severity distribution
    const sev = { Critical:0, High:0, Medium:0, Low:0 };
    state.findings.forEach(f => {
      const k = f.severity.charAt(0).toUpperCase() + f.severity.slice(1);
      if(sev[k] !== undefined) sev[k]++;
    });
    drawBarChart("sevChart",
      Object.keys(sev), Object.values(sev),
      ["#7c3aed", "#ef4444", "#f59e0b", "#10b981"]
    );

    // Assets by type
    const types = {};
    state.assets.forEach(a => { types[a.type] = (types[a.type] || 0) + 1; });
    const typeLabels = Object.keys(types).sort((a,b) => types[b] - types[a]);
    const typeVals = typeLabels.map(k => types[k]);
    const typeColors = ["#1d4ed8","#0ea5e9","#6366f1","#8b5cf6","#06b6d4","#0d9488","#059669","#84cc16"];
    drawBarChart("typeChart", typeLabels, typeVals, typeColors);
  }

  /* ========== TOPOLOGY ========== */
  function drawGraph(){
    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth - 32;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "12px Inter, system-ui";
    const levels = ["L3.5","L3","L2","L1","DMZ"];
    const by = new Map(levels.map(l=>[l,[]]));
    for(const a of state.assets){ if(!by.has(a.purdue)) by.set(a.purdue, []); by.get(a.purdue).push(a); }
    const rowH = canvas.height / (levels.length+1);
    const colors = { "L3.5":"#6366f1", "L3":"#1d4ed8", "L2":"#0ea5e9", "L1":"#f59e0b", "DMZ":"#ef4444" };
    let y = rowH;
    levels.forEach(level => {
      const arr = by.get(level) || [];
      // Zone label
      ctx.fillStyle = "#94a3b8"; ctx.font = "bold 11px Inter, system-ui"; ctx.fillText(level, 8, y+4);
      // Zone line
      ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(canvas.width - 10, y); ctx.stroke();

      const spacing = arr.length ? (canvas.width - 80) / arr.length : 0;
      let x = 60;
      arr.forEach(a => {
        const cx = x + spacing / 2;
        // Node circle
        ctx.beginPath();
        ctx.arc(cx, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = colors[level] || "#64748b";
        ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
        // Label
        ctx.fillStyle = "#1f2937"; ctx.font = "11px Inter, system-ui";
        ctx.textAlign = "center";
        ctx.fillText(a.name, cx, y + 22);
        ctx.textAlign = "left";
        x += spacing;
      });
      y += rowH;
    });
  }

  /* ========== ASSET TABLE ========== */
  function renderAssetTable(){
    const container = document.getElementById("asset-table");
    const search = document.getElementById("searchInput")?.value || "";
    let filtered = state.assets.filter(a => {
      const hay = (a.name+" "+a.ip+" "+a.type+" "+a.purdue+" "+(a.tags||[]).join(" ")).toLowerCase();
      return hay.includes(search.toLowerCase());
    });

    const k = state.sortKey, dir = state.sortDir;
    filtered.sort((A,B)=>{
      const a = (A[k] ?? "").toString().toLowerCase();
      const b = (B[k] ?? "").toString().toLowerCase();
      if (a<b) return dir==="asc" ? -1 : 1;
      if (a>b) return dir==="asc" ? 1 : -1;
      return 0;
    });

    const el = document.createElement("table");
    el.className = "table";
    el.innerHTML = `
      <thead>
        <tr>
          <th data-k="name">${t("name")} ${state.sortKey==="name"?(state.sortDir==="asc"?"▲":"▼"):""}</th>
          <th data-k="ip">${t("ip")}</th>
          <th data-k="type">${t("type")}</th>
          <th data-k="purdue">${t("purdue")}</th>
          <th>${t("ports")}</th>
          <th>${t("tags")}</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(a => `
          <tr>
            <td><strong>${a.name}</strong></td>
            <td><code>${a.ip}</code></td>
            <td>${a.type}</td>
            <td><span class="badge">${a.purdue}</span></td>
            <td>${(a.ports||[]).join(", ")}</td>
            <td>${(a.tags||[]).map(x=>`<span class="badge">${x}</span>`).join(" ")}</td>
          </tr>
        `).join("")}
      </tbody>
    `;
    container.innerHTML = ""; container.appendChild(el);
    el.querySelectorAll("th[data-k]").forEach(th => {
      th.style.cursor = "pointer";
      th.addEventListener("click", ()=>{
        const nk = th.getAttribute("data-k");
        if (state.sortKey === nk) state.sortDir = (state.sortDir==="asc"?"desc":"asc");
        else { state.sortKey = nk; state.sortDir = "asc"; }
        renderAssetTable();
      });
    });

    const countEl = document.getElementById("assetCount");
    if(countEl) countEl.textContent = `Showing ${filtered.length} of ${state.assets.length} assets`;
  }

  /* ========== CSV EXPORT ========== */
  function exportCsv(){
    const headers = ["Name","IP","Type","Purdue Level","Ports","Tags"];
    const rows = state.assets.map(a => [
      a.name, a.ip, a.type, a.purdue,
      (a.ports||[]).join(";"), (a.tags||[]).join(";")
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "falconot-assets.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  /* ========== FINDINGS ========== */
  function renderFindings(){
    const list = document.getElementById("findings-list");
    const sev = document.getElementById("sevFilter").value;
    const items = sev ? state.findings.filter(f => f.severity === sev) : state.findings;
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    items.sort((a,b) => (order[a.severity]??9) - (order[b.severity]??9));
    list.innerHTML = items.map(f => `
      <div class="finding sev-${f.severity}">
        <div class="finding-header">
          <strong>${f.title}</strong>
          <span class="sev-badge ${f.severity}">${f.severity.toUpperCase()}</span>
        </div>
        <div><em>Asset:</em> ${f.asset_id}</div>
        <div><strong>Remediation:</strong> ${f.remediation}</div>
      </div>
    `).join("");
  }

  /* ========== SCAN PLANNER ========== */
  function planScan(){
    const profile = document.getElementById("scanProfile").value;
    const maxT = parseInt(document.getElementById("maxTargets").value) || 5;
    const targets = state.assets.slice(0, maxT).map(a => a.ip);
    const profiles = {
      safe: { flags: "-Pn -sS -sV --top-ports 100 --host-timeout 8000ms --scan-delay 150ms --max-retries 1", note: "ICS-safe: slow timing, no aggressive probes" },
      quick: { flags: "-Pn -sS --top-ports 50 --host-timeout 5000ms -T3", note: "Quick discovery: top 50 ports, moderate timing" },
      deep: { flags: "-Pn -sS -sV -sC --top-ports 1000 --host-timeout 15000ms --scan-delay 100ms -T2", note: "Deep audit: version + scripts, 1000 ports, careful timing" }
    };
    const p = profiles[profile] || profiles.safe;
    const out = {
      profile: profile,
      command: `nmap ${p.flags} ${targets.join(" ")}`,
      targets: targets.length,
      note: p.note,
      warning: "Always get written authorization before scanning OT/ICS networks."
    };
    document.getElementById("planOut").textContent = JSON.stringify(out, null, 2);
  }

  /* ========== REPORTS ========== */
  function generateReport(){
    const sev = { critical:0, high:0, medium:0, low:0 };
    state.findings.forEach(f => { if(sev[f.severity] !== undefined) sev[f.severity]++; });
    const total = state.findings.length;
    const types = {};
    state.assets.forEach(a => { types[a.type] = (types[a.type]||0) + 1; });
    const now = new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });

    // Top affected assets
    const assetFindings = {};
    state.findings.forEach(f => { assetFindings[f.asset_id] = (assetFindings[f.asset_id]||0) + 1; });
    const topAssets = Object.entries(assetFindings).sort((a,b) => b[1]-a[1]).slice(0, 5);

    const container = document.getElementById("reportOut");
    container.classList.remove("hidden");
    container.innerHTML = `
      <h3>FalconOT — Executive Security Summary</h3>
      <p><strong>Generated:</strong> ${now} &nbsp;|&nbsp; <strong>Mode:</strong> ${state.useApi ? "Live API" : "Demo Data"}</p>
      <hr/>
      <h3>Asset Inventory</h3>
      <p>Total assets monitored: <strong>${state.assets.length}</strong> across <strong>${new Set(state.assets.map(a=>a.purdue)).size}</strong> Purdue zones.</p>
      <table>
        <tr><th>Asset Type</th><th>Count</th></tr>
        ${Object.entries(types).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join("")}
      </table>
      <h3>Findings Overview</h3>
      <p>Total findings: <strong>${total}</strong></p>
      <table>
        <tr><th>Severity</th><th>Count</th><th>%</th></tr>
        <tr style="color:#7c3aed"><td>Critical</td><td>${sev.critical}</td><td>${total?Math.round(sev.critical/total*100):0}%</td></tr>
        <tr style="color:#dc2626"><td>High</td><td>${sev.high}</td><td>${total?Math.round(sev.high/total*100):0}%</td></tr>
        <tr style="color:#d97706"><td>Medium</td><td>${sev.medium}</td><td>${total?Math.round(sev.medium/total*100):0}%</td></tr>
        <tr style="color:#059669"><td>Low</td><td>${sev.low}</td><td>${total?Math.round(sev.low/total*100):0}%</td></tr>
      </table>
      <h3>Most Affected Assets</h3>
      <table>
        <tr><th>Asset ID</th><th>Findings</th></tr>
        ${topAssets.map(([id,c])=>`<tr><td>${id}</td><td>${c}</td></tr>`).join("")}
      </table>
      <h3>Recommendations</h3>
      <p>1. Address all <strong>critical</strong> and <strong>high</strong> findings immediately — ${sev.critical + sev.high} items require urgent attention.</p>
      <p>2. Rotate default credentials across all OT/ICS devices.</p>
      <p>3. Enforce TLS 1.2+ and disable legacy cipher suites.</p>
      <p>4. Segment Modbus/MQTT traffic to dedicated engineering VLANs.</p>
      <p>5. Deploy SNMPv3 with authentication and encryption.</p>
    `;
  }

  /* ========== RENDER ALL ========== */
  function renderAll(){
    renderKpis();
    renderCharts();
    drawGraph();
    renderAssetTable();
    renderFindings();
    const ds = document.getElementById("demoState"); if(ds) ds.textContent = state.useApi ? "OFF" : "ON";
  }

  /* ========== NAVIGATION ========== */
  function switchView(name){
    document.querySelectorAll(".sidebar li").forEach(li => li.classList.toggle("active", li.getAttribute("data-view") === name));
    document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
    const el = document.getElementById("view-"+name);
    if(el) el.classList.remove("hidden");
    // Re-render charts when switching to overview (canvas resize)
    if(name === "overview") { renderCharts(); drawGraph(); }
  }

  /* ========== BOOT ========== */
  async function bootApp(){
    applyI18n();
    document.getElementById("apiToggle").checked = state.useApi;
    document.getElementById("apiToggle").addEventListener("change", async (e)=>{
      state.useApi = e.target.checked;
      await loadData(); renderAll();
    });
    document.querySelectorAll(".lang button").forEach(btn => btn.addEventListener("click", ()=>{
      state.lang = btn.dataset.lang || "en";
      applyI18n(); renderAll();
    }));
    document.getElementById("searchInput")?.addEventListener("input", renderAssetTable);
    document.getElementById("sevFilter")?.addEventListener("change", renderFindings);
    document.getElementById("planScanBtn")?.addEventListener("click", planScan);
    document.getElementById("exportCsvBtn")?.addEventListener("click", exportCsv);
    document.getElementById("genReportBtn")?.addEventListener("click", generateReport);
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    document.getElementById("settingsLogout")?.addEventListener("click", logout);
    document.querySelectorAll(".sidebar li").forEach(li => li.addEventListener("click", ()=> switchView(li.getAttribute("data-view"))));

    await loadData(); renderAll();
    switchView("overview");
  }

  /* ========== INIT ========== */
  window.addEventListener("DOMContentLoaded", () => { initLogin(); });
})();
