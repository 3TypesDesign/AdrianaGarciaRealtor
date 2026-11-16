/* ============================================================
   Adriana García · Link Bio — script compartido (ES y EN)

   DATOS DE CONTACTO: se editan SOLO aquí y aplican a las dos páginas.
   phone / whatsapp: solo números con código de país (ej. 18135551234)
   Recuerda actualizar también "telephone" / "email" / "sameAs"
   en el bloque JSON-LD de index.html y en/index.html.
   ============================================================ */
var CONFIG = {
  whatsapp: '18137339205',
  phone: '18137339205',
  email: '',               // ej. 'adriana@ejemplo.com'
  license: '',             // Licencia de Florida, ej. 'SL3XXXXXX'
  socials: {
    instagram: '',         // URL completa
    facebook: '',
    tiktok: '',
    youtube: ''
  },

  /* ---------- CASA DE LA SEMANA ----------
     Para cambiarla: sube la foto a assets/ y edita estos datos.
     Para ocultar la sección: show: false
     ----------------------------------------- */
  home: {
    show: true,
    photo: 'assets/casa-semana-9000-sterling-ln-port-richey.webp', // ruta desde la raíz (horizontal, 4:3)
    link: 'https://www.zillow.com/homedetails/9000-Sterling-Ln-Port-Richey-FL-34668/46407371_zpid/',
    price: '$225,600',
    priceNote: { es: 'Valor estimado (Zestimate)', en: 'Estimated value (Zestimate)' }, // vacío si es precio de lista
    address: '9000 Sterling Ln',
    city: 'Port Richey, FL',
    beds: 2, baths: 2, sqft: 1314,
    tag: { es: 'Remodelada', en: 'Remodeled' },  // ej. 'Precio reducido' / 'Open House sábado' — vacío para ocultar
    courtesy: ''                       // si es de otro broker: 'Listing cortesía de XYZ Realty'
  },
  listingsUrl: ''                      // botón "Mira mis listings" (perfil LPT, Zillow, IDX…)
};

var MSG = {
  es: {
    ctaMsg: 'Hola Adriana, quiero agendar una consulta gratis.',
    msgUni: 'Hola Adriana, quiero asesoría para comprar, vender o comprar mi primera vivienda.',
    msgSteps: 'Hola Adriana, quiero empezar el paso 1: consulta y pre-aprobación.',
    msgFaq: 'Hola Adriana, tengo una pregunta sobre comprar o vender casa.',
    msgContact: 'Hola Adriana, vengo de tu página y quiero más información.',
    mailSubject: 'Quiero más información',
    mailBody: 'Hola Adriana, quiero más información sobre ',
    soon: 'Próximamente', copied: '¡Copiado!', copy: 'Copiar dirección de email',
    license: 'Licencia FL #',
    homeTitle: 'Casa de la semana', homeLabel: 'Destacada', beds: 'hab', baths: 'baños', sqft: 'pies²',
    seeHome: 'Ver esta casa', myListings: 'Mira mis listings', photoAlt: 'Foto de la casa de la semana en '
  },
  en: {
    ctaMsg: "Hi Adriana, I'd like to book a free consultation.",
    msgUni: "Hi Adriana, I'd like advice on buying, selling or buying my first home.",
    msgSteps: "Hi Adriana, I'd like to start step 1: consultation and pre-approval.",
    msgFaq: 'Hi Adriana, I have a question about buying or selling a home.',
    msgContact: 'Hi Adriana, I found your page and would like more information.',
    mailSubject: "I'd like more information",
    mailBody: "Hi Adriana, I'd like more information about ",
    soon: 'Coming soon', copied: 'Copied!', copy: 'Copy email address',
    license: 'FL License #',
    homeTitle: 'Home of the week', homeLabel: 'Featured', beds: 'bd', baths: 'ba', sqft: 'sq ft',
    seeHome: 'See this home', myListings: 'See my listings', photoAlt: 'Photo of the home of the week in '
  }
};

var SITE_ROOT = (document.currentScript && document.currentScript.src || '').replace(/assets\/site\.js.*$/, '');

