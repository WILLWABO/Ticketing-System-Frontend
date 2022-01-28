

import Dashboard from './Dashboard'
import TicketAttente from './TicketAttente'
import TicketResolu from './TicketResolu'
import TicketRelancer from './TicketRelancer'
import Protected from '../layouts/protectedRoutes'

const Routes = () => {
    return(
        <>
            <Protected exact path="/technicien/dashboard" component={Dashboard} />
            <Protected exact path="/technicien/ticket-en-attente" component={TicketAttente} />
            <Protected exact path="/technicien/ticket-resolu" component={TicketResolu} />
            <Protected exact path="/technicien/ticket-relancer" component={TicketRelancer} />
            
        </>
    )
}

export default Routes