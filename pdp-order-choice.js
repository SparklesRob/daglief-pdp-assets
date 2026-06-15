(function () {
  var allowedPath = '/zelf-maken/blanco/test-kaartje-rob';

  function isAllowedPage() {
    return window.location.hostname === 'daglief.nl' && window.location.pathname === allowedPath;
  }

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  ready(function () {
    if (!isAllowedPage()) return;

    var form = document.querySelector('.choose-card-container form.choose-card-form') || document.querySelector('form.choose-card-form#choose_card_form');
    var chooseCard = document.querySelector('.choose-card');
    if (!form || !chooseCard) return;
    if (document.querySelector('.dl-order-choice')) return;

    document.body.classList.add('dl-order-choice-active');

    var originalAction = form.getAttribute('action') || '/choose_card';
    var submitButton = form.querySelector('.choose-card-btn');
    var submitLabel = submitButton ? submitButton.querySelector('span') : null;
    var targetUrlInput = form.querySelector('#target_url');
    var selectedInput = document.createElement('input');
    selectedInput.type = 'hidden';
    selectedInput.name = 'daglief_order_choice';
    selectedInput.value = 'physical';
    form.appendChild(selectedInput);

    var digitalVariantInput = document.createElement('input');
    digitalVariantInput.type = 'hidden';
    digitalVariantInput.name = 'daglief_digital_variant';
    digitalVariantInput.value = '1882';
    form.appendChild(digitalVariantInput);

    var digitalVariants = [
      {
        id: '1882',
        productType: 'modern_freeform',
        label: 'Digitaal bestand mobiel 6 pagina’s',
        href: '/cardtype_submit/modern_freeform/1882',
        pageCount: 6
      },
      {
        id: '1881',
        productType: 'modern_freeform',
        label: 'Digitaal bestand mobiel 4 pagina’s',
        href: '/cardtype_submit/modern_freeform/1881',
        pageCount: 4
      }
    ];

    var choices = [
      {
        id: 'physical',
        label: 'Fysieke rouwkaart',
        eyebrow: 'Gedrukt en verzonden',
        description: 'Laat je kaart drukken en kies daarna zelf de gewenste verzendmethode.',
        price: 'Reguliere kaartprijzen',
        imageUrl: '/media/13304-kc-media/digitale-kaart-icons-fysieke-kaart.webp',
        icon: 'fa-regular fa-envelope',
        buttonText: 'Bewerken'
      },
      {
        id: 'digital',
        label: 'Digitale kaart',
        eyebrow: 'PDF, scrollbaar',
        description: 'Compacte digitale kaart, geoptimaliseerd voor mobiel delen met de belangrijkste informatie in één overzicht.',
        price: 'Vanaf € 39',
        imageUrl: '/media/13304-kc-media/digitale-kaart-icons-digitale-kaart.webp',
        icon: 'fa-regular fa-file-pdf',
        buttonText: 'Digitale kaart bewerken'
      },
      {
        id: 'physical_digital',
        label: 'Digitale kaart icm fysieke kaart',
        eyebrow: 'Fysieke kaart + PDF, scrollbaar',
        description: 'Meer ruimte voor tekst, beeld en sfeer, opgebouwd uit meerdere momenten.',
        price: '+ € 19,95',
        imageUrl: '/media/13304-kc-media/digitale-kaart-icons-fysieke-en-digitale-kaart.webp',
        icon: 'fa-regular fa-copy',
        buttonText: 'Bewerken en kaart samenstellen'
      },
      {
        id: 'print_file',
        label: 'Drukbestand',
        eyebrow: 'Drukklare PDF',
        description: 'Meer ruimte voor persoonlijke elementen, foto’s en herinneringen.',
        price: '€ 90',
        imageUrl: '/media/13304-kc-media/digitale-kaart-icons-drukbestand.webp',
        icon: 'fa-regular fa-file-lines',
        buttonText: 'Drukbestand aanvragen'
      }
    ];

    var section = document.createElement('section');
    section.className = 'dl-order-choice';
    section.setAttribute('aria-label', 'Hoe wil je je kaart bestellen?');
    var digitalOptionImage = '/media/13304-kc-media/digitale-kaart-icons-digitale-kaart.webp';
    section.innerHTML = [
      '<div class="dl-order-choice__primary"></div>',
      '<div class="dl-order-choice__form-slot"></div>',
      '<div class="dl-order-choice__header">',
      '  <div class="dl-order-choice__title-wrap">',
      '    <h2 class="dl-order-choice__title">Hoe wil je je kaart bestellen?</h2>',
      '    <button class="dl-order-choice__help" type="button" aria-expanded="false" aria-controls="dl-order-choice-info" aria-label="Meer uitleg over bestellen">',
      '      <i class="fa-regular fa-question"></i>',
      '    </button>',
      '  </div>',
      '</div>',
      '<div class="dl-order-choice__explanation" id="dl-order-choice-info">',
      '  Iedere situatie is anders. Daarom bieden we verschillende mogelijkheden om rouwkaarten te versturen.<br><br>',
      '  Wil je familie, vrienden en kennissen direct informeren? Dan kun je kiezen voor een <a href="https://daglief.nl/digitale-rouwkaart">digitale rouwkaart</a>. Deze ontvang je als PDF en deel je eenvoudig via WhatsApp of e-mail.<br><br>',
      '  Wil je er zeker van zijn dat de kaarten zo snel mogelijk bij de ontvangers aankomen? Kies dan voor onze <a href="https://daglief.nl/direct-verzenden">directe rouwverzending</a>. Wij versturen de rouwkaarten rechtstreeks naar de geadresseerden in een envelop naar keuze, voorzien van een officieel rouwzegel.<br><br>',
      '  Liever zelf de kaarten versturen? Dan kun je een pakket met gedrukte rouwkaarten bestellen. Zo bepaal je zelf wanneer en naar wie je de kaarten verstuurt.<br><br>',
      '  Veel families kiezen voor een combinatie van digitaal en gedrukt: digitaal om snel te informeren, en drukwerk als tastbare herinnering die vaak wordt bewaard en gekoesterd. Zo kies je eenvoudig de oplossing die het beste past bij jouw situatie, wensen en timing.',
      '</div>',
      '<div class="dl-order-choice__trigger-wrap">',
      '  <button class="dl-order-choice__open-options" type="button" aria-expanded="false" aria-controls="dl-order-choice-offcanvas">',
      '    <span class="dl-order-choice__open-visual"><img src="' + digitalOptionImage + '" alt=""></span>',
      '    <span class="dl-order-choice__open-content">',
      '      <span class="dl-order-choice__open-title">Digitale kaart of drukbestand nodig?</span>',
      '      <span class="dl-order-choice__open-text">Bekijk de aanvullende mogelijkheden</span>',
      '      <span class="dl-order-choice__open-selected" hidden></span>',
      '    </span>',
      '    <i class="fa-regular fa-chevron-right" aria-hidden="true"></i>',
      '  </button>',
      '</div>',
      '<div class="dl-order-choice__offcanvas-backdrop" data-dl-order-choice-close hidden></div>',
      '<aside class="dl-order-choice__offcanvas" id="dl-order-choice-offcanvas" role="dialog" tabindex="-1" aria-modal="true" aria-hidden="true" aria-labelledby="dl-order-choice-offcanvas-title">',
      '  <div class="dl-order-choice__offcanvas-header">',
      '    <div class="dl-order-choice__offcanvas-title-row">',
      '      <p class="dl-order-choice__offcanvas-title" id="dl-order-choice-offcanvas-title">Kies je besteloptie</p>',
      '      <button class="dl-order-choice__offcanvas-close" type="button" aria-label="Sluiten" data-dl-order-choice-close></button>',
      '    </div>',
      '    <p class="dl-order-choice__offcanvas-selected">Geselecteerd: <span id="dl-order-choice-selected-label">Fysieke rouwkaart</span></p>',
      '  </div>',
      '  <div class="dl-order-choice__offcanvas-body">',
      '    <div class="dl-order-choice__grid"></div>',
      '  </div>',
      '  <div class="dl-order-choice__offcanvas-confirm">',
      '    <div class="dl-order-choice__offcanvas-form-slot">Kies een optie om verder te gaan.</div>',
      '  </div>',
      '</aside>'
    ].join('');

    function createChoiceCard(choice) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'dl-order-choice__card';
      card.dataset.choice = choice.id;
      card.setAttribute('aria-pressed', choice.id === 'physical' ? 'true' : 'false');
      var visual = choice.imageUrl
        ? '<span class="dl-order-choice__visual"><img src="' + choice.imageUrl + '" alt=""></span>'
        : '<span class="dl-order-choice__visual"><i class="' + choice.icon + '"></i></span>';
      card.innerHTML = [
        visual,
        '<span class="dl-order-choice__content">',
        '  <span class="dl-order-choice__row">',
        '    <span class="dl-order-choice__heading">',
        '      <span class="dl-order-choice__name">' + choice.label + '</span>',
        '      <span class="dl-order-choice__eyebrow">' + choice.eyebrow + '</span>',
        '    </span>',
        '    <span class="dl-order-choice__price">' + choice.price + '</span>',
        '  </span>',
        '  <span class="dl-order-choice__text">' + choice.description + '</span>',
        '</span>'
      ].join('');
      return card;
    }

    function createDigitalVariantPicker() {
      var picker = document.createElement('fieldset');
      picker.className = 'dl-order-choice__digital-variants';
      picker.innerHTML = [
        '<legend class="dl-order-choice__digital-variants-title">Kies het digitale bestand</legend>',
        '<div class="dl-order-choice__digital-variants-list"></div>'
      ].join('');

      var list = picker.querySelector('.dl-order-choice__digital-variants-list');
      digitalVariants.forEach(function (variant, index) {
        var label = document.createElement('label');
        label.className = 'dl-order-choice__digital-variant' + (index === 0 ? ' is-selected' : '');
        label.innerHTML = [
          '<input type="radio" name="dl_digital_variant_choice" value="' + variant.id + '"' + (index === 0 ? ' checked' : '') + '>',
          '<span>' + variant.label + '</span>'
        ].join('');
        list.appendChild(label);
      });

      picker.addEventListener('change', function (event) {
        if (event.target.name === 'dl_digital_variant_choice') {
          digitalVariantInput.value = event.target.value;
          picker.querySelectorAll('.dl-order-choice__digital-variant').forEach(function (item) {
            item.classList.toggle('is-selected', item.contains(event.target));
          });
        }
      });

      return picker;
    }

    var primary = section.querySelector('.dl-order-choice__primary');
    var formSlot = section.querySelector('.dl-order-choice__form-slot');
    var grid = section.querySelector('.dl-order-choice__grid');
    var openOptionsButton = section.querySelector('.dl-order-choice__open-options');
    var openSelected = section.querySelector('.dl-order-choice__open-selected');
    var offcanvas = section.querySelector('.dl-order-choice__offcanvas');
    var offcanvasBackdrop = section.querySelector('.dl-order-choice__offcanvas-backdrop');
    var offcanvasSelectedLabel = section.querySelector('#dl-order-choice-selected-label');
    var offcanvasFormSlot = section.querySelector('.dl-order-choice__offcanvas-form-slot');
    var digitalVariantPicker = createDigitalVariantPicker();
    choices.forEach(function (choice) {
      var card = createChoiceCard(choice);
      if (choice.id === 'physical') {
        primary.appendChild(card);
      } else {
        grid.appendChild(card);
      }
    });

    chooseCard.parentNode.insertBefore(section, chooseCard);
    formSlot.appendChild(chooseCard);

    var notice = document.createElement('div');
    notice.className = 'dl-order-choice__notice';
    notice.setAttribute('role', 'status');
    notice.hidden = true;
    section.appendChild(notice);

    var helpButton = section.querySelector('.dl-order-choice__help');
    var explanation = section.querySelector('.dl-order-choice__explanation');
    helpButton.addEventListener('click', function () {
      var isOpen = explanation.classList.toggle('is-visible');
      helpButton.setAttribute('aria-expanded', String(isOpen));
    });

    function openOffcanvas() {
      offcanvas.classList.add('is-open');
      offcanvasBackdrop.hidden = false;
      offcanvas.setAttribute('aria-hidden', 'false');
      openOptionsButton.setAttribute('aria-expanded', 'true');
      document.body.classList.add('dl-order-choice-offcanvas-open');
      offcanvas.focus();
    }

    function closeOffcanvas() {
      offcanvas.classList.remove('is-open');
      offcanvasBackdrop.hidden = true;
      offcanvas.setAttribute('aria-hidden', 'true');
      openOptionsButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('dl-order-choice-offcanvas-open');
    }

    openOptionsButton.addEventListener('click', openOffcanvas);
    section.querySelectorAll('[data-dl-order-choice-close]').forEach(function (button) {
      button.addEventListener('click', closeOffcanvas);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && offcanvas.classList.contains('is-open')) {
        closeOffcanvas();
      }
    });

    function setNotice(choiceId) {
      if (choiceId === 'physical_digital') {
        notice.hidden = false;
        notice.innerHTML = '<span class="dl-order-choice__notice-title">Digitale versie toevoegen</span>Ontwerp eerst je fysieke kaart. Tijdens het samenstellen van je kaart kun je daarna kiezen voor <strong>digitale versie</strong>. Zo bestel je de digitale variant voor €19,95 naast je fysieke kaarten.';
        return;
      }

      if (choiceId === 'digital') {
        notice.hidden = false;
        notice.innerHTML = '<span class="dl-order-choice__notice-title">Digitaal bestand mobiel maken</span>Kies hieronder of je een mobiel digitaal bestand met 4 of 6 pagina’s wilt maken. Daarna openen we je kaart in de editor met het gekozen digitale formaat.';
        return;
      }

      if (choiceId === 'print_file') {
        notice.hidden = false;
        notice.innerHTML = '<span class="dl-order-choice__notice-title">Drukbestand aanvragen</span>Wil je de kaart zelf laten drukken? Dan koop je het design af voor €90. Ons rouwteam helpt je met het juiste bestand voor de drukker.<br><a class="dl-order-choice__contact-link" href="/contact">Neem contact op met Daglief</a>';
        return;
      }

      notice.hidden = true;
      notice.innerHTML = '';
    }

    function updateForm(choiceId) {
      var choice = choices.find(function (item) { return item.id === choiceId; }) || choices[0];
      selectedInput.value = choice.id;

      form.querySelectorAll('.dl-order-choice-value').forEach(function (input) {
        input.remove();
      });

      var choiceValue = document.createElement('input');
      choiceValue.type = 'hidden';
      choiceValue.className = 'dl-order-choice-value';
      choiceValue.name = 'digital_order_type';
      choiceValue.value = choice.id;
      form.appendChild(choiceValue);

      if (submitLabel) submitLabel.textContent = choice.buttonText + ' ';
      if (offcanvasSelectedLabel) offcanvasSelectedLabel.textContent = choice.label;

      if (choice.id === 'physical') {
        openSelected.hidden = true;
        openSelected.textContent = '';
        formSlot.appendChild(chooseCard);
        section.appendChild(notice);
      } else {
        openSelected.hidden = false;
        openSelected.textContent = 'Gekozen: ' + choice.label;
        offcanvasFormSlot.textContent = '';
        if (choice.id === 'digital') {
          offcanvasFormSlot.appendChild(digitalVariantPicker);
        }
        offcanvasFormSlot.appendChild(chooseCard);
        offcanvasFormSlot.parentNode.insertBefore(notice, offcanvasFormSlot);
      }

      if (choice.id === 'physical' || choice.id === 'physical_digital' || choice.id === 'digital') {
        form.setAttribute('action', originalAction);
        if (targetUrlInput) targetUrlInput.value = 'edit';
      } else {
        form.setAttribute('action', '/contact');
        if (targetUrlInput) targetUrlInput.value = 'contact';
      }

      setNotice(choice.id);
    }

    function getDesignId() {
      var designInput = form.querySelector('#design_id') || form.querySelector('[name="design_id"]');
      if (designInput && designInput.value) return designInput.value;
      var pathParts = window.location.pathname.split('/').filter(Boolean);
      return pathParts[pathParts.length - 1];
    }

    function objectLength(object) {
      var length = 0;
      Object.keys(object || {}).forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(object, key)) length += 1;
      });
      return length;
    }

    function getSelectedDigitalVariant() {
      return digitalVariants.find(function (variant) {
        return variant.id === digitalVariantInput.value;
      }) || digitalVariants[0];
    }

    function createDigitalPreset(variant) {
      var sheets = [];
      var pageCount = variant.pageCount || 4;

      for (var index = 0; index < pageCount; index += 1) {
        var pageNumber = index + 1;
        sheets.push({
          bleed_canvas: 0,
          height_canvas: 677.33,
          is_front: pageNumber === 1 || pageNumber >= 4,
          spreads: [[{
            bleed_bottom: 0,
            bleed_left: 0,
            bleed_right: 0,
            bleed_top: 0,
            foil_enabled: false,
            height: 677.33,
            is_hidden: false,
            name: 'Pagina ' + pageNumber,
            page: 'p' + pageNumber,
            rotation: 0,
            spot_uv_enabled: false,
            width: 381,
            x: 0,
            y: 0
          }]],
          width_canvas: 381
        });
      }

      return {
        fold: 'none',
        name: variant.label,
        specs: {
          freeform_template_id: Number(variant.id),
          scale_width: 381,
          sheets: sheets
        }
      };
    }

    function fetchDesign(designId) {
      return fetch('/choose_card/' + encodeURIComponent(designId) + '?target_url=edit', { credentials: 'same-origin' })
        .then(function (response) {
          if (!response.ok) throw new Error('Kon de kaart niet openen voor bewerken.');
          var coid = new URL(response.url).searchParams.get('coid');
          if (!coid) throw new Error('Geen coid gevonden voor deze kaart.');
          return fetch('/api/design?coid=' + encodeURIComponent(coid), { credentials: 'same-origin' })
            .then(function (designResponse) {
              if (!designResponse.ok) throw new Error('Kon het design niet ophalen.');
              return designResponse.json();
            })
            .then(function (fullDesignJson) {
              var designPages = fullDesignJson.designs && fullDesignJson.designs[0]
                ? fullDesignJson.designs[0].pages
                : fullDesignJson.pages;
              if (!designPages) throw new Error('Geen designpagina’s gevonden.');
              return { pages: designPages, coid: coid };
            });
        });
    }

    function getPresetPages(preset) {
      if (preset.pages && preset.pages.length) return preset.pages;

      if (!preset.specs || !preset.specs.sheets) return [];

      return preset.specs.sheets.map(function (sheet) {
        var spread = sheet.spreads && sheet.spreads[0]
          ? sheet.spreads[0].find(function (item) { return !item.is_hidden; }) || sheet.spreads[0][0]
          : null;

        return {
          bleed: sheet.bleed_canvas || 0,
          height: spread ? spread.height : sheet.height_canvas,
          width: spread ? spread.width : sheet.width_canvas
        };
      });
    }

    function buildConvertPayload(designPages, preset) {
      var presetPages = getPresetPages(preset);
      var oldSize = objectLength(designPages) - 1;
      var aspectRatioTarget = presetPages[0].height / presetPages[0].width;
      var aspectRatioDesign = designPages.p1.h / designPages.p1.w;
      var scale = aspectRatioDesign > aspectRatioTarget ? 'height' : 'width';
      var pages;

      if (oldSize === 2 && presetPages.length === 4) {
        pages = presetPages.map(function (page, index) {
          var oldKey = index + 1;
          if (index === 1) oldKey = 0;
          if (index === 2) oldKey = 2;
          if (index !== 1 && index !== 2 && index + 1 > oldSize) oldKey = 0;
          return Object.assign({ old_key: oldKey, new_key: index + 1 }, page, { scale: scale });
        });
      } else if (oldSize === 4 && presetPages.length === 2) {
        pages = presetPages.map(function (page, index) {
          var oldKey = index === 0 ? 1 : 3;
          return Object.assign({ old_key: oldKey, new_key: index + 1 }, page, { scale: scale });
        });
      } else {
        pages = presetPages.map(function (page, index) {
          return Object.assign({
            old_key: index + 1 > oldSize ? 0 : index + 1,
            new_key: index + 1
          }, page, { scale: scale });
        });
      }

      return {
        fold: preset.fold,
        new_pages: pages,
        source_design_json: designPages
      };
    }

    function openDigitalEditor() {
      var designId = getDesignId();
      var variant = getSelectedDigitalVariant();
      var originalSubmitText = submitLabel ? submitLabel.textContent : '';

      if (submitButton) submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Design omzetten... ';
      notice.hidden = false;
      notice.innerHTML = '<span class="dl-order-choice__notice-title">Design omzetten</span>We zetten je kaart om naar <strong>' + variant.label + '</strong> en openen daarna de editor.';

      return fetchDesign(designId)
        .then(function (design) {
          var preset = createDigitalPreset(variant);
          var convertPayload = buildConvertPayload(design.pages, preset);
          var convertParams = new URLSearchParams();
          convertParams.set('coid', design.coid);
          convertParams.set('fold', convertPayload.fold);
          convertParams.set('new_pages', JSON.stringify(convertPayload.new_pages));
          convertParams.set('source_design_json', JSON.stringify(convertPayload.source_design_json));

          return fetch('/convert_editor_design?' + convertParams.toString(), {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              Accept: 'application/json'
            }
          }).then(function (response) {
            if (!response.ok) throw new Error('Het omzetten naar digitaal formaat is niet gelukt.');
            return response.json().then(function () {
              window.location.href = '/create/edit/v2/?coid=' + encodeURIComponent(design.coid) + '&add_to_basket=false&update_basket=true';
            });
          });
        })
        .catch(function (error) {
          if (submitButton) submitButton.disabled = false;
          if (submitLabel) submitLabel.textContent = originalSubmitText;
          notice.hidden = false;
          notice.innerHTML = '<span class="dl-order-choice__notice-title">Omzetten niet gelukt</span>' + error.message + '<br><a class="dl-order-choice__contact-link" href="' + variant.href + '">Open dit digitale formaat handmatig</a>';
        });
    }

    section.addEventListener('click', function (event) {
      var card = event.target.closest('.dl-order-choice__card');
      if (!card) return;

      section.querySelectorAll('.dl-order-choice__card').forEach(function (item) {
        item.classList.toggle('is-selected', item === card);
        item.setAttribute('aria-pressed', String(item === card));
      });

      updateForm(card.dataset.choice);
    });

    form.addEventListener('submit', function (event) {
      var choiceId = selectedInput.value;
      if (choiceId === 'physical' || choiceId === 'physical_digital') return;

      if (choiceId === 'digital') {
        event.preventDefault();
        openDigitalEditor();
        return;
      }

      event.preventDefault();
      setNotice(choiceId);
      notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    if (submitButton) {
      submitButton.addEventListener('click', function (event) {
        if (selectedInput.value !== 'digital') return;

        event.preventDefault();
        openDigitalEditor();
      });
    }

    section.querySelector('[data-choice="physical"]').classList.add('is-selected');
    updateForm('physical');
  });
})();
