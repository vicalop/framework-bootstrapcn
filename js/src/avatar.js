// Avatar: mostly CSS. This just reveals the initials fallback when the image
// is missing or fails to load.
export function initAvatars(root) {
  (root || document).querySelectorAll('.bootcn-avatar > img').forEach((img) => {
    const fail = () => img.classList.add('is-hidden');
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail);
    img.addEventListener('load', () => {
      if (img.naturalWidth === 0) fail();
    });
  });
}
