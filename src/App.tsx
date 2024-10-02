import { lazy, Suspense } from 'react';
import Loading from './components/shared/Loading';

const Cities = lazy(() => import('./components/Cities'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Cities />
    </Suspense >
  )
}

export default App
