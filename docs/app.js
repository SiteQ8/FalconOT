(function(){
  const state = {
    lang: localStorage.getItem("lang") || "en",
    useApi: localStorage.getItem("useApi") === "true", // Demo mode default: false
    assets: [], findings: [], sortKey: "name", sortDir: "asc"
  };

  // ---- Embedded DEMO DATA (works without fetch) ----
  const DEMO_ASSETS = [{"id": "controller-1", "name": "Controller 01", "ip": "192.168.11.11", "type": "Controller", "purdue": "L2", "ports": [22, 20000], "tags": ["OT", "ICS"]}, {"id": "sensor-2", "name": "Sensor 02", "ip": "192.168.12.12", "type": "Sensor", "purdue": "DMZ", "ports": [1883, 5020], "tags": ["IoT"]}, {"id": "controller-3", "name": "Controller 03", "ip": "192.168.13.13", "type": "Controller", "purdue": "L1", "ports": [102, 443], "tags": ["OT", "ICS"]}, {"id": "camera-4", "name": "Camera 04", "ip": "192.168.14.14", "type": "Camera", "purdue": "DMZ", "ports": [443, 1883], "tags": ["IoT"]}, {"id": "robot-5", "name": "Robot 05", "ip": "192.168.15.15", "type": "Robot", "purdue": "DMZ", "ports": [554], "tags": []}, {"id": "broker-6", "name": "Broker 06", "ip": "192.168.16.16", "type": "Broker", "purdue": "L3", "ports": [80, 443], "tags": ["IoT"]}, {"id": "hmi-7", "name": "HMI 07", "ip": "192.168.17.17", "type": "HMI", "purdue": "DMZ", "ports": [20000], "tags": []}, {"id": "sensor-8", "name": "Sensor 08", "ip": "192.168.18.18", "type": "Sensor", "purdue": "DMZ", "ports": [102, 1883, 20000], "tags": ["IoT"]}, {"id": "broker-9", "name": "Broker 09", "ip": "192.168.19.19", "type": "Broker", "purdue": "L1", "ports": [1883], "tags": ["IoT", "ICS"]}, {"id": "broker-10", "name": "Broker 10", "ip": "192.168.20.20", "type": "Broker", "purdue": "L2", "ports": [1883], "tags": ["IoT", "ICS"]}, {"id": "gateway-11", "name": "Gateway 11", "ip": "192.168.21.21", "type": "Gateway", "purdue": "L3", "ports": [554, 1883], "tags": []}, {"id": "historian-12", "name": "Historian 12", "ip": "192.168.22.22", "type": "Historian", "purdue": "L2", "ports": [161, 5020, 20000], "tags": ["ICS"]}, {"id": "gateway-13", "name": "Gateway 13", "ip": "192.168.23.23", "type": "Gateway", "purdue": "DMZ", "ports": [1883], "tags": []}, {"id": "controller-14", "name": "Controller 14", "ip": "192.168.24.24", "type": "Controller", "purdue": "L3", "ports": [161, 502, 554], "tags": ["OT"]}, {"id": "broker-15", "name": "Broker 15", "ip": "192.168.25.25", "type": "Broker", "purdue": "L2", "ports": [80], "tags": ["IoT", "ICS"]}, {"id": "sensor-16", "name": "Sensor 16", "ip": "192.168.26.26", "type": "Sensor", "purdue": "L3", "ports": [80, 102, 502], "tags": ["IoT"]}, {"id": "hmi-17", "name": "HMI 17", "ip": "192.168.27.27", "type": "HMI", "purdue": "L2", "ports": [20000], "tags": ["ICS"]}, {"id": "plc-18", "name": "PLC 18", "ip": "192.168.28.28", "type": "PLC", "purdue": "L1", "ports": [22, 102, 161], "tags": ["OT", "ICS"]}, {"id": "historian-19", "name": "Historian 19", "ip": "192.168.29.29", "type": "Historian", "purdue": "L3", "ports": [1883, 5020], "tags": []}, {"id": "sensor-20", "name": "Sensor 20", "ip": "192.168.30.30", "type": "Sensor", "purdue": "L3", "ports": [443], "tags": ["IoT"]}, {"id": "hmi-21", "name": "HMI 21", "ip": "192.168.31.31", "type": "HMI", "purdue": "L3", "ports": [443, 5020, 20000], "tags": []}, {"id": "historian-22", "name": "Historian 22", "ip": "192.168.32.32", "type": "Historian", "purdue": "L3.5", "ports": [20000], "tags": []}, {"id": "hmi-23", "name": "HMI 23", "ip": "192.168.33.33", "type": "HMI", "purdue": "L1", "ports": [502], "tags": ["ICS"]}, {"id": "plc-24", "name": "PLC 24", "ip": "192.168.34.34", "type": "PLC", "purdue": "L1", "ports": [102, 554], "tags": ["OT", "ICS"]}, {"id": "broker-25", "name": "Broker 25", "ip": "192.168.35.35", "type": "Broker", "purdue": "DMZ", "ports": [5020], "tags": ["IoT"]}];
  const DEMO_FINDINGS = [{"asset_id": "sensor-20", "severity": "low", "title": "Anonymous MQTT allowed", "remediation": "Require auth and TLS for broker."}, {"asset_id": "plc-24", "severity": "high", "title": "Default credentials likely", "remediation": "Rotate creds; enforce MFA on mgmt."}, {"asset_id": "robot-5", "severity": "high", "title": "SNMP v2c public", "remediation": "Use SNMPv3 with strong auth/priv; change community strings."}, {"asset_id": "hmi-23", "severity": "medium", "title": "Default credentials likely", "remediation": "Rotate creds; enforce MFA on mgmt."}, {"asset_id": "broker-15", "severity": "medium", "title": "Default credentials likely", "remediation": "Rotate creds; enforce MFA on mgmt."}, {"asset_id": "gateway-13", "severity": "high", "title": "Default credentials likely", "remediation": "Rotate creds; enforce MFA on mgmt."}, {"asset_id": "historian-22", "severity": "medium", "title": "Default credentials likely", "remediation": "Rotate creds; enforce MFA on mgmt."}, {"asset_id": "sensor-20", "severity": "low", "title": "SNMP v2c public", "remediation": "Use SNMPv3 with strong auth/priv; change community strings."}, {"asset_id": "sensor-20", "severity": "medium", "title": "Anonymous MQTT allowed", "remediation": "Require auth and TLS for broker."}, {"asset_id": "hmi-7", "severity": "low", "title": "Legacy TLS", "remediation": "Enforce TLS1.2+; disable weak ciphers."}, {"asset_id": "camera-4", "severity": "medium", "title": "Modbus TCP exposed", "remediation": "Restrict to engineering subnet; firewall; consider jump host."}, {"asset_id": "plc-18", "severity": "low", "title": "Anonymous MQTT allowed", "remediation": "Require auth and TLS for broker."}, {"asset_id": "historian-19", "severity": "low", "title": "SNMP v2c public", "remediation": "Use SNMPv3 with strong auth/priv; change community strings."}, {"asset_id": "sensor-20", "severity": "medium", "title": "Legacy TLS", "remediation": "Enforce TLS1.2+; disable weak ciphers."}, {"asset_id": "controller-3", "severity": "low", "title": "Default credentials likely", "remediation": "Rotate creds; enforce MFA on mgmt."}];

  const I18N = {
    en: { assets:"Assets", topology:"Topology", findings:"Findings", actions:"Actions",
          refresh:"Refresh", planScan:"Plan safe scan", name:"Name", ip:"IP Address", type:"Type",
          purdue:"Purdue", ports:"Ports", tags:"Tags", planner:"Scan Planner", settings:"Settings" },
    ar: { assets:"الأصول", topology:"الخريطة", findings:"الملاحظات", actions:"الإجراءات",
          refresh:"تحديث", planScan:"خطة فحص آمن", name:"الاسم", ip:"عنوان IP", type:"النوع",
          purdue:"المستوى", ports:"المنافذ", tags:"الوسوم", planner:"مُخطِّط الفحص", settings:"الإعدادات" }
  };

  function t(k){ return (I18N[state.lang] && I18N[state.lang][k]) || k; }
  function applyI18n(){
    document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.getAttribute("data-i18n")));
    document.getElementById("langState")?.replaceChildren(document.createTextNode(state.lang.toUpperCase()));
    document.body.classList.toggle("rtl", state.lang === "ar");
  }

  // ---- Data loader ----
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
    // fallback to embedded demo
    state.assets = DEMO_ASSETS;
    state.findings = DEMO_FINDINGS;
  }

  // ---- UI helpers ----
  function renderKpis(){
    const total = state.assets.length;
    const sev = { high:0, medium:0, low:0 };
    state.findings.forEach(f => { if(sev[f.severity] !== undefined) sev[f.severity]++; });
    const el = document.getElementById("kpis");
    el.innerHTML = `
      <div class="kpi"><h3>Total assets</h3><div class="num">${total}</div></div>
      <div class="kpi"><h3>High findings</h3><div class="num">${sev.high}</div></div>
      <div class="kpi"><h3>Medium findings</h3><div class="num">${sev.medium}</div></div>
      <div class="kpi"><h3>Low findings</h3><div class="num">${sev.low}</div></div>
    `;
  }

  function drawGraph(){
    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "12px Inter";
    const levels = ["L3.5","L3","L2","L1","DMZ"];
    const by = new Map(levels.map(l=>[l,[]]));
    for(const a of state.assets){ if(!by.has(a.purdue)) by.set(a.purdue, []); by.get(a.purdue).push(a); }
    const rowH = canvas.height / (levels.length+1);
    let y = rowH;
    levels.forEach(level => {
      const arr = by.get(level) || [];
      ctx.fillStyle = "#64748b"; ctx.fillText(level, 12, y-6);
      const spacing = arr.length ? (canvas.width-40)/(arr.length) : 0;
      let x = 30;
      arr.forEach(a=>{ ctx.fillStyle="#1f2937"; ctx.fillRect(x-6,y-6,12,12); ctx.fillStyle="#111827"; ctx.fillText(a.name, x+10, y+4); x += spacing; });
      y += rowH;
    });
    ctx.strokeStyle = "#94a3b8"; ctx.beginPath(); ctx.moveTo(60,rowH); ctx.lineTo(60,rowH*2); ctx.moveTo(120,rowH*2); ctx.lineTo(120,rowH*3); ctx.stroke();
  }

  function renderAssetTable(){
    const container = document.getElementById("asset-table");
    const search = document.getElementById("searchInput")?.value || "";
    let filtered = state.assets.filter(a => {
      const hay = (a.name + " " + a.ip + " " + a.type + " " + a.purdue + " " + (a.tags||[]).join(" ")).toLowerCase();
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
          <th data-k="name">${t("name")} ▾</th>
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
            <td>${a.name}</td>
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
      th.addEventListener("click", ()=>{
        const nk = th.getAttribute("data-k");
        if (state.sortKey === nk) state.sortDir = (state.sortDir==="asc"?"desc":"asc");
        else { state.sortKey = nk; state.sortDir = "asc"; }
        renderAssetTable();
      });
    });
  }

  function renderFindings(){
    const list = document.getElementById("findings-list");
    const sev = document.getElementById("sevFilter").value;
    const items = sev ? state.findings.filter(f => f.severity === sev) : state.findings;
    list.innerHTML = items.map(f => `
      <div class="finding sev-${f.severity}">
        <strong>[${f.severity.toUpperCase()}]</strong> ${f.title}
        <div><em>Asset:</em> ${f.asset_id}</div>
        <div><strong>Fix:</strong> ${f.remediation}</div>
      </div>
    `).join("");
  }

  function planScan(){
    const targets = state.assets.slice(0, 3).map(a => a.ip);
    let out = { plan: `nmap -Pn -sS -sV --top-ports 100 --host-timeout 8000ms --scan-delay 150ms --max-retries 1 ${targets.join(" ")}`, note: "Offline demo plan" };
    document.getElementById("planOut").textContent = JSON.stringify(out, null, 2);
  }

  function renderAll(){
    renderKpis();
    drawGraph();
    renderAssetTable();
    renderFindings();
    document.getElementById("demoState")?.replaceChildren(document.createTextNode(state.useApi ? "OFF" : "ON"));
  }

  // ---- navigation ----
  function switchView(name){
    document.querySelectorAll(".sidebar li").forEach(li => li.classList.toggle("active", li.getAttribute("data-view") === name));
    document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
    document.getElementById("view-"+name).classList.remove("hidden");
  }

  // ---- boot ----
  window.addEventListener("DOMContentLoaded", async () => {
    applyI18n();
    document.getElementById("apiToggle").checked = state.useApi;
    document.getElementById("apiToggle").addEventListener("change", async (e)=>{
      state.useApi = e.target.checked; localStorage.setItem("useApi", String(state.useApi));
      await loadData(); renderAll();
    });
    document.querySelectorAll(".lang button").forEach(btn => btn.addEventListener("click", ()=>{
      state.lang = btn.dataset.lang || "en"; localStorage.setItem("lang", state.lang);
      applyI18n(); renderAll();
    }));
    document.getElementById("searchInput")?.addEventListener("input", renderAssetTable);
    document.getElementById("sevFilter")?.addEventListener("change", renderFindings);
    document.getElementById("planScanBtn")?.addEventListener("click", planScan);
    document.querySelectorAll(".sidebar li").forEach(li => li.addEventListener("click", ()=> switchView(li.getAttribute("data-view"))));

    await loadData(); renderAll();
    switchView("overview");
  });
})();
