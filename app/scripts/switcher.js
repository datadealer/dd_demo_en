function LanguageSwitcher(selector, cookieName) {
  if (!jQuery || !jQuery.cookie) {
    throw Error('LanguageSwitcher requires jQuery and jQuery.cookie');
  }

  this.set = function activate() {
    var locale = $.cookie(cookieName);
    //console.log('current cookie value:', locale);

    if (!locale) {
      var locale = navigator.language || navigator.browserLanguage; // userLanguage?
      if (locale) {
        locale = locale.substr(0, locale.indexOf('-')) || locale;
        setLocaleCookie(locale);
      }
    }

    var element = $('a[class="' + locale + '"]', selector);
    var href = element.attr('href');
    if (!href) {
      console.error('Missing href for locale “%s”', locale);
      return false;
    }

    //console.log('switch:', href, location.pathname);
    if (href !== location.pathname) {
      //console.warn('replace:', href);
      location.replace(href);
      return true;
    }

    return false;
  }

  $('a', selector).on('click', function(event) {
    setLocaleCookie($(this).attr('class'));
  }).filter(function() {
    var href = $(this).attr('href');
    if (href === location.pathname) {
      $(this).hide();
    }
  });

  function escapeAttribute(attr) {
    var re = new RegExp('([!"#$%&\'()*+,./:;<=>?@\[\\\]^``{|}~])', 'g');
    return String(attr).replace(re, '\\$1');
  }

  function setLocaleCookie(locale) {
    //console.log('new cookie value:', locale);
    $.cookie(cookieName, locale, {path: '/'});
  }

  return this;
}
