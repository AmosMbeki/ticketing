import { Publisher, OrderCreatedEvent, Subjects } from "@org-ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    
}