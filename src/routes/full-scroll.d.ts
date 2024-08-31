// full-scroll.d.ts
declare var fullScroll: {
    new (options: {
        container: string;
        sections: string;
        animateTime: number;
        animateFunction: string;
        currentPosition: number;
        displayDots: boolean;
        dotsPosition: string;
    }): void;
};