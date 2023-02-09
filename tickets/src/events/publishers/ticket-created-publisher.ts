import { Publisher, Subjects, TicketCreatedEvent } from "@org-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}