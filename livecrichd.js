document.addEventListener('DOMContentLoaded', function () {
  const shakaPlayerContainer = document.createElement('div');
  shakaPlayerContainer.setAttribute('data-shaka-player-container', '');
  shakaPlayerContainer.style.width = '100%';
  shakaPlayerContainer.style.height = '100%';
  shakaPlayerContainer.style.cursor = 'none';
  shakaPlayerContainer.className = 'shaka-mobile shaka-video-container';
  shakaPlayerContainer.setAttribute('shaka-controls', 'true');

  const shakaVideo = document.createElement('video');
  shakaVideo.poster = 'https://linear-poster.astro.com.my/prod/poster/ivp_default_1009_IVP_LAND_586x330.jpg';
  shakaVideo.autoplay = true;
  shakaVideo.setAttribute('data-shaka-player', '');
  shakaVideo.id = 'video';
  shakaVideo.style.width = '100%';
  shakaVideo.style.height = '100%';
  shakaVideo.style.objectFit = 'fill'; // Set object-fit to 'contain' for fit
  shakaVideo.className = 'shaka-video';

  shakaPlayerContainer.appendChild(shakaVideo);

  const centerElement = document.createElement('center');
  centerElement.appendChild(shakaPlayerContainer);

  document.body.appendChild(centerElement);

  const telegramDiv = document.createElement('div');
  telegramDiv.style.backgroundColor = '#0074d9';
  telegramDiv.style.textAlign = 'center';
  telegramDiv.style.padding = '10px';

  const telegramLink = document.createElement('a');
  telegramLink.href = 'https://telegram.me/livecrichdd';
  telegramLink.target = '_blank';

  const joinTelegramButton = document.createElement('button');
  joinTelegramButton.id = 'joinTelegramButton';
  joinTelegramButton.style.backgroundColor = '#fff';
  joinTelegramButton.style.color = '#0074d9';
  joinTelegramButton.style.border = '2px solid #0074d9';
  joinTelegramButton.style.padding = '5px 10px';
  joinTelegramButton.textContent = 'Join Telegram';

  telegramLink.appendChild(joinTelegramButton);
  telegramDiv.appendChild(telegramLink);

  document.body.appendChild(telegramDiv);

  // Add the meta tag dynamically
  const metaTag = document.createElement('meta');
  metaTag.setAttribute('http-equiv', 'Content-Security-Policy');
  metaTag.setAttribute('content', "frame-ancestors 'none';");
  document.head.appendChild(metaTag);

  // Add the Shaka Player UI script dynamically
  const shakaUIScript = document.createElement('script');
  shakaUIScript.src = "https://cdn.jsdelivr.net/npm/shaka-player/dist/shaka-player.ui.min.js";
  document.head.appendChild(shakaUIScript);

  // Add the user-select style
  const userSelectStyle = document.createElement('style');
  userSelectStyle.type = 'text/css';
  userSelectStyle.textContent = '* {user-select: auto !important; -webkit-user-select: auto !important;}';
  document.head.appendChild(userSelectStyle);

  // Add the Shaka Player controls stylesheet dynamically
  const shakaControlsStylesheet = document.createElement('link');
  shakaControlsStylesheet.href = "https://cdn.jsdelivr.net/npm/shaka-player/dist/controls.min.css";
  shakaControlsStylesheet.rel = "stylesheet";
  document.head.appendChild(shakaControlsStylesheet);

  // Continue with the rest of your script content

  if (confirm("Join Our Telegram Channel @livecrichdd For More Links")) { window.location.href = "https://telegram.me/livecrichdd" }

  const manifestUri = "https://linear007-gb-dash1-prd-cf.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(skysportscricket)/manifest_720-120.mpd"; // Update with your manifest URI
  const drmConfig = {
      "drm": {
          "clearKeys": {
              '00056d5c8882917a4463d5b42ba86c31':'226c39dd7d41b6f0e27cb7d8940f644f'
              // Add your clear key configuration here
          }
      }
  };

  async function init() {
      const video = document.getElementById('video');
      const ui = video['ui'];
      const controls = ui.getControls();
      const player = controls.getPlayer();
      window.player = player;
      window.ui = ui;
      player.configure(drmConfig); // Apply DRM configuration

      player.addEventListener('error', onPlayerErrorEvent);
      controls.addEventListener('error', onUIErrorEvent);

      try {
          await player.load(manifestUri);
          console.log('The video has now been loaded!');
      } catch (error) {
          onPlayerError(error);
      }
  }

  function onPlayerErrorEvent(errorEvent) {
      onPlayerError(event.detail);
  }

  function onPlayerError(error) {
      console.error('Error code', error.code, 'object', error);
  }

  function onUIErrorEvent(errorEvent) {
      onPlayerError(event.detail);
  }

  function initFailed(errorEvent) {
      console.error('Unable to load the UI library!');
  }

  document.addEventListener('shaka-ui-loaded', init);
  document.addEventListener('shaka-ui-load-failed', initFailed);
});
      
