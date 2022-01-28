
import Statistics from './statistics'
import Dashboard from './Dashboard'
import Technicien from './Technicien'
import NouveauTicket from './NouveauTicket'
import TicketAttente from './TicketAttente'
import TicketResolu from './TicketResolu'
import TicketRelancer from './TicketRelancer'
import NouveauProblem from './NouveauProblem'
import NouveauTechnicien from './NouveauTechnicien'
import Protected from '../layouts/protectedRoutes'

const Routes = () => {
    return(
        <>
            <Protected exact path="/admin/dashboard" component={Dashboard} />
            <Protected exact path="/admin/statistics" component={Statistics} />
            <Protected exact path="/admin/technicien" component={Technicien} />
            <Protected exact path="/admin/new-ticket" component={NouveauTicket} />
            <Protected exact path="/admin/ticket-en-attente" component={TicketAttente} />
            <Protected exact path="/admin/ticket-resolu" component={TicketResolu} />
            <Protected exact path="/admin/ticket-relancer" component={TicketRelancer} />
            <Protected exact path="/admin/new-problem" component={NouveauProblem} />
            <Protected exact path="/admin/new-technicien" component={NouveauTechnicien} />
            
        </>
    )
}

export default Routes