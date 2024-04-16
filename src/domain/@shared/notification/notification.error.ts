import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {
    constructor(errors: NotificationErrorProps[]) {
        super(errors.map(err => `${err.context}: ${err.message}`).join(", "))
    }
}