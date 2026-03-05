(function () {
    const iframes = document.querySelectorAll('iframe');

    iframes?.forEach(iframe => {

        if (iframe.src?.indexOf('ok.ru') > -1) {

            iframe.src = iframe.src
                .replace('ok.ru/videoembed/', 'ssplay.net/ok/')
                .replace('ok.ru/video/', 'ssplay.net/ok/')
                .replace('ok.ru/video/editor/', 'ssplay.net/ok/');

        }

    });

})();
