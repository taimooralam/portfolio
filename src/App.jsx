// PROTOTYPE BRANCH — three variants of taimooralam.com on `/`, switchable via `?variant=A|B|C`
// and the floating bar at the bottom (portfolio#1). The old site's components are left in
// src/components but not rendered here. Never merge this file to master.
import { useState } from 'react';
import VariantA, { label as labelA } from './prototype/VariantA';
import VariantB, { label as labelB } from './prototype/VariantB';
import VariantC, { label as labelC } from './prototype/VariantC';
import PrototypeSwitcher, { showSwitcher } from './prototype/PrototypeSwitcher';

const variants = {
  A: { Component: VariantA, label: labelA },
  B: { Component: VariantB, label: labelB },
  C: { Component: VariantC, label: labelC },
};

function readVariant() {
  const v = new URLSearchParams(window.location.search).get('variant')?.toUpperCase();
  return variants[v] ? v : 'A';
}

function App() {
  const [current, setCurrent] = useState(readVariant);
  const change = (v) => {
    const url = new URL(window.location.href);
    url.searchParams.set('variant', v);
    window.history.replaceState(null, '', url);
    window.scrollTo(0, 0);
    setCurrent(v);
  };
  const { Component } = variants[current];
  return (
    <>
      <Component key={current} />
      {showSwitcher && <PrototypeSwitcher variants={variants} current={current} onChange={change} />}
    </>
  );
}

export default App;
