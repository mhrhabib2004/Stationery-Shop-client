import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'
import router from './components/Router/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>,
)