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
    var chooseCardContainer = document.querySelector('.choose-card-container') || chooseCard || form;

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
        buttonText: 'Digitale kaart aanvragen'
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
      '<div class="dl-order-choice__primary"></div>',
      '<div class="dl-order-choice__form-slot"></div>',
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
      '    <button class="dl-order-choice__confirm" type="button"><i class="fa-solid fa-check" aria-hidden="true"></i> Toepassen</button>',
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

    var primary = section.querySelector('.dl-order-choice__primary');
    var formSlot = section.querySelector('.dl-order-choice__form-slot');
    var grid = section.querySelector('.dl-order-choice__grid');
    var openOptionsButton = section.querySelector('.dl-order-choice__open-options');
    var openSelected = section.querySelector('.dl-order-choice__open-selected');
    var offcanvas = section.querySelector('.dl-order-choice__offcanvas');
    var offcanvasBackdrop = section.querySelector('.dl-order-choice__offcanvas-backdrop');
    var offcanvasSelectedLabel = section.querySelector('#dl-order-choice-selected-label');
    var confirmButton = section.querySelector('.dl-order-choice__confirm');
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
    confirmButton.addEventListener('click', closeOffcanvas);
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
        notice.innerHTML = '<span class="dl-order-choice__notice-title">Digitale kaart aanvragen</span>Deze optie loopt nu nog via ons rouwteam. Kies je voor een digitale kaart, dan helpen we je met de juiste variant: 2 pagina\'s voor €39, 4-6 pagina\'s voor €59 of 8 pagina\'s voor €79.<br><a class="dl-order-choice__contact-link" href="/contact">Neem contact op met Daglief</a>';
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
      } else {
        openSelected.hidden = false;
        openSelected.textContent = 'Gekozen: ' + choice.label;
      }

      if (choice.id === 'physical' || choice.id === 'physical_digital') {
        form.setAttribute('action', originalAction);
        if (targetUrlInput) targetUrlInput.value = 'edit';
      } else {
        form.setAttribute('action', '/contact');
        if (targetUrlInput) targetUrlInput.value = 'contact';
      }

      setNotice(choice.id);
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

      event.preventDefault();
      setNotice(choiceId);
      notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    section.querySelector('[data-choice="physical"]').classList.add('is-selected');
    updateForm('physical');
  });
})();
