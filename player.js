async function loadData(){
  try{
    let res = await fetch('/p/data.html');
    let text = await res.text();

    let parser = new DOMParser();
    let doc = parser.parseFromString(text, 'text/html');

    let pre = doc.querySelector('pre');

    if(!pre){
      console.error("Không tìm thấy DATA trong data.html");
      return;
    }

    window.DATA = JSON.parse(pre.textContent.trim());
  }catch(e){
    console.error("Lỗi load DATA:", e);
  }
}

function getParams(){
  let params = new URLSearchParams(location.search);
  return {
    slug: params.get('slug'),
    ep: params.get('ep')
  }
}

function render(){
  let {slug, ep} = getParams();

  if(!slug || !ep){
    document.body.innerHTML = "<h2>Thiếu slug hoặc ep</h2>";
    return;
  }

  if(!window.DATA || !DATA[slug]){
    document.body.innerHTML = "<h2>Không tìm thấy phim</h2>";
    return;
  }

  let film = DATA[slug];
  let episode = film.episodes[ep];

  if(!episode){
    document.body.innerHTML = "<h2>Không tìm thấy tập</h2>";
    return;
  }

  // Clear trang
  document.body.innerHTML = "";

  // ===== TITLE =====
  let title = document.createElement('h2');
  title.textContent = film.title + " - " + episode.name;
  document.body.appendChild(title);

  // ===== PLAYER =====
  let player = document.createElement('div');

  let iframe = document.createElement('iframe');
  iframe.src = episode.server1;
  iframe.width = "100%";
  iframe.height = "500";
  iframe.allowFullscreen = true;

  player.appendChild(iframe);
  document.body.appendChild(player);

  // ===== SERVER BUTTON (optional) =====
  if(episode.server2){
    let btn = document.createElement('button');
    btn.textContent = "Chuyển Server 2";

    btn.onclick = function(){
      iframe.src = episode.server2;
    };

    document.body.appendChild(btn);
  }

  // ===== EPISODES LIST =====
  let list = document.createElement('div');
  list.style.marginTop = "20px";

  Object.keys(film.episodes).forEach(function(e){
    let a = document.createElement('a');

    let params = new URLSearchParams({
      slug: slug,
      ep: e
    });

    a.href = '/p/watch.html?' + params.toString();
    a.textContent = film.episodes[e].name;

    a.style.marginRight = "10px";
    a.style.display = "inline-block";

    list.appendChild(a);
  });

  document.body.appendChild(list);
}

window.addEventListener('DOMContentLoaded', async function(){
  await loadData();
  render();
});
