/** Exact fixed, masked backdrop layers extracted from awrs.me's navigation. */
export function ScrollBlur() {
  return (
    <div aria-hidden="true" className="scroll-blur">
      {[{ height: 70, filter: "blur(16px) saturate(1.3)" }, { height: 120, filter: "blur(8px)" }, { height: 180, filter: "blur(3px)" }].map(layer => (
        <div key={layer.height} className="scroll-blur-layer" style={{ height: layer.height, backdropFilter: layer.filter, WebkitBackdropFilter: layer.filter }} />
      ))}
    </div>
  );
}
