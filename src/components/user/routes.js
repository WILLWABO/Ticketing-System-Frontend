
import Dashboard from './Dashboard'
import TicketAttente from './TicketAttente'
import TicketResolu from './TicketResolu'
import TicketRelancer from './TicketRelancer'
import CreerTicket from './TicketForm'
import Protected from '../layouts/protectedRoutes'

const Routes = () => {
    return(
        <>
            <Protected exact path="/user/dashboard" component={Dashboard} />
            <Protected exact path="/user/ticket-en-attente" component={TicketAttente} />
            <Protected exact path="/user/ticket-resolu" component={TicketResolu} />
            <Protected exact path="/user/ticket-relancer" component={TicketRelancer} />
            <Protected exact path="/user/creer-ticket" component={CreerTicket} />
            
        </>
    )
}

export default Routes