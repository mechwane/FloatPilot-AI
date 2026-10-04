import { RouteGuard } from '@/components/auth/route-guard';
import Placeholder from '../placeholder';
export default function Page(){return <RouteGuard pathname="/operations"><Placeholder role="Operations"/></RouteGuard>}