(function(){
  var lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  var t = function(k){ return MSG[lang][k]; };
  var enc = encodeURIComponent;
  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/.test(ua);

  function fmtPhone(n){
    var d = String(n).replace(/\D/g,'');
    if (d.length === 11 && d[0] === '1') d = d.slice(1);
    return d.length === 10 ? '+1 (' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6) : n;
  }

  // WhatsApp
  document.querySelectorAll('[data-wa]').forEach(function(a){
    if (CONFIG.whatsapp) { a.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + enc(t(a.dataset.wa)); a.target = '_blank'; a.rel = 'noopener'; }
  });
  // Teléfono
  document.querySelectorAll('[data-tel]').forEach(function(a){ if (CONFIG.phone) a.href = 'tel:+' + CONFIG.phone.replace(/\D/g,''); });
  document.querySelectorAll('[data-show="phone"]').forEach(function(el){ el.textContent = CONFIG.phone ? fmtPhone(CONFIG.phone) : t('soon'); });
  document.querySelectorAll('[data-show="email"]').forEach(function(el){ el.textContent = CONFIG.email || t('soon'); });
  // Licencia
  document.querySelectorAll('[data-show="license"]').forEach(function(el){
    if (CONFIG.license) { el.textContent = t('license') + CONFIG.license; el.hidden = false; }
  });

  // Casa de la semana
  var hw = document.getElementById('home-week'), H = CONFIG.home;
  if (hw && H && H.show && H.photo) {
    var esc = function(v){ return String(v).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
    var nf = function(n){ return Number(n).toLocaleString(lang === 'en' ? 'en-US' : 'es-US'); };
    var tag = H.tag && H.tag[lang];
    var stats = [H.beds && (H.beds + ' ' + t('beds')), H.baths && (H.baths + ' ' + t('baths')), H.sqft && (nf(H.sqft) + ' ' + t('sqft'))].filter(Boolean);
    var openTag = H.link ? '<a class="hw-photo" href="' + esc(H.link) + '" target="_blank" rel="noopener">' : '<div class="hw-photo">';
    var closeTag = H.link ? '</a>' : '</div>';
    var arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
    hw.querySelector('.hw-slot').innerHTML =
      '<div class="card hw">' +
        openTag +
          '<img src="' + esc(SITE_ROOT + H.photo) + '" width="960" height="720" loading="lazy" alt="' + esc(t('photoAlt') + [H.address, H.city].filter(Boolean).join(', ')) + '">' +
          (tag ? '<span class="tag">' + esc(tag) + '</span>' : '') +
          '<span class="hw-price">' +
            (H.priceNote && H.priceNote[lang] ? '<em>' + esc(H.priceNote[lang]) + '</em>' : '') +
            '<b>' + esc(H.price) + '</b><small>' + esc([H.address, H.city].filter(Boolean).join(' · ')) + '</small></span>' +
          (H.link ? '<span class="hw-go">' + esc(t('seeHome')) + arrow + '</span>' : '') +
        closeTag +
        '<div class="body">' +
          (stats.length ? '<ul class="hw-stats">' + stats.map(function(s){ return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' : '') +
          (H.courtesy ? '<p class="hw-courtesy">' + esc(H.courtesy) + '</p>' : '') +
          '<a class="btn btn-primary hw-btn" href="' + esc(CONFIG.listingsUrl || '#home-week') + '"' + (CONFIG.listingsUrl ? ' target="_blank" rel="noopener"' : '') + '>' +
            '<span>' + esc(t('myListings')) + '</span>' + arrow +
          '</a>' +
        '</div>' +
      '</div>';
    hw.hidden = false;
  }

  // Redes sociales: solo se muestran las que tengan URL
  var ICONS = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.7" fill="currentColor"/>',
    facebook: '<circle cx="12" cy="12" r="9.5"/><path d="M15 8h-1.6A2.4 2.4 0 0 0 11 10.4V21"/><path d="M8.5 13h6"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.3 4.5 5 4.8"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.5v5l4-2.5z" fill="currentColor"/>'
  };
  var NAMES = { instagram:'Instagram', facebook:'Facebook', tiktok:'TikTok', youtube:'YouTube' };
  var box = document.getElementById('socials');
  if (box) Object.keys(CONFIG.socials).forEach(function(k){
    var url = CONFIG.socials[k]; if (!url) return;
    var a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener me';
    a.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[k] + '</svg>' + NAMES[k];
    box.appendChild(a);
  });

  // Email
  var to = CONFIG.email, su = enc(t('mailSubject')), body = enc(t('mailBody'));
  var L = {
    gmail: 'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + su + '&body=' + body,
    outlook: 'https://outlook.live.com/mail/0/deeplink/compose?to=' + to + '&subject=' + su + '&body=' + body,
    yahoo: 'https://compose.mail.yahoo.com/?to=' + to + '&subject=' + su + '&body=' + body,
    app: 'mailto:' + to + '?subject=' + su + '&body=' + body,
    ios: 'googlegmail:///co?to=' + to + '&subject=' + su + '&body=' + body
  };
  var emailBtn = document.getElementById('email-btn');
  if (emailBtn) emailBtn.addEventListener('click', function(e){
    e.preventDefault();
    if (!to) return;
    if (isIOS) {
      var fb = setTimeout(function(){ if (!document.hidden) location.href = L.gmail; }, 1500);
      document.addEventListener('visibilitychange', function(){ if (document.hidden) clearTimeout(fb); }, { once:true });
      location.href = L.ios;
    } else if (isAndroid) { location.href = L.app; }
    else { window.open(L.gmail, '_blank', 'noopener'); }
  });

  var sheet = document.getElementById('email-sheet');
  var other = document.getElementById('other-mail');
  if (!other) return;
  if (!to || !sheet || typeof sheet.showModal !== 'function') { other.hidden = true; return; }
  sheet.querySelectorAll('[data-mail]').forEach(function(a){
    a.href = L[a.dataset.mail];
    a.addEventListener('click', function(){ sheet.close(); });
  });
  other.addEventListener('click', function(){ sheet.showModal(); });
  document.getElementById('close-email').addEventListener('click', function(){ sheet.close(); });
  sheet.addEventListener('click', function(e){ if (e.target === sheet) sheet.close(); });
  var copy = document.getElementById('copy-email');
  copy.addEventListener('click', function(){
    var label = copy.querySelector('span');
    var done = function(){ label.textContent = t('copied'); setTimeout(function(){ label.textContent = t('copy'); }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(to).then(done, function(){ label.textContent = to; });
    else label.textContent = to;
  });
})();
