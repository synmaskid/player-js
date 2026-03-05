(function () {

function replaceOkru(iframe){

    if (!iframe.src) return;

    if (iframe.src.includes("ok.ru")) {

        var match = iframe.src.match(/ok\.ru\/.*?(\d{8,})/i);

        if (match) {

            iframe.src = "https://ssplay.net/ok/" + match[1];

        }

    }

}

/* chạy khi trang load */
document.querySelectorAll("iframe").forEach(replaceOkru);

/* theo dõi iframe mới được tạo */
const observer = new MutationObserver(function(mutations){

    mutations.forEach(function(mutation){

        mutation.addedNodes.forEach(function(node){

            if(node.tagName === "IFRAME"){
                replaceOkru(node);
            }

            if(node.querySelectorAll){
                node.querySelectorAll("iframe").forEach(replaceOkru);
            }

        });

    });

});

observer.observe(document.body,{
    childList:true,
    subtree:true
});

})();
