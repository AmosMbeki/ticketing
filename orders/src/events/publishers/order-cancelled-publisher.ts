import { Subjects, Publisher, OrderCancelledEvent } from "@org-ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled; 
}