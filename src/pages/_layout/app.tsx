import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div>
      <h1>App Layout</h1>
      <p>This is the application layout.</p>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}
