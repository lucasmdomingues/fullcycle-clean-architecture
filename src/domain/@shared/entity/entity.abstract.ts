import Notification from "../notification/notification";

export default abstract class Entity {
    protected id: string;
    protected notification: Notification;

    constructor() {
        this.notification = new Notification()
    }

    get Id(): string {
        return this.id
    }
}