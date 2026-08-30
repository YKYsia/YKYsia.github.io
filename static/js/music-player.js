(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('aplayer');
    const libraryNode = document.getElementById('music-library');
    const shell = document.querySelector('.music-player-shell');
    if (!container || !libraryNode || !shell || typeof APlayer === 'undefined') return;

    const tracks = JSON.parse(libraryNode.textContent);
    if (!Array.isArray(tracks) || tracks.length === 0) return;

    const player = new APlayer({
      container,
      audio: tracks,
      autoplay: false,
      mutex: true,
      preload: 'metadata',
      theme: '#8c79cf',
      loop: 'all',
      order: 'list',
      volume: 0.7,
      lrcType: 3,
      listFolded: false,
      listMaxHeight: 430,
      storageName: 'ykysia-music-player'
    });

    const currentAlbum = document.createElement('div');
    currentAlbum.className = 'aplayer-current-album';
    container.querySelector('.aplayer-music')?.appendChild(currentAlbum);

    const language = () => document.documentElement.dataset.language === 'en' ? 'en' : 'zh';
    const albumLabel = () => language() === 'en' ? 'Album' : '专辑';

    const decoratePlaylist = () => {
      container.querySelectorAll('.aplayer-list li').forEach((item, index) => {
        let album = item.querySelector('.aplayer-list-album');
        if (!album) {
          album = document.createElement('span');
          album.className = 'aplayer-list-album';
          item.appendChild(album);
        }
        album.textContent = `${albumLabel()}: ${tracks[index]?.album || '—'}`;
      });
    };

    const updateTrackDetails = () => {
      const index = player.list.index || 0;
      const track = tracks[index] || tracks[0];
      currentAlbum.textContent = `${albumLabel()}: ${track.album || '—'}`;
      decoratePlaylist();

      if ('mediaSession' in navigator && 'MediaMetadata' in window) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.name,
          artist: track.artist,
          album: track.album,
          artwork: [{ src: track.cover, sizes: '512x512', type: 'image/jpeg' }]
        });
      }
    };

    player.on('play', () => shell.classList.add('is-playing'));
    player.on('pause', () => shell.classList.remove('is-playing'));
    player.on('ended', () => shell.classList.remove('is-playing'));
    player.on('listswitch', updateTrackDetails);
    player.on('error', () => player.notice(language() === 'en' ? 'This track could not be loaded.' : '这首歌暂时无法加载。'));
    window.addEventListener('site-language-change', updateTrackDetails);

    requestAnimationFrame(() => {
      decoratePlaylist();
      updateTrackDetails();
    });
  });
})();
