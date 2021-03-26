export type OfflineObserver = (offline: boolean) => {preventPropagation?: boolean} | void;

class OfflineSubject {
    constructor(private intervalMs: number) {
        window.addEventListener('load', () => {
            window.addEventListener('online',  this.updateOffline.bind(this));
            window.addEventListener('offline', this.updateOffline.bind(this));
        });
    }

    private offline = false;
    private serverOffline = false;
    private observers: Array<{priority: number, observer: OfflineObserver}> = [];
    private intervalId: number | undefined = undefined;

    public attach(observer: OfflineObserver, priority: number) {
        this.observers.push({observer, priority});
    }

    public detach(observer: OfflineObserver) {
        this.observers = this.observers.filter(o => o.observer !== observer);
    }

    public get value(): boolean {
        return this.offline || this.serverOffline;
    }

    public update() {
        this.intervalId = window.setInterval(() => {
            if (!this.offline) {
                this.checkServerOffline();
            };
            this.notify(this.value);
        }, this.intervalMs);
    }

    private updateOffline() {
        this.offline = !navigator.onLine;
    }

    public checkServerOffline(): void {
        // FIXME: use cancellable promise here
        fetch('//google.com', { mode: 'no-cors' })
            .then(() => this.serverOffline = false)
            .catch(() => this.serverOffline = true)
    }

    public cleanUpdates() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    private notify(offline: boolean) {
        this.observers
            .sort((o1, o2) => o1.priority > o2.priority ? 1 : -1)
            .map(o => o.observer)
            .reduceRight((preventPropagation, o) => {
            if (!preventPropagation) {
                const result = o(offline);
                return !!result ? !!result.preventPropagation : false;
            } else {
                return preventPropagation;
            }
        }, false);
    }
}

const offlineSubject = new OfflineSubject(1000);
offlineSubject.update();
export default offlineSubject;

