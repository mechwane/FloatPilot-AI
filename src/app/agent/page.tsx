import { RouteGuard } from '@/components/auth/route-guard';
import Placeholder from '../placeholder';
export default function Page(){return <RouteGuard pathname="/agent"><Placeholder role="Agent"/></RouteGuard>}
