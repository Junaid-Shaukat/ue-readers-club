import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { checkRole } from '../../../utils/roles'

const adminPage = () => {
    if (!checkRole('admin')) {
        redirect('/')
      }
    
      return <p>This is the protected admin dashboard restricted to users with the `admin` role.</p>
}
export default adminPage