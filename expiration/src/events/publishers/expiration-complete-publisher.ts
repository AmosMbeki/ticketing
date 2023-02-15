import { Subjects, Publisher, ExpirationCompleteEvent } from "@org-ticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}