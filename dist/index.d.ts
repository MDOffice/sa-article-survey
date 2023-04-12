import './index.css';
interface Props {
    ajax: {
        url: string;
        articleId: string;
    };
    containerClass: string;
    titleClass: string;
    improveClass: string;
    buttonClass: string;
    textareaContainer: string;
    textareaClass: string;
    titleUseful: string;
    titleThx: string;
    titleSor: string;
    titleImprove: string;
    titleNeedText: string;
    btnUseful: string;
    btnNoUseful: string;
    btnSend: string;
}
export default class SAArticleSurvey {
    element: HTMLElement;
    props: Props;
    protected constructor(element: HTMLElement, props: Props);
    static create(element: HTMLElement, props: Props): SAArticleSurvey;
    setRating(rating: number): Promise<void>;
    setComment(text: string): Promise<void>;
    setTitle(text: string): void;
    actionFinish(): void;
    actionComment(): void;
    protected handleEvents(): void;
    protected template(): string;
    protected render(): void;
}
export {};
