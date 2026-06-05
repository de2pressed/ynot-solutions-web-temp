export function AmbientSystem() {
  return (
    <div className="ambient-system" aria-hidden="true">
      <div className="draft-grid" />
      <svg className="draft-lines" viewBox="0 0 1440 1200" preserveAspectRatio="none">
        <path d="M-80 180 C 260 60, 420 350, 760 220 S 1180 80, 1520 250" />
        <path d="M80 860 C 360 680, 610 920, 920 710 S 1280 590, 1460 730" />
        <path d="M200 0 L 490 1200 M760 0 L620 1200 M1220 0 L1050 1200" />
      </svg>
      <div className="ambient-label l1">route / build / deploy</div>
      <div className="ambient-label l2">k8s / cloud / observe</div>
    </div>
  );
}
