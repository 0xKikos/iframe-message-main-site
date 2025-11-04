import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className='max-w-lg mx-auto'>
      <Outlet />
    </div>
  )
}

export default Layout