
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { checkRole } from '../../../utils/roles'
import UI from './UI'
const adminPage = () => {
    if (!checkRole('admin')) {
        redirect('/')
      }
    
      return <>
      <UI/>
      </>
}
export default adminPage