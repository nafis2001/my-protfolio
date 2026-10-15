const $ = <T extends Element>(s: string) => document.querySelector<T>(s)!;
const svg = $<SVGSVGElement>('#composition'),
  phrase = $<HTMLTextAreaElement>('#phrase'),
  scale = $<HTMLInputElement>('#scale'),
  palette = $<HTMLSelectElement>('#palette'),
  mode = $<HTMLSelectElement>('#mode'),
  preset = $<HTMLSelectElement>('#preset');
const palettes: Record<string, string[]> = {
  blue: ['#2457FF', '#F7F7F2', '#FFE29A'],
  paper: ['#F7F7F2', '#2457FF', '#111827'],
  ink: ['#111827', '#DDE9FF', '#2457FF'],
  ice: ['#DDE9FF', '#111827', '#2457FF'],
};
let x = 560,
  y = 730;
const symbol = $<SVGGElement>('#symbol');
function position() {
  symbol.setAttribute('transform', `translate(${x} ${y})`);
}
function render() {
  const [bg, fg, accent] = palettes[palette.value];
  $('#poster-bg').setAttribute('fill', bg);
  svg.querySelectorAll(':scope > text').forEach((t) => t.setAttribute('fill', fg));
  symbol.querySelector('circle')!.setAttribute('fill', accent);
  symbol.querySelector('path')!.setAttribute('stroke', bg);
  const group = $<SVGGElement>('#type-group');
  group.replaceChildren();
  group.setAttribute('fill', fg);
  const tokens = (phrase.value.trim() || 'YOUR WORDS HERE').split(/\s+/);
  const words = tokens.length > 8 ? [...tokens.slice(0, 7), tokens.slice(7).join(' ')] : tokens;
  const size = Number(scale.value);
  $('#scale-value').textContent = String(size);
  const lineStep = Math.min(size * 1.08, 570 / words.length);
  words.forEach((word, i) => {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const offset = mode.value === 'offset' && i % 2 ? 95 : 40;
    t.setAttribute('x', String(offset));
    t.setAttribute('y', String(200 + i * lineStep));
    t.setAttribute(
      'font-size',
      String(Math.min(size, (650 - offset) / (Math.max(word.length, 1) * 0.7))),
    );
    if (mode.value === 'editorial' && i % 2) {
      t.setAttribute('font-family', 'Georgia, serif');
      t.setAttribute('font-style', 'italic');
      t.setAttribute('font-weight', '400');
    }
    t.textContent = word;
    group.append(t);
  });
  position();
}
[phrase, scale, palette, mode].forEach((e) => e.addEventListener('input', render));
preset.addEventListener('change', () => {
  phrase.value =
    { noise: 'MAKE SOME NOISE', quiet: 'QUIET STRUCTURE LOUD IDEAS', idea: 'STAY CURIOUS' }[
      preset.value
    ] || 'MAKE SOME NOISE';
  render();
});
$('#randomize').addEventListener('click', () => {
  palette.selectedIndex = Math.floor(Math.random() * 4);
  mode.selectedIndex = Math.floor(Math.random() * 3);
  scale.value = String(100 + Math.floor(Math.random() * 61));
  x = 120 + Math.random() * 480;
  y = 660 + Math.random() * 140;
  render();
  $('#poster-status').textContent = 'A new composition. Keep experimenting.';
});
$('#poster-controls').addEventListener('reset', () => {
  requestAnimationFrame(() => {
    x = 560;
    y = 730;
    render();
    $('#poster-status').textContent = 'Back to the beginning.';
  });
});
function move(event: PointerEvent) {
  const matrix = svg.getScreenCTM();
  if (!matrix) return;
  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
  x = Math.max(80, Math.min(640, point.x));
  y = Math.max(100, Math.min(800, point.y));
  position();
}
symbol.addEventListener('pointerdown', (e) => {
  symbol.setPointerCapture(e.pointerId);
  move(e);
});
symbol.addEventListener('pointermove', (e) => {
  if (symbol.hasPointerCapture(e.pointerId)) move(e);
});
symbol.addEventListener('keydown', (e) => {
  const steps: Record<string, number[]> = {
    ArrowLeft: [-10, 0],
    ArrowRight: [10, 0],
    ArrowUp: [0, -10],
    ArrowDown: [0, 10],
  };
  if (steps[e.key]) {
    e.preventDefault();
    x = Math.max(80, Math.min(640, x + steps[e.key][0]));
    y = Math.max(100, Math.min(800, y + steps[e.key][1]));
    position();
  }
});
$('#export').addEventListener('click', () => {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.removeAttribute('id');
  clone.querySelectorAll('[id]').forEach((e) => e.removeAttribute('id'));
  clone.querySelectorAll('[tabindex],[role],[aria-label]').forEach((e) => {
    e.removeAttribute('tabindex');
    e.removeAttribute('role');
    e.removeAttribute('aria-label');
  });
  const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nafis-blue-room.svg';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('#poster-status').textContent = 'Your SVG download is ready. Make it your own.';
});
render();
