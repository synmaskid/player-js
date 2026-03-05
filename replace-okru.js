(function () {

    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(function (iframe) {

        if (!iframe.src) return;

        if (iframe.src.includes("ok.ru")) {

            var match = iframe.src.match(/ok\.ru\/.*?(\d{8,})/i);

            if (match) {

                iframe.src = "https://ssplay.net/ok/" + match[1];

            }

        }

    });

})();