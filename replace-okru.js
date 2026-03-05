(function () {

    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(function (iframe) {

        if (!iframe.src) return;

        if (iframe.src.match(/ok\.ru/i)) {

            // lấy ID video từ mọi dạng link
            var match = iframe.src.match(/ok\.ru\/(?:video|videoembed|video\/editor)\/(\d+)/i);

            if (match && match[1]) {

                iframe.src = "https://ssplay.net/ok/" + match[1];

            }

        }

    });

})();
