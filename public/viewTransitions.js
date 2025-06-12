export default function setup() {
  if (!document.startViewTransition) return;
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a');
    if (a && a.href && !a.target && a.origin === location.origin) {
      e.preventDefault();
      document.startViewTransition(() => {
        window.location.href = a.href;
      });
    }
  });
}
