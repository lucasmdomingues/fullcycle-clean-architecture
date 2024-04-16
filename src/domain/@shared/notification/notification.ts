export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(err: NotificationErrorProps) {
        this.errors.push(err)
    }

    messages(context?: string): string {
        return this.errors.
            filter((err) => {
                if (!context) return err
                return err.context === context
            }).
            map((err) => `${err.context}: ${err.message}`).
            join(", ")
    }

    hasErrors(): boolean {
        return this.errors.length > 0
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors
    }
}